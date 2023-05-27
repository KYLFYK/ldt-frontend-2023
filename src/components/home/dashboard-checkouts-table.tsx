import React, { FC, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { HomePageMockState } from '../../mocks/home-page-mock-state'
import { TAuditListItem } from '../../types/audits'
import { TableDataSource } from '../../types/common/components-data'
import { auditsListRows } from '../../utils/audits/data-utils'
import { Table } from '../ui/table'

export const DashboardCheckoutsTable: FC = () => {
  const navigate = useNavigate()

  const dataSource: TableDataSource<TAuditListItem>[] = useMemo(() => {
    return HomePageMockState.dataColumns.map((el) => ({
      ...el,
      key: el.id,
    }))
  }, [])

  const rows = useMemo(() => auditsListRows(navigate), [])

  return <Table<TAuditListItem> dataSource={dataSource} rows={rows} />
}
