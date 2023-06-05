import { createAction } from '@reduxjs/toolkit'

import { TBaseSagaPayload } from '../../../types/common'

export const loadAllAuditsAction =
    createAction<TBaseSagaPayload>('audits/list/load')
