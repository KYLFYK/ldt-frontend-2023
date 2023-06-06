import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { TAuditPageResult } from '../../../types/audits/audit-results'
import { TPagination } from '../../../types/common/components-data'
import { getBasePaginationData } from '../../../utils/common'

type TState = {
    data: TAuditPageResult[]
    loaded: boolean
    loading: boolean
    error: boolean
    currentPage: TAuditPageResult[]
    paginationData: TPagination
}

const initialState: TState = {
    data: [],
    loaded: false,
    loading: false,
    error: false,
    currentPage: [],
    paginationData: getBasePaginationData(1),
}

const auditsListSlice = createSlice({
    name: 'audits/list',
    initialState: initialState as TState,
    reducers: {
        startAuditListWorker(state) {
            state.loading = true
        },
        endAuditListWorker(state) {
            state.loading = false
        },
        setAuditsList(state, action: PayloadAction<TAuditPageResult[]>) {
            const pagination = getBasePaginationData(action.payload.length)
            const paginationPageLastIndex =
                pagination.currentPage * pagination.onPageCount

            const sortedData = action.payload.sort(
                (a, b) => dayjs(b.dateStart).unix() - dayjs(a.dateStart).unix()
            )

            state.data = sortedData
            state.loaded = true
            state.paginationData = pagination
            state.currentPage = sortedData.slice(
                (pagination.currentPage - 1) * pagination.onPageCount,
                action.payload.length < paginationPageLastIndex
                    ? action.payload.length
                    : paginationPageLastIndex
            )
        },
        setPageSelected(state, action: PayloadAction<{ page: number }>) {
            const paginationPageLastIndex =
                action.payload.page * state.paginationData.onPageCount
            state.paginationData.currentPage = action.payload.page
            state.currentPage = state.data.slice(
                (action.payload.page - 1) * state.paginationData.onPageCount,
                state.data.length < paginationPageLastIndex
                    ? state.data.length
                    : paginationPageLastIndex
            )
        },
        setAuditsError(state) {
            state.error = true
            state.loaded = false
        },
    },
})

export const {
    setAuditsError,
    setAuditsList,
    endAuditListWorker,
    startAuditListWorker,
    setPageSelected,
} = auditsListSlice.actions
export const auditsListReducer = auditsListSlice.reducer
