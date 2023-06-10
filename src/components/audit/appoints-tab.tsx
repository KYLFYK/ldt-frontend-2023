import React, { FC, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../ducks'
import { useCurrentAudit } from '../../ducks/audits/current/selectors'
import {
    setAppointsFilters,
    setAuditResultsPage,
} from '../../ducks/audits/current/slice'
import { AuditResultStatus } from '../../types/audits'
import { TAppointsResult } from '../../types/audits/audit-results'
import {
    TPaginationData,
    TableDataSource,
} from '../../types/common/components-data'
import { appointsRows, averageToResStatus } from '../../utils/audits/data-utils'
import { Select } from '../ui/select'
import { Table } from '../ui/table'

export type TAppointTableData<T = TAppointsResult['appointData']> = T & {
    id: string | number
    status: AuditResultStatus
    result: string
}

export const AppointsTab: FC = () => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const { currentResultsPagination, filteredResults, data } =
        useCurrentAudit()

    const tableData: TableDataSource<TAppointTableData>[] = useMemo(
        () =>
            filteredResults.map((el) => {
                return {
                    gender: el.appointData.gender,
                    birthDate: el.appointData.birthDate,
                    patientId: el.appointData.patientId,
                    mkbCode: el.appointData.mkbCode,
                    mkbName: el.appointData.mkbName,
                    serviceDate: el.appointData.serviceDate,
                    doctorJobTitle: el.appointData.doctorJobTitle,
                    id: el.id,
                    result: el.result
                        ? `${el.result.average} %`
                        : el.error
                        ? ''
                        : '',
                    status:
                        el.error || !el.result
                            ? AuditResultStatus.UNCHECKED
                            : averageToResStatus(el.result.average),
                    key: el.id,
                }
            }),
        [filteredResults]
    )

    const paginationData: TPaginationData = useMemo(
        () => ({
            ...currentResultsPagination,
            handleSelect: (page) => {
                dispatch(setAuditResultsPage(page))
            },
            handlePrev: () => {
                dispatch(
                    setAuditResultsPage(
                        currentResultsPagination.currentPage - 1
                    )
                )
            },
            handleNext: () => {
                dispatch(
                    setAuditResultsPage(
                        currentResultsPagination.currentPage + 1
                    )
                )
            },
        }),
        [currentResultsPagination]
    )

    const rows = useMemo(() => appointsRows(nav, data?.id ?? ''), [data])

    const handleFilterChange = useCallback(
        (value: AuditResultStatus | 'all') => {
            dispatch(
                setAppointsFilters({
                    resStatus: value === 'all' ? undefined : value,
                })
            )
        },
        []
    )

    return (
        <div className="max-w-full">
            <div className="my-8 flex gap-4">
                <Select
                    defaultValue={{
                        label: 'Все',
                        value: 'all',
                    }}
                    onChange={handleFilterChange as any}
                    label={'Отфильтровать по статусу'}
                    options={[
                        {
                            label: 'Все',
                            value: 'all',
                        },
                        {
                            label: 'Успешные',
                            value: AuditResultStatus.SUCCESS,
                        },
                        {
                            label: 'Возможны ошибки',
                            value: AuditResultStatus.WARNING,
                        },
                        {
                            label: 'С ошибками',
                            value: AuditResultStatus.DANGER,
                        },
                    ]}
                />
            </div>
            <div>
                <Table<TAppointTableData>
                    dataSource={tableData}
                    rows={rows}
                    pagination={paginationData}
                />
            </div>
        </div>
    )
}
