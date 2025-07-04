import { defineStore } from 'pinia'
import api from '@/api'
import type { Credentials } from '@/types/Credentials'
import type { AuthState } from '@/types/AuthState'
import type { LoginResponseData } from '@/types/LoginResponseData.ts'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    refreshToken: null,
  }),

  actions: {
    async login(credentials: Credentials): Promise<void> {
      try {
        const response = await api.post('/auth/login', credentials)
        const { data }: LoginResponseData = response.data

        this.accessToken = data.access_token
        this.refreshToken = data.refresh_token

        localStorage.setItem('accessToken', this.accessToken!)
        localStorage.setItem('refreshToken', this.refreshToken!)
      } catch (error) {
        throw error
      }
    },

    async logout(): Promise<void> {
      try {
        await api.post(
          '/auth/logout',
          {},
          {
            headers: { Authorization: `Bearer ${this.accessToken}` },
          },
        )

        this.clearAuthState()
      } catch (error) {
        throw error
      }
    },

    clearAuthState(): void {
      this.accessToken = null
      this.refreshToken = null

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },
  },
})
