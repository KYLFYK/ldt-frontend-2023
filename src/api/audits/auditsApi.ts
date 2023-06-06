import { AxiosResponse } from 'axios'

import { TAuditInitMeta } from '../../ducks/audits/audit-initialization/slice'
import { TAuditPageResult } from '../../types/audits/audit-results'
import { baseAPIInstance } from '../index'

export type TAuditsAllResponse = {
    result: TAuditPageResult
    id: string | number
}[]

export type TAuditInitPayload = TAuditInitMeta & {
    fileId: number
}

type TAuditsApi = {
    getAll: () => Promise<AxiosResponse<TAuditsAllResponse>>
    initAudit: (
        payload: TAuditInitPayload
    ) => Promise<AxiosResponse<TAuditPageResult>>
}

export const AuditsApi: TAuditsApi = {
    getAll: async () => {
        return baseAPIInstance.get('/many/initialize')
    },
    initAudit: async (payload) => {
        return baseAPIInstance.post('/initialize', payload)
    },
}
