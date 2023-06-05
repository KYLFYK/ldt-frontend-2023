import React, { FC, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { TAuditListItem } from '../../types/audits'
import { TAuditPageResult } from '../../types/audits/audit-results'
import {
    TPaginationData,
    TableDataSource,
} from '../../types/common/components-data'
import { auditsListRows } from '../../utils/audits/data-utils'
import { Table } from '../ui/table'

type Props = {
    pagination: TPaginationData
    currentPage: TAuditPageResult[]
}

export const AuditsTable: FC<Props> = ({ pagination, currentPage }) => {
    const navigate = useNavigate()

    const dataSource: TableDataSource<any>[] = useMemo(() => {
        return currentPage.map((el) => ({
            name: el.name,
            id: el.id,
            type: el.type,
            status: el.status,
            dateStart: el.dateStart,
            dateEnd: el.dateEnd,
            result: el.result,
            responsible: el.responsible,
            auditReason: el.auditReason,
            allStats: el.allStats,
            key: el.id,
        }))
    }, [currentPage])

    const rows = useMemo(() => auditsListRows(navigate), [])

    return (
        <Table<TableDataSource<TAuditListItem>>
            rows={rows}
            dataSource={dataSource as any}
            pagination={pagination}
            thClassName={'uppercase'}
        />
    )
}
