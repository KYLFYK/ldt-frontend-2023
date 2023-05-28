import { CheckoutStatus } from '../common/data-types'
import { UserRole } from '../users'
import { TAllStats, TAppointsResult } from './audit-results'

export enum AuditStartType {
  NOW = 'now',
  BY_DATE = 'by-date',
}

export enum AuditType {
  PLANNED = 'planned',
  TARGET = 'target',
}

export enum AuditResultStatus {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
  UNCHECKED = 'UNCHECKED',
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
  id: string | number
  type: AuditType
  status: CheckoutStatus
  dateStart: string
  dateEnd: string
  result: TAppointsResult[]
  responsible: IAuditResponsible
  auditReason: string
  allStats: TAllStats
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
