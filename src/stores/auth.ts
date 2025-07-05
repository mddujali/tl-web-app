import { defineStore } from 'pinia'
import api from '@/api'
import type { Credentials } from '@/types/Credentials.ts'
import type { TokenPair } from '@/types/TokenPair.ts'
import type { AuthResponseData } from '@/types/AuthResponseData.ts'

export const useAuthStore = defineStore('auth', {
  state: (): TokenPair => ({
    access_token: null,
    refresh_token: null,
  }),

  actions: {
    async login(credentials: Credentials): Promise<void> {
      try {
        const response = await api.post('/auth/login', credentials)
        const { data }: AuthResponseData = response.data

        this.setTokens({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        })
      } catch (error) {
        throw error
      }
    },

    async logout(): Promise<void> {
      try {
        await api.post('/auth/logout')

        this.clearAuthState()
      } catch (error) {
        throw error
      }
    },

    setTokens(token: TokenPair): void {
      this.access_token = token.access_token
      this.refresh_token = token.refresh_token

      localStorage.setItem('access_token', token.access_token!)
      localStorage.setItem('refresh_token', token.refresh_token!)
    },

    clearAuthState(): void {
      this.access_token = null
      this.refresh_token = null

      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },

    loadAuthState(): void {
      const access_token = localStorage.getItem('access_token')
      const refresh_token = localStorage.getItem('refresh_token')

      if (access_token && refresh_token) {
        this.access_token = access_token
        this.refresh_token = refresh_token
      }
    },
  },

  getters: {
    isAuthenticated(): boolean {
      return !!this.access_token && !!this.refresh_token
    },
  },
})
