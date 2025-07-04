import type { AuditLog } from '@/types/AuditLog.ts'

export interface FetchAuditLogsResponseData {
  message: string
  data: AuditLog[]
}
