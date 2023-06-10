import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AuditResultStatus } from '../../../types/audits'
import {
    TAppointsResult,
    TAuditPageResult,
} from '../../../types/audits/audit-results'
import { TPagination } from '../../../types/common/components-data'
import { hardScoreToStatus } from '../../../utils/audits'
import { getBasePaginationData } from '../../../utils/common'

export type TAppointsFilters = {
    resStatus?: AuditResultStatus
}

type TState = {
    data: TAuditPageResult | undefined
    loaded: boolean
    loading: boolean
    error: boolean
    filters: TAppointsFilters
    allDataFiltered: TAppointsResult[]
    filteredResults: TAppointsResult[]
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
    filters: {},
    allDataFiltered: [],
    filteredResults: [],
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

            state.filters = {}

            state.data = action.payload
            state.loaded = true
            state.currentResultsPagination = getBasePaginationData(
                action.payload.result.length
            )
            state.allDataFiltered = action.payload.result
            state.filteredResults = action.payload.result.slice(
                (pagination.currentPage - 1) * pagination.onPageCount,
                action.payload.result.length < paginationPageLastIndex
                    ? action.payload.result.length
                    : paginationPageLastIndex
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

            state.filteredResults = state.data
                ? state.allDataFiltered.slice(
                      (action.payload - 1) *
                          state.currentResultsPagination.onPageCount,
                      state.allDataFiltered.length < paginationPageLastIndex
                          ? state.allDataFiltered.length
                          : paginationPageLastIndex
                  )
                : []

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
        setAppointsFilters(state, action: PayloadAction<TAppointsFilters>) {
            const filters = {
                ...state.filters,
                ...action.payload,
            }

            if (Object.values(filters).filter(Boolean).length > 0) {
                state.filters = filters

                const allFilteredData = [...(state.data?.result ?? [])].filter(
                    (el) => {
                        let result = true

                        Object.keys(filters).forEach((filterKey) => {
                            switch (filterKey as keyof TAppointsFilters) {
                                case 'resStatus':
                                    if (
                                        filters[filterKey as 'resStatus'] ===
                                            AuditResultStatus.UNCHECKED &&
                                        !el.error
                                    ) {
                                        result = false
                                    } else if (
                                        hardScoreToStatus(
                                            el.result?.average ?? 0
                                        ) !== filters[filterKey as 'resStatus']
                                    ) {
                                        result = false
                                    }
                            }
                        })

                        return result
                    }
                )

                const pagination = getBasePaginationData(
                    allFilteredData.length ?? 0
                )
                const paginationPageLastIndex =
                    pagination.currentPage * pagination.onPageCount

                state.currentResultsPagination = pagination

                state.allDataFiltered = allFilteredData

                state.filteredResults = allFilteredData.slice(
                    (pagination.currentPage - 1) * pagination.onPageCount,
                    (allFilteredData.length ?? 0) < paginationPageLastIndex
                        ? allFilteredData.length ?? 0
                        : paginationPageLastIndex
                )
            } else {
                const pagination = getBasePaginationData(
                    state.data?.result.length ?? 0
                )
                const paginationPageLastIndex =
                    pagination.currentPage * pagination.onPageCount

                state.filters = {}
                state.currentResultsPagination = pagination
                state.allDataFiltered = state.data?.result ?? []

                state.filteredResults = (state.data?.result ?? []).slice(
                    (pagination.currentPage - 1) * pagination.onPageCount,
                    (state.data?.result?.length ?? 0) < paginationPageLastIndex
                        ? state.data?.result?.length ?? 0
                        : paginationPageLastIndex
                )
            }
        },
    },
})

export const {
    startCurrentAuditWorker,
    endCurrentAuditWorker,
    setCurrentAudit,
    setAuditResultsPage,
    setCurrentAuditError,
    setAppointsFilters,
} = currentAuditSlice.actions
export const currentAuditReducer = currentAuditSlice.reducer
