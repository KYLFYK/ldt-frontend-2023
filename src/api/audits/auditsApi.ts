import { AxiosResponse } from 'axios'

import { TAuditPageResult } from '../../types/audits/audit-results'
import { baseAPIInstance } from '../index'

type TAuditsApi = {
  getAll: () => Promise<AxiosResponse<TAuditsAllResponse>>
}

export type TAuditsAllResponse = {
  result: TAuditPageResult
  id: string | number
}[]

export const AuditsApi: TAuditsApi = {
  getAll: async () => {
    return baseAPIInstance.get('/many/initialize')
  },
}
