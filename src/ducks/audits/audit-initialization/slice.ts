import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { TFileData } from '../../../api/files/filesApi'
import { AuditType, IAuditResponsible } from '../../../types/audits'
import { CheckoutStatus } from '../../../types/common/data-types'

export type TAuditInitMeta = {
    name: string
    type: AuditType
    status: CheckoutStatus
    dateStart: string
    dateEnd: string
    responsible: IAuditResponsible
    auditReason: string
}

type TState = {
    initPending: boolean
    initError: boolean
    initMetaData: TAuditInitMeta | undefined
    initComplete: boolean
    fileSent: boolean
    filePending: boolean
    fileError: boolean
    fileMetaData: TFileData | undefined
}

const initialState: TState = {
    initPending: false,
    initError: false,
    initMetaData: undefined,
    initComplete: false,
    fileSent: false,
    filePending: false,
    fileError: false,
    fileMetaData: undefined,
}

const auditInitSlice = createSlice({
    name: 'audit/init',
    initialState: {
        ...initialState,
    } as TState,
    reducers: {
        startFileWorker(state) {
            state.filePending = true
        },
        endFileWorker(state) {
            state.filePending = false
        },
        setFileError(state) {
            state.fileError = true
            state.fileSent = false
        },
        setMetaData(
            state,
            action: PayloadAction<{
                fileMeta: TFileData
                initMeta: TAuditInitMeta
            }>
        ) {
            state.fileMetaData = action.payload.fileMeta
            state.initMetaData = action.payload.initMeta
            state.fileSent = true
        },
        startInitWorker(state) {
            state.initPending = true
        },
        endInitWorker(state) {
            state.initPending = false
        },
        setInitError(state) {
            state.initError = true
            state.initComplete = false
        },
        setInitialized(state) {
            state.initComplete = true
        },
        clearInitialization(state) {
            state = {
                ...initialState,
            }
        },
    },
})

export const {
    startFileWorker,
    endFileWorker,
    setFileError,
    setMetaData,
    startInitWorker,
    endInitWorker,
    setInitError,
    setInitialized,
    clearInitialization,
} = auditInitSlice.actions
export const auditInitReducer = auditInitSlice.reducer
