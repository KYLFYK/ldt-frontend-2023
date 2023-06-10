import { CheckoutStatus, Period } from '../common/data-types'
import { AuditType, IAuditResponsible } from './index'

export type TAuditFilters = {
    period?: Period | 'any'
    type?: AuditType | 'any'
    status?: CheckoutStatus | 'any'
}

export type TAllStats = {
    green: number
    warning: number
    error: number
    unchecked: number
    cardsCount: number
}

export type TAppointsResult = {
    id: string | number
    appointData: {
        gender: string
        birthDate: string
        patientId: string | number
        mkbCode: string
        mkbName: string
        serviceDate: string
        doctorJobTitle: string
    }
    error?: string[]
    result?: {
        average: number
        max: number
        min: number
        list: {
            actualRecommendation: string
            conjunction: {
                [1]: {
                    mcbRecommendation: string
                    score: number
                }
                [2]: {
                    mcbRecommendation: string
                    score: number
                }
                [3]: {
                    mcbRecommendation: string
                    score: number
                }
            }
        }[]
    }
}

export type TAuditPageResult = {
    name: string
    id: string | number
    type: AuditType
    status: CheckoutStatus
    dateStart: string
    dateEnd: string
    responsible: IAuditResponsible
    auditReason: string
    result: TAppointsResult[]
    allStats: TAllStats
    resultDocs: {
        xl_href: string
        csv_href: string
        pdf_report: string
    }
}
