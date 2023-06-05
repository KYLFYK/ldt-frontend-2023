import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
    TAppointsResult,
    TAuditPageResult,
} from '../../../types/audits/audit-results'
import { TPagination } from '../../../types/common/components-data'
import { getBasePaginationData } from '../../../utils/common'

type TState = {
    data: TAuditPageResult | undefined
    loaded: boolean
    loading: boolean
    error: boolean
    currentResults: TAppointsResult[]
    currentResultsPagination: TPagination
    currentAppoint: undefined | TAppointsResult
    currentAppointLoaded: boolean
    currentAppointLoading: boolean
}

const initialState: TState = {
    data: undefined,
    loaded: false,
    loading: false,
    error: false,
    currentResults: [],
    currentResultsPagination: getBasePaginationData(1),
    currentAppoint: undefined,
    currentAppointLoaded: false,
    currentAppointLoading: false,
}

export const currentAuditSlice = createSlice({
    name: 'audit/current',
    initialState: initialState as TState,
    reducers: {
        startCurrentAuditWorker(state) {
            state.loading = true
        },
        endCurrentAuditWorker(state) {
            state.loading = false
        },
        setCurrentAuditError(state) {
            state.error = true
        },
        setCurrentAudit(state, action: PayloadAction<TAuditPageResult>) {
            const pagination = getBasePaginationData(
                action.payload.result.length
            )
            const paginationPageLastIndex =
                pagination.currentPage * pagination.onPageCount

            state.data = action.payload
            state.loaded = true
            state.currentResults = action.payload.result
            state.currentResultsPagination = getBasePaginationData(
                action.payload.result.length
            )
            state.currentResults = action.payload.result.slice(
                (pagination.currentPage - 1) * pagination.onPageCount,
                action.payload.result.length < paginationPageLastIndex
                    ? action.payload.result.length
                    : paginationPageLastIndex
            )
            state.currentAppoint = undefined
            state.currentAppointLoaded = false
            state.currentAppointLoading = false
            state.error = false
        },
        setAuditResultsPage(state, action: PayloadAction<number>) {
            const paginationPageLastIndex =
                action.payload * state.currentResultsPagination.onPageCount

            state.currentResults = state.data
                ? state.data.result.slice(
                      (action.payload - 1) *
                          state.currentResultsPagination.onPageCount,
                      state.data.result.length < paginationPageLastIndex
                          ? state.data.result.length
                          : paginationPageLastIndex
                  )
                : []

            state.currentResultsPagination.currentPage = action.payload
        },
    },
})

export const {
    startCurrentAuditWorker,
    endCurrentAuditWorker,
    setCurrentAudit,
    setAuditResultsPage,
    setCurrentAuditError,
} = currentAuditSlice.actions
export const currentAuditReducer = currentAuditSlice.reducer
