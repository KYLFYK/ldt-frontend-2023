import { createAction } from '@reduxjs/toolkit'

import { TBaseSagaPayload } from '../../../types/common'
import { TAuditInitMeta } from './slice'

export const uploadAuditFileData = createAction<
    {
        file: File
        initMeta: TAuditInitMeta
    } & TBaseSagaPayload
>('audit/upload/file')
export const initCreateAction = createAction<
    {
        meta: TAuditInitMeta
        fileId: number
    } & TBaseSagaPayload
>('audit/init')
