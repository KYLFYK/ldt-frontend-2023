import React, { FC, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../ducks'
import { useCurrentAudit } from '../../ducks/audits/current/selectors'
import { setAuditResultsPage } from '../../ducks/audits/current/slice'
import { AuditResultStatus } from '../../types/audits'
import { TAppointsResult } from '../../types/audits/audit-results'
import {
  TPaginationData,
  TableDataSource,
} from '../../types/common/components-data'
import { appointsRows, averageToResStatus } from '../../utils/audits/data-utils'
import { Table } from '../ui/table'

export type TAppointTableData<T = TAppointsResult['appointData']> = T & {
  id: string | number
  status: AuditResultStatus
  result: string
}

export const AppointsTab: FC = () => {
  const dispatch = useAppDispatch()
  const nav = useNavigate()

  const { currentResultsPagination, currentResults, data } = useCurrentAudit()

  const tableData: TableDataSource<TAppointTableData>[] = useMemo(
    () =>
      currentResults.map((el) => {
        return {
          gender: el.appointData.gender,
          birthDate: el.appointData.birthDate,
          patientId: el.appointData.patientId,
          mkbCode: el.appointData.mkbCode,
          mkbName: el.appointData.mkbName,
          serviceDate: el.appointData.serviceDate,
          doctorJobTitle: el.appointData.doctorJobTitle,
          id: el.id,
          result: el.result ? `${el.result.average} %` : el.error ? '' : '',
          status:
            el.error || !el.result
              ? AuditResultStatus.UNCHECKED
              : averageToResStatus(el.result.average),
          key: el.id,
        }
      }),
    [currentResults]
  )

  const paginationData: TPaginationData = useMemo(
    () => ({
      ...currentResultsPagination,
      handleSelect: (page) => {
        dispatch(setAuditResultsPage(page))
      },
      handlePrev: () => {
        dispatch(setAuditResultsPage(currentResultsPagination.currentPage - 1))
      },
      handleNext: () => {
        dispatch(setAuditResultsPage(currentResultsPagination.currentPage + 1))
      },
    }),
    [currentResultsPagination]
  )

  const rows = useMemo(() => appointsRows(nav, data?.id ?? ''), [data])

  return (
    <div className="max-w-full">
      <Table<TAppointTableData>
        dataSource={tableData}
        rows={rows}
        pagination={paginationData}
      />
    </div>
  )
}
