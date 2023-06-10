import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import {
    TAuditFilters,
    TAuditPageResult,
} from '../../../types/audits/audit-results'
import { TPagination } from '../../../types/common/components-data'
import { Period } from '../../../types/common/data-types'
import { getBasePaginationData } from '../../../utils/common'
import { getPeriodDatesBetween } from '../../../utils/common/data-utils'

type TState = {
    data: TAuditPageResult[]
    loaded: boolean
    loading: boolean
    error: boolean
    filteredData: TAuditPageResult[]
    currentUnfilteredPage: TAuditPageResult[]
    currentPage: TAuditPageResult[]
    paginationData: TPagination
    filters: TAuditFilters
}

const initialState: TState = {
    data: [],
    loaded: false,
    loading: false,
    error: false,
    currentUnfilteredPage: [],
    currentPage: [],
    filteredData: [],
    paginationData: getBasePaginationData(1),
    filters: {},
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
            state.filters = {}

            const sortedData = action.payload.sort(
                (a, b) => dayjs(b.dateStart).unix() - dayjs(a.dateStart).unix()
            )

            const firstPageData = sortedData.slice(
                (pagination.currentPage - 1) * pagination.onPageCount,
                action.payload.length < paginationPageLastIndex
                    ? action.payload.length
                    : paginationPageLastIndex
            )

            state.data = sortedData
            state.loaded = true
            state.paginationData = pagination
            state.filteredData = sortedData
            state.currentPage = firstPageData
            state.currentUnfilteredPage = firstPageData
        },
        setPageSelected(state, action: PayloadAction<{ page: number }>) {
            const paginationPageLastIndex =
                action.payload.page * state.paginationData.onPageCount
            state.paginationData.currentPage = action.payload.page
            state.currentUnfilteredPage = state.data.slice(
                (action.payload.page - 1) * state.paginationData.onPageCount,
                state.data.length < paginationPageLastIndex
                    ? state.data.length
                    : paginationPageLastIndex
            )
            state.currentPage = state.filteredData.slice(
                (action.payload.page - 1) * state.paginationData.onPageCount,
                state.filteredData.length < paginationPageLastIndex
                    ? state.filteredData.length
                    : paginationPageLastIndex
            )
        },
        setFilterData(state, action: PayloadAction<TAuditFilters>) {
            const filters = {
                ...state.filters,
                ...action.payload,
            }

            if (Object.values(filters).filter(Boolean).length > 0) {
                state.filters = filters

                const filteredData = [
                    ...state.data.filter((el) => {
                        let res = true

                        Object.keys(filters).forEach((filterKey) => {
                            switch (filterKey) {
                                case 'type':
                                    if (
                                        el.type &&
                                        el.type !== filters[filterKey]
                                    ) {
                                        res = false
                                    }
                                    break
                                case 'status':
                                    if (
                                        el.status &&
                                        el.status !== filters[filterKey]
                                    ) {
                                        res = false
                                    }
                                    break
                                case 'period':
                                    if (filters[filterKey]) {
                                        const period = getPeriodDatesBetween(
                                            filters[filterKey] as Period
                                        )

                                        const elStartDate = dayjs(el.dateStart)

                                        if (
                                            !elStartDate.isAfter(period[0]) ||
                                            !elStartDate.isBefore(period[1])
                                        ) {
                                            res = false
                                        }
                                    }

                                    break
                            }
                        })

                        return res
                    }),
                ]

                const pagination = getBasePaginationData(filteredData.length)
                const paginationPageLastIndex =
                    pagination.currentPage * pagination.onPageCount

                state.paginationData = pagination

                state.filteredData = filteredData
                state.currentPage = filteredData.slice(
                    (pagination.currentPage - 1) * pagination.onPageCount,
                    filteredData.length < paginationPageLastIndex
                        ? filteredData.length
                        : paginationPageLastIndex
                )
            } else {
                const pagination = getBasePaginationData(state.data.length)
                const paginationPageLastIndex =
                    pagination.currentPage * pagination.onPageCount

                state.filters = {}
                state.filteredData = state.data

                const firstPageData = state.data.slice(
                    (pagination.currentPage - 1) * pagination.onPageCount,
                    state.data.length < paginationPageLastIndex
                        ? state.data.length
                        : paginationPageLastIndex
                )

                state.currentPage = firstPageData
                state.currentUnfilteredPage = firstPageData
            }
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
    setFilterData,
} = auditsListSlice.actions
export const auditsListReducer = auditsListSlice.reducer
