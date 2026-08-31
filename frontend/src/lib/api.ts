// Base URL for API requests
const configuredBase = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "") : "";
const API_BASE_URL = configuredBase
    ? (configuredBase.endsWith("/api") ? configuredBase : `${configuredBase}/api`)
    : "/api";

export class ApiError extends Error {
    constructor(public message: string, public status?: number, public errors?: unknown) {
        super(message);
        this.name = "ApiError";
    }
}

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            : null;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    let path = endpoint;
    if (!endpoint.startsWith("http")) {
        if (path.startsWith("/api/")) {
            path = path.slice(4);
        } else if (path === "/api") {
            path = "";
        } else if (!path.startsWith("/")) {
            path = `/${path}`;
        }
    }

    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${path}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        const contentType = response.headers.get("content-type");
        const isJson = contentType && contentType.includes("application/json");
        const data = isJson ? await response.json() : await response.text();

        if (!response.ok) {
            if (response.status === 401 && typeof window !== "undefined") {
                const isAuthRoute = window.location.pathname.startsWith("/auth");
                if (!isAuthRoute) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("user");
                    sessionStorage.removeItem("accessToken");
                    sessionStorage.removeItem("user");
                }
            }

            let errorMessage =
                response.status === 401
                    ? "Your session has expired or you are not logged in. Please log in to continue."
                    : `Request failed with status ${response.status}`;
            if (typeof data === "object" && data !== null) {
                const d = data as Record<string, unknown>;
                const msg = d.message || d.Message || d.error || d.Error || d.title || d.Title;
                if (typeof msg === "string") {
                    errorMessage = msg;
                } else if (d.errors && typeof d.errors === "object") {
                    const errList = Object.values(d.errors).flat();
                    if (errList.length > 0) {
                        errorMessage = String(errList[0]);
                    }
                }
            } else if (typeof data === "string" && data.length > 0) {
                errorMessage = data;
            }
            throw new ApiError(errorMessage, response.status, data);
        }

        return data as T;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(
            error instanceof Error ? error.message : "Failed to connect to backend server. Please check if backend is running."
        );
    }
}
