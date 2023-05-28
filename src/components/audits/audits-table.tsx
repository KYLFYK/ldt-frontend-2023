import React, { FC, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuditContext } from '../../contexts/audit-context'
import { TAuditListItem } from '../../types/audits'
import { TAppointsResult } from '../../types/audits/audit-results'
import { TableDataSource } from '../../types/common/components-data'
import { auditsListRows } from '../../utils/audits/data-utils'
import { Table } from '../ui/table'

export const AuditsTable: FC = () => {
  const navigate = useNavigate()

  const { data } = useAuditContext()

  const dataSource: TableDataSource<TAuditListItem>[] = useMemo(() => {
    return data.map((el) => ({
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
  }, [data])

  const rows = useMemo(() => auditsListRows(navigate), [])

  return (
    <Table<TableDataSource<TAuditListItem>>
      rows={rows}
      dataSource={dataSource}
      pagination={false}
      thClassName={'uppercase'}
    />
  )
}
