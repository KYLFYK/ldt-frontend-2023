import React, { FC, Fragment, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../ducks'
import { useAuditsSelector } from '../../ducks/audits/audits-list/selectors'
import { setPageSelected } from '../../ducks/audits/audits-list/slice'
import { TAuditListItem } from '../../types/audits'
import { TAppointsResult } from '../../types/audits/audit-results'
import {
    TPaginationData,
    TableDataSource,
} from '../../types/common/components-data'
import { auditsListRows } from '../../utils/audits/data-utils'
import { EmptyState } from '../ui/empty-state'
import { Loader } from '../ui/loader'
import { Table } from '../ui/table'

export const DashboardCheckoutsTable: FC = () => {
    const dispatch = useAppDispatch()
    const { loading, currentUnfilteredPage, paginationData } =
        useAuditsSelector()
    const navigate = useNavigate()

    const dataSource: any = useMemo(() => {
        return currentUnfilteredPage.map((el) => ({
            name: el.name,
            id: el.id,
            type: el.type,
            status: el.status,
            dateStart: el.dateStart,
            dateEnd: el.dateEnd,
            result: el.result as TAppointsResult[],
            responsible: el.responsible,
            auditReason: el.auditReason,
            allStats: el.allStats,
            key: el.id,
        }))
    }, [currentUnfilteredPage])

    const rows = useMemo(() => auditsListRows(navigate), [])

    const pagination: TPaginationData = useMemo(() => {
        return {
            ...paginationData,
            handleNext: () => {
                dispatch(
                    setPageSelected({
                        page: paginationData.currentPage + 1,
                    })
                )
            },
            handlePrev: () => {
                dispatch(
                    setPageSelected({
                        page: paginationData.currentPage - 1,
                    })
                )
            },
            handleSelect: (num) => {
                dispatch(
                    setPageSelected({
                        page: num,
                    })
                )
            },
        }
    }, [paginationData])

    return (
        <Fragment>
            {loading ? (
                <div className="flex h-80 w-full items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <>
                    {currentUnfilteredPage.length > 0 ? (
                        <Table<TAuditListItem>
                            dataSource={
                                dataSource as TableDataSource<TAuditListItem>[]
                            }
                            rows={rows}
                            pagination={pagination}
                        />
                    ) : (
                        <EmptyState
                            containerClassName="w-full"
                            title={'Записи отсутствуют'}
                            description={
                                'По необходимым параметрам записей не найдено'
                            }
                        />
                    )}
                </>
            )}
        </Fragment>
    )
}
