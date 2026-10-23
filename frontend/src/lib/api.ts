import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Default port for backend is 5142
export const BACKEND_PORT = 5142;
export const DEFAULT_BACKEND_URL = `http://localhost:${BACKEND_PORT}`;
export const DEFAULT_API_BASE_URL = `${DEFAULT_BACKEND_URL}/api`;

/**
 * Standard backend response envelope matching StudyFlowBackend ApiResponse<T>
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
}

/**
 * Custom Error class for standardizing API error responses across the application
 */
export class ApiError extends Error {
  public status?: number;
  public errors?: unknown;
  public originalError?: unknown;

  constructor(
    message: string,
    status?: number,
    errors?: unknown,
    originalError?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
    this.originalError = originalError;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Get configured API base URL, prioritizing NEXT_PUBLIC_API_URL or defaulting to port 5142
 */
export function getApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (configured) {
    const cleaned = configured.replace(/\/+$/, "");
    return cleaned.endsWith("/api") ? cleaned : `${cleaned}/api`;
  }
  return DEFAULT_API_BASE_URL;
}

export const API_BASE_URL = getApiBaseUrl();

/**
 * Retrieve token from browser storage
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    null
  );
}

/**
 * Clean up authentication storage on logout or unauthorized response
 */
export function clearAuthStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("_octo_sec_p_enc");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("_octo_sec_p_enc");
}

/**
 * Normalize API endpoint paths to avoid double '/api' segments
 */
export function normalizeEndpoint(endpoint: string): string {
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint;
  }
  let path = endpoint.trim();
  if (path.startsWith("/api/")) {
    path = path.slice(4);
  } else if (path === "/api") {
    path = "";
  } else if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  return path;
}

/**
 * Create Axios instance with base configuration
 */
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

/**
 * Request Interceptor: Attach bearer token and format endpoint
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url) {
      config.url = normalizeEndpoint(config.url);
    }

    const token = getAuthToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Extract user-friendly error message from response data
 */
function extractErrorMessage(data: unknown, status?: number): string {
  if (status === 401) {
    return "Your session has expired or you are not logged in. Please log in to continue.";
  }

  if (typeof data === "string" && data.trim().length > 0) {
    return data;
  }

  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    const msg = d.message || d.Message || d.error || d.Error || d.title || d.Title;
    if (typeof msg === "string" && msg.trim()) {
      return msg;
    }

    // ASP.NET Validation Problem Details: { errors: { FieldName: ["Error 1"] } }
    if (d.errors && typeof d.errors === "object") {
      const errList = Object.values(d.errors).flat();
      if (errList.length > 0) {
        return String(errList[0]);
      }
    }
  }

  if (status === 429) {
    return "Too many requests. Please slow down and try again later.";
  }

  if (status === 404) {
    return "Requested resource could not be found.";
  }

  if (status === 403) {
    return "You do not have permission to perform this action.";
  }

  if (status && status >= 500) {
    return "Internal server error. Please try again later.";
  }

  return status ? `Request failed with status code ${status}` : "An unexpected error occurred.";
}

/**
 * Response Interceptor: Format output and standardize errors
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const resData = response.data;

    // If response is wrapped in standard backend envelope: { success: true, data: T }
    // unwrap and return data, while preserving compatibility when direct payload is returned
    if (
      resData &&
      typeof resData === "object" &&
      "success" in resData &&
      "data" in resData &&
      resData.success === true
    ) {
      return resData.data;
    }

    return resData;
  },
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosErr = error as AxiosError;
      const status = axiosErr.response?.status;
      const data = axiosErr.response?.data;

      // Handle 401 Unauthorized: clear storage if not on an auth route
      if (status === 401 && typeof window !== "undefined") {
        const isAuthRoute = window.location.pathname.startsWith("/auth");
        if (!isAuthRoute) {
          clearAuthStorage();
        }
      }

      // Check if network error or connection refused (backend not running)
      if (!axiosErr.response) {
        const networkMessage =
          `Cannot connect to backend server at port ${BACKEND_PORT} (${API_BASE_URL}). ` +
          "Please ensure the backend application is running.";
        return Promise.reject(new ApiError(networkMessage, undefined, undefined, axiosErr));
      }

      const errorMessage = extractErrorMessage(data, status);
      return Promise.reject(new ApiError(errorMessage, status, data, axiosErr));
    }

    if (error instanceof ApiError) {
      return Promise.reject(error);
    }

    const genericMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return Promise.reject(new ApiError(genericMessage, undefined, undefined, error));
  }
);

/**
 * Extended request config allowing compatibility with legacy RequestInit options
 */
export interface ApiRequestOptions extends AxiosRequestConfig {
  body?: unknown;
}

/**
 * Standard API client function with full backward compatibility and Axios power
 */
export async function apiClient<T>(
  endpoint: string,
  options: ApiRequestOptions | RequestInit = {}
): Promise<T> {
  const method = (options.method || "GET").toString().toUpperCase();

  // Handle data / body for compatibility with fetch RequestInit (body: JSON.stringify(...))
  let data: unknown = (options as AxiosRequestConfig).data;
  if (data === undefined && "body" in options && options.body !== undefined) {
    if (typeof options.body === "string") {
      try {
        data = JSON.parse(options.body);
      } catch {
        data = options.body;
      }
    } else {
      data = options.body;
    }
  }

  // Handle headers
  let headers: Record<string, string> | undefined;
  if (options.headers) {
    if (typeof (options.headers as Headers).forEach === "function") {
      headers = {};
      (options.headers as Headers).forEach((value, key) => {
        if (headers) headers[key] = value;
      });
    } else if (Array.isArray(options.headers)) {
      headers = {};
      for (const [k, v] of options.headers) {
        headers[k] = v;
      }
    } else {
      headers = { ...(options.headers as Record<string, string>) };
    }
  }

  const config: AxiosRequestConfig = {
    url: endpoint,
    method,
    data,
    headers,
    signal: options.signal as AbortSignal | undefined,
    ...(options as AxiosRequestConfig),
  };

  const response = await axiosInstance.request(config);
  return response as T;
}

// Attach helper methods to apiClient
apiClient.get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.get(url, config);
  return response as T;
};

apiClient.post = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.post(url, data, config);
  return response as T;
};

apiClient.put = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.put(url, data, config);
  return response as T;
};

apiClient.patch = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance.patch(url, data, config);
  return response as T;
};

apiClient.delete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.delete(url, config);
  return response as T;
};

apiClient.instance = axiosInstance;

// Alias export
export const api = apiClient;
export default apiClient;
