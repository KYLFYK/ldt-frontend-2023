import dayjs from 'dayjs'
import React, { FC } from 'react'

import { HomePageMockState } from '../../mocks/home-page-mock-state'
import { TableRow } from '../../types/common/components-data'
import { CheckoutStatus } from '../../types/common/data-types'
import { IHomeLastCheckoutsSource } from '../../types/home'
import { classNames } from '../../utils/common'
import {
  checkoutStatusToColorClass,
  checkoutStatusToString,
} from '../../utils/common/data-utils'
import { Table } from '../ui/table'

const tableRows: TableRow<
  IHomeLastCheckoutsSource,
  keyof IHomeLastCheckoutsSource
>[] = [
  {
    dataKey: 'name',
    label: 'Наименование',
    renderFunc: (value, dataItem) => {
      return (
        <div className="flex flex-col gap-x-0.5">
          <span className="text-sm text-gray-900">{value as string}</span>
          <span className="text-sm text-gray-500">
            {dataItem.planned ? 'Плановая' : 'Внеплановая'}
          </span>
        </div>
      )
    },
  },
  {
    dataKey: 'status',
    label: 'Статус',
    renderFunc: (value) => {
      return (
        <span
          className={classNames(
            'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
            checkoutStatusToColorClass(value as CheckoutStatus)
          )}
        >
          {checkoutStatusToString(value as CheckoutStatus)}
        </span>
      )
    },
  },
  {
    dataKey: 'period',
    label: 'Период',
    renderFunc: (value) => {
      const period = value as IHomeLastCheckoutsSource['period']
      return `${dayjs(period[0]).format('DD.MM.YYYY')}-${dayjs(
        period[1]
      ).format('DD.MM.YYYY')}`
    },
  },
  {
    dataKey: 'cardsCount',
    label: 'Объем карт',
  },
  {
    dataKey: 'responsible',
    label: 'Ответственный',
    renderFunc: (value) => {
      const responsible = value as IHomeLastCheckoutsSource['responsible']
      return (
        <div className="flex flex-col gap-x-0.5">
          <span className="text-sm text-gray-900">{responsible.name}</span>
          <span className="text-sm text-gray-500">{responsible.role}</span>
        </div>
      )
    },
  },
]

export const DashboardCheckoutsTable: FC = () => {
  return (
    <Table<IHomeLastCheckoutsSource>
      dataSource={HomePageMockState.dataColumns}
      rows={tableRows}
      pagination={true}
    />
  )
}
