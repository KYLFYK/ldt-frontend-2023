import React, { FC } from 'react'

import { StatItem } from './stat-item'

export const DashboardStats: FC = () => {
  return (
    <div className="grid grid-cols-8 gap-4">
      <div className="col-span-2 flex flex-col gap-y-4">
        <StatItem label={'Проверки'} value={'29'} className="bg-indigo-50" />
        <StatItem
          label={'Последняя проверка'}
          value={'25 мая 17:34'}
          className="bg-amber-50"
        />
        <StatItem
          label={'Следующая проверка'}
          value={'30 мая 12:00'}
          className="bg-red-50"
        />
      </div>
      <div className="col-span-6 h-full">
        <div className="h-full w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  )
}
