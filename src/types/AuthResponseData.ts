import type { TokenPair } from '@/types/TokenPair.ts'

export interface AuthResponseData {
  message: string
  data: TokenPair
}
