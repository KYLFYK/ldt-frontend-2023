import dayjs from 'dayjs'

import { AuditType } from '../types/audits'
import { TAuditPageResult } from '../types/audits/audit-results'
import { CheckoutStatus } from '../types/common/data-types'
import { UserRole } from '../types/users'
import jsonData from './res.json'

export const auditPageMockState: () => Promise<TAuditPageResult> = () =>
    new Promise((resolve) => {
        const json = jsonData

        resolve({
            name: 'Проверка Dataset',
            id: 1,
            type: AuditType.TARGET,
            status: CheckoutStatus.COMPLETED,
            dateStart: dayjs().add(-2, 'days').toISOString(),
            dateEnd: dayjs().add(4, 'days').toISOString(),
            responsible: {
                id: 'abgh-skcs',
                firstName: 'И',
                lastName: 'Вяткин',
                patronymic: 'В',
                role: UserRole.EXPERT_DEPUTY,
            },
            auditReason: 'Жалоба пациента №29',
            result: json.resultCards,
            allStats: json.resultStats,
            resultDocs: {
                xl_href: '#',
                csv_href: '#',
                pdf_report: '#',
            },
        })
    })
