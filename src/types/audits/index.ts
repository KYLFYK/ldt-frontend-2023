import { CheckoutStatus } from '../common/data-types'
import { UserRole } from '../users'

export enum AuditStartType {
  NOW = 'now',
  BY_DATE = 'by-date',
}

export enum AuditType {
  PLANNED = 'planned',
  TARGET = 'target',
}

export type TAuditDataFilters = {
  mkbCodes: string[]
  doctorsId: string[]
  date?: {
    start?: string
    end?: string
  }
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
  recommendationsCount: number
  result: TAuditResult | null
  responsible: IAuditResponsible
}

export type ICreateAuditForm = {
  name: string
  responsible: string
  startType: AuditStartType
  startDate?: string
  endDate: string
  type: AuditType
  auditReason: string
  datasetFilters: TAuditDataFilters
}
