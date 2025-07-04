import axios from 'axios'
import { TokenManagerService } from '@/services/TokenManagerService.ts'
import { API_CONFIG } from '@/config/apiConfig.ts'

const tokenManager = new TokenManagerService()
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
})

api.interceptors.request.use((config) => {
  const accessToken = tokenManager.getStoredToken(API_CONFIG.TOKEN_KEYS.ACCESS)

  if (accessToken) {
    tokenManager.setAuthorizationHeader(config, accessToken)
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === API_CONFIG.STATUS_CODES.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      return tokenManager.handleTokenRefresh(originalRequest)
    }

    return Promise.reject(error)
  },
)

export default api
