export const API_CONFIG = {
  BASE_URL: 'http://localhost:4002/api',
  ENDPOINTS: {
    AUTH_REFRESH: '/auth/refresh',
  },
  ROUTES: {
    LOGIN: '/login',
  },
  STATUS_CODES: {
    UNAUTHORIZED: 401,
  },
  TOKEN_KEYS: {
    ACCESS: 'access_token',
    REFRESH: 'refresh_token',
  },
  BEARER_PREFIX: 'Bearer ',
} as const
