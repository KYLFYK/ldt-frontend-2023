import { CheckoutStatus } from '../common/data-types'
import { UserRole } from '../users'
import { TAllStats, TAppointsResult, TAuditPageResult } from './audit-results'

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

export enum AuditStatusNum {
    SUCCESS = 12,
    WARNING = 12,
    DANGER = 12,
    UNCHECKED = 0,
}

export enum AuditAverageNum {
    SUCCESS = 90,
    WARNING = 40,
    DANGER = 0,
}

export enum AuditScoreNum {
    SUCCESS = 70,
    WARNING = 40,
    DANGER = 0,
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
    result: TAppointsResult[]
    auditReason: string
    dateStart: string
    responsible: IAuditResponsible
    name: string
    allStats: TAllStats
    id: string | number
    dateEnd: string
    type: AuditType
    key: string | number
    status: CheckoutStatus
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
