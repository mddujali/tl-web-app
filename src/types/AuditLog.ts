import type { User } from './User.ts'

export interface AuditLog {
  id: number
  user: User
  type: string
  message: string
  context: unknown
  created_at: string
}
