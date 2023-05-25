import { CheckoutStatus } from '../common/data-types'

export interface IHomeLastCheckoutsSource {
  name: string
  planned: boolean
  status: CheckoutStatus
  period: [string, string]
  cardsCount: number
  responsible: {
    name: string
    role: string
  }
}
