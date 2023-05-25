import React, { FC } from 'react'

import { OptionList } from '../../types/common/components-data'
import { Period } from '../../types/common/data-types'
import { Select } from '../ui/select'

const periods: OptionList<Period> = [
  { value: Period.MONTHS, label: 'Месяц' },
  { value: Period.WEEK, label: 'Неделя' },
  { value: Period.YEAR, label: 'Год' },
  { value: Period.DAY, label: 'День' },
  { value: Period.CUSTOM, label: 'Выбрать период' },
]

const departments: OptionList = [
  {
    value: '1',
    label: 'Отделение 1',
  },
  {
    value: '2',
    label: 'Отделение 2',
  },
  {
    value: '3',
    label: 'Отделение 3',
  },
]

const types: OptionList = [
  {
    value: '1',
    label: 'Тип 1',
  },
  {
    value: '2',
    label: 'Тип 2',
  },
  {
    value: '3',
    label: 'Тип 3',
  },
]

export const DashboardFilters: FC = () => {
  return (
    <div className="my-8 flex gap-x-6 gap-y-4">
      <Select label={'Период'} options={periods} defaultValue={periods[0]} />
      <Select label={'Отделение'} options={departments} />
      <Select label={'Тип проверки'} options={types} />
    </div>
  )
}
