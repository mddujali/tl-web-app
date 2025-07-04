import type { AuthResponseData } from '@/types/AuthResponseData.ts'
import { useAuthStore } from '@/stores/auth.ts'
import axios from 'axios'
import api from '@/api'
import { API_CONFIG } from '@/config/apiConfig.ts'
import type { AxiosRequestConfig } from '@/types/AxiosRequestConfig.ts'

type RefreshSubscriber = (token: string) => void

export class TokenManagerService {
  private isRefreshing = false

  private refreshSubscribers: RefreshSubscriber[] = []

  getStoredToken(key: string): string | null {
    return localStorage.getItem(key)
  }

  setAuthorizationHeader(config: AxiosRequestConfig, token: string): void {
    config.headers.Authorization = `${API_CONFIG.BEARER_PREFIX}${token}`
  }

  private addRefreshSubscriber(callback: RefreshSubscriber): void {
    this.refreshSubscribers.push(callback)
  }

  private notifyRefreshSubscribers(token: string): void {
    this.refreshSubscribers.forEach((callback) => callback(token))

    this.refreshSubscribers = []
  }

  private async refreshAuthToken(): Promise<string> {
    const refresh_token = this.getStoredToken(API_CONFIG.TOKEN_KEYS.REFRESH)
    const response = await axios.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH_REFRESH}`,
      { refresh_token },
    )

    const { data }: AuthResponseData = response.data
    const { access_token, refresh_token: newRefreshToken } = data

    const authStore = useAuthStore()
    authStore.setTokens({ access_token, refresh_token: newRefreshToken })

    api.defaults.headers.Authorization = `${API_CONFIG.BEARER_PREFIX}${access_token}`

    return access_token
  }

  private handleAuthFailure(): void {
    const authStore = useAuthStore()
    authStore.clearAuthState()

    window.location.href = API_CONFIG.ROUTES.LOGIN
  }

  async handleTokenRefresh(originalRequest: AxiosRequestConfig): Promise<unknown> {
    if (this.isRefreshing) {
      return new Promise((resolve): void => {
        this.addRefreshSubscriber((token: string): void => {
          this.setAuthorizationHeader(originalRequest, token)

          resolve(api(originalRequest))
        })
      })
    }

    originalRequest._retry = true
    this.isRefreshing = true

    try {
      const newToken = await this.refreshAuthToken()
      this.notifyRefreshSubscribers(newToken)

      this.setAuthorizationHeader(originalRequest, newToken)
      return api(originalRequest)
    } catch (error) {
      this.handleAuthFailure()

      return Promise.reject(error)
    } finally {
      this.isRefreshing = false
    }
  }
}
