import { CheckoutStatus } from '../common/data-types'
import { UserRole } from '../users'

export enum AuditType {
  PLANNED = 'planned',
  TARGET = 'target',
}

export type TAuditResult = {
  success: number
  warnings: number
  errors: number
  unchecked: number
}

export type IAuditResponsible = {
  id: string | number
  firstName: string
  lastName: string
  patronymic: string
  role: UserRole
}

export type TAuditListItem = {
  name: string
  num: number
  id: string | number
  type: AuditType
  status: CheckoutStatus
  dateStart: string
  dateEnd: string
  cardsCount: number
  result: TAuditResult | null
  responsible: IAuditResponsible
}
