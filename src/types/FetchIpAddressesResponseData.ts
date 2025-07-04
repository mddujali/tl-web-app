import type { IpAddress } from '@/models/IpAddress.ts'

export interface FetchIpAddressesResponseData {
  message: string
  data: IpAddress[]
}
