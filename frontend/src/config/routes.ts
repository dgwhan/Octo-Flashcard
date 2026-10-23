/**
 * Application Route Definitions
 * Dedicated 100% to Flashcards & Authentication (Deck feature completely removed)
 */
export const ROUTES = {
  // Trang chủ / Khám phá
  HOME: "/",
  EXPLORE: "/",

  // Chức năng Flashcard
  FLASHCARDS: "/flashcards",
  FLASHCARDS_CREATE: "/flashcards/create",
  FLASHCARDS_DETAIL: (id: string | number) => `/flashcards/${id}`,

  // Xác thực (Auth)
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
} as const;

/**
 * Path-to-Key Route Mapping (Ví dụ: '/' : 'HOME', '/flashcards' : 'FLASHCARDS')
 */
export const ROUTE_PATH_MAP: Record<string, string> = {
  "/": "HOME",
  "/flashcards": "FLASHCARDS",
  "/flashcards/create": "FLASHCARDS_CREATE",
  "/auth/login": "LOGIN",
  "/auth/register": "REGISTER",
};

/**
 * Backend API Endpoints Configuration
 * Matches ASP.NET Core StudyFlowBackend Controller attributes exactly
 */
export const API_ENDPOINTS = {
  // AuthController (Route: api/auth)
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    ME: "/auth/me",
  },

  // FlashcardsController (Route: api/flashcards)
  FLASHCARDS: {
    BASE: "/flashcards",
    GET_ALL: "/flashcards",
    GET_BY_ID: (id: string | number) => `/flashcards/${id}`,
    CREATE: "/flashcards",
    DELETE: (id: string | number) => `/flashcards/${id}`,
  },

  // AiController (Route: api/ai)
  AI: {
    GENERATE_FLASHCARDS: "/ai/generate-flashcards",
    CHAT: "/ai/chat",
    HISTORY: "/ai/history",
    CLEAR: "/ai/clear",
  },

  // HealthController (Route: api/health)
  HEALTH: {
    PING: "/health/ping",
  },
} as const;

export type AppRouteKey = keyof typeof ROUTES;
