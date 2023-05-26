import React, { FC } from 'react'

import { auditTypeOptions } from '../../utils/audits'
import { periods, statusOptions } from '../../utils/common/data-utils'
import { Select } from '../ui/select'

export const AuditsFilter: FC = () => {
  return (
    <ul
      role="list"
      className="my-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
    >
      <li className="col-span-1">
        <Select
          options={periods}
          defaultValue={periods[0]}
          placeHolder={'Выберите'}
          label={'Период'}
          containerClassName="w-full"
        />
      </li>
      <li className="col-span-1">
        <Select
          options={[]}
          placeHolder={'Выберите'}
          label={'Ответственный'}
          containerClassName="w-full"
        />
      </li>
      <li className="col-span-1">
        <Select
          options={auditTypeOptions}
          placeHolder={'Выберите'}
          label={'Тип проверки'}
          containerClassName="w-full"
        />
      </li>
      <li className="col-span-1">
        <Select
          options={statusOptions}
          placeHolder={'Выберите'}
          label={'Статус'}
          containerClassName="w-full"
        />
      </li>
    </ul>
  )
}
