import React, { FC, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuditResultStatus } from '../../types/audits'
import { TAppointsResult } from '../../types/audits/audit-results'
import { TableDataSource } from '../../types/common/components-data'
import { appointsRows, averageToResStatus } from '../../utils/audits/data-utils'
import { Table } from '../ui/table'

type TProps = {
  appointsList: TAppointsResult[]
  auditId: string | number
}

export type TAppointTableData<T = TAppointsResult['appointData']> = T & {
  id: string | number
  status: AuditResultStatus
}

export const AppointsTab: FC<TProps> = ({ appointsList, auditId }) => {
  const nav = useNavigate()

  const tableData: TableDataSource<TAppointTableData>[] = useMemo(
    () =>
      appointsList.map((el) => {
        return {
          gender: el.appointData.gender,
          birthDate: el.appointData.birthDate,
          patientId: el.appointData.patientId,
          mkbCode: el.appointData.mkbCode,
          mkbName: el.appointData.mkbName,
          serviceDate: el.appointData.serviceDate,
          doctorJobTitle: el.appointData.doctorJobTitle,
          id: el.id,
          status:
            el.error || !el.result
              ? AuditResultStatus.UNCHECKED
              : averageToResStatus(el.result.average),
          key: el.id,
        }
      }),
    []
  )

  const rows = useMemo(() => appointsRows(nav, auditId), [])

  return (
    <div className="max-w-full">
      <Table<TAppointTableData>
        dataSource={tableData}
        rows={rows}
        pagination={false}
      />
    </div>
  )
}
