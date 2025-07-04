import { defineStore } from 'pinia'
import type { CurrentUser } from '@/types/CurrentUser.ts'
import api from '@/api'

export const useUserStore = defineStore('user', {
  state: (): CurrentUser => ({
    id: null,
    name: null,
    email: null,
    role: null,
    created_at: null,
    updated_at: null,
  }),

  actions: {
    async fetch(): Promise<void> {
      try {
        const response = await api.get('/profile')
        const { data } = response.data

        this.id = data.id
        this.name = data.name
        this.email = data.email
        this.role = data.role
        this.created_at = data.created_at
        this.updated_at = data.updated_at
      } catch (error) {
        throw error
      }
    },
  },
})
