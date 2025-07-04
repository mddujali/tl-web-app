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

        console.log(data)
      } catch (error) {
        throw error
      }
    },
  },
})
