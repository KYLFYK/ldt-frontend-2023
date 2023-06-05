import { createAction } from '@reduxjs/toolkit'

import { TBaseSagaPayload } from '../../../types/common'

export const loadCurrentAudit = createAction<
  {
    id: number
  } & TBaseSagaPayload
>('audit/current/load')
