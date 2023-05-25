import dayjs from 'dayjs'

import { TableDataSource } from '../types/common/components-data'
import { CheckoutStatus } from '../types/common/data-types'
import { IHomeLastCheckoutsSource } from '../types/home'

export const HomePageMockState: {
  dataColumns: TableDataSource<IHomeLastCheckoutsSource>[]
} = {
  dataColumns: [
    {
      name: 'Первая проверка',
      planned: true,
      status: CheckoutStatus.IN_PROGRESS,
      period: [
        dayjs().add(1, 'days').toISOString(),
        dayjs().add(-5, 'days').toISOString(),
      ],
      cardsCount: 782,
      responsible: {
        name: 'Рогозина В.И.',
        role: 'Методист',
      },
      key: '34636',
    },
    {
      name: 'Некая проверка',
      planned: false,
      status: CheckoutStatus.COMPLETED,
      period: [
        dayjs().add(-2, 'days').toISOString(),
        dayjs().add(-3, 'days').toISOString(),
      ],
      cardsCount: 143,
      responsible: {
        name: 'Рогозина В.И.',
        role: 'Методист',
      },
      key: '5235',
    },
    {
      name: 'Проверка на ошибки',
      planned: true,
      status: CheckoutStatus.PLANNED,
      period: [
        dayjs().add(7, 'days').toISOString(),
        dayjs().add(12, 'days').toISOString(),
      ],
      cardsCount: 1438,
      responsible: {
        name: 'Рогозина В.И.',
        role: 'Методист',
      },
      key: '123',
    },
  ],
}
