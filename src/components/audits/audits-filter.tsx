import React, { FC } from 'react'

import { TAuditFilters } from '../../types/audits/audit-results'
import { auditTypeOptions } from '../../utils/audits'
import { periods, statusOptions } from '../../utils/common/data-utils'
import { Select } from '../ui/select'

type TProps = {
    filters: TAuditFilters
}

export const AuditsFilter: FC<TProps> = ({ filters }) => {
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
                    value={filters.period}
                />
            </li>
            <li className="col-span-1">
                <Select
                    options={auditTypeOptions}
                    placeHolder={'Выберите'}
                    label={'Тип проверки'}
                    containerClassName="w-full"
                    value={filters.type}
                />
            </li>
            <li className="col-span-1">
                <Select
                    options={statusOptions}
                    placeHolder={'Выберите'}
                    label={'Статус'}
                    containerClassName="w-full"
                    value={filters.status}
                />
            </li>
        </ul>
    )
}
