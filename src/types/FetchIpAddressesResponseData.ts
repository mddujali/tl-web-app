import type { IpAddress } from '@/types/IpAddress.ts'

export interface FetchIpAddressesResponseData {
  message: string
  data: IpAddress[]
}
