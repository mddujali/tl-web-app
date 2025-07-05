import type { CurrentUser } from '@/types/CurrentUser.ts'

export interface ProfileResponseData {
  message: string
  data: CurrentUser
}
