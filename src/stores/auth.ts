import { defineStore } from 'pinia'
import api from '@/api'
import type { Credentials } from '@/types/Credentials.ts'
import type { AuthState } from '@/types/AuthState.ts'
import type { LoginResponseData } from '@/types/LoginResponseData.ts'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    access_token: null,
    refresh_token: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(credentials: Credentials): Promise<void> {
      try {
        const response = await api.post('/auth/login', credentials)
        const { data }: LoginResponseData = response.data

        this.access_token = data.access_token
        this.refresh_token = data.refresh_token
        this.isAuthenticated = true

        localStorage.setItem('access_token', this.access_token!)
        localStorage.setItem('refresh_token', this.refresh_token!)
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
            headers: { Authorization: `Bearer ${this.access_token}` },
          },
        )

        this.clearAuthState()
      } catch (error) {
        throw error
      }
    },

    clearAuthState(): void {
      this.access_token = null
      this.refresh_token = null
      this.isAuthenticated = false

      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },

    loadAuthState(): void {
      const access_token = localStorage.getItem('access_token')
      const refresh_token = localStorage.getItem('refresh_token')

      if (access_token && refresh_token) {
        this.access_token = access_token
        this.refresh_token = refresh_token
        this.isAuthenticated = true
      }
    },
  },
})
