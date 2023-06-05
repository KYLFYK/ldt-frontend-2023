import React, { FC } from 'react'

import { OptionList } from '../../types/common/components-data'
import { auditTypeOptions } from '../../utils/audits'
import { periods } from '../../utils/common/data-utils'
import { Select } from '../ui/select'

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

export const DashboardFilters: FC = () => {
    return (
        <div className="my-8 flex gap-x-6 gap-y-4">
            <Select
                label={'Период'}
                options={periods}
                defaultValue={periods[0]}
            />
            <Select label={'Отделение'} options={departments} />
            <Select label={'Тип проверки'} options={auditTypeOptions} />
        </div>
    )
}
