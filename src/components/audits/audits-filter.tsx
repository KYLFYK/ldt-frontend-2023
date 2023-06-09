import React, { FC, useCallback } from 'react'

import { useAppDispatch } from '../../ducks'
import { setFilterData } from '../../ducks/audits/audits-list/slice'
import { TAuditFilters } from '../../types/audits/audit-results'
import { auditTypeOptions } from '../../utils/audits'
import { periods, statusOptions } from '../../utils/common/data-utils'
import { Select, TSelectProps } from '../ui/select'

type TProps = {
    filters: TAuditFilters
}

type TFilterItemProps<T> = {
    Component: typeof Select
    componentProps: TSelectProps<T>
    handleFilterChange: <E extends keyof TAuditFilters>(
        name: E,
        value: TAuditFilters[E]
    ) => void
    name: keyof TAuditFilters
}

const FilterPeriodsItem: <T extends string | number>(
    props: TFilterItemProps<T>
) => JSX.Element = ({
    Component,
    componentProps,
    handleFilterChange,
    name,
}) => {
    const handleChange = useCallback(
        (value: TAuditFilters[typeof name]) => {
            if (value === 'any') {
                handleFilterChange(name, undefined)
            } else {
                handleFilterChange(name, value)
            }
        },
        [handleFilterChange, name]
    )

    return (
        <li className="col-span-1">
            <Component {...componentProps} onChange={handleChange as any} />
        </li>
    )
}

export const AuditsFilter: FC<TProps> = ({ filters }) => {
    const dispatch = useAppDispatch()

    const handleChangeFilteredData = useCallback(
        <T extends keyof TAuditFilters>(name: T, value: TAuditFilters[T]) => {
            dispatch(
                setFilterData({
                    ...filters,
                    [name]: value,
                })
            )
        },
        [filters]
    )

    return (
        <ul
            role="list"
            className="my-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        >
            <FilterPeriodsItem
                Component={Select}
                componentProps={{
                    options: [
                        {
                            label: 'Любой',
                            value: 'any',
                        },
                        ...periods,
                    ],
                    placeHolder: 'Выберите',
                    label: 'Период',
                    containerClassName: 'w-full',
                    value: filters.period,
                    defaultValue: {
                        label: 'Любой',
                        value: 'any',
                    },
                }}
                handleFilterChange={handleChangeFilteredData}
                name={'period'}
            />
            <FilterPeriodsItem
                Component={Select}
                componentProps={{
                    options: [
                        {
                            label: 'Любой',
                            value: 'any',
                        },
                        ...auditTypeOptions,
                    ],
                    placeHolder: 'Выберите',
                    label: 'Тип проверки',
                    containerClassName: 'w-full',
                    value: filters.type,
                    defaultValue: {
                        label: 'Любой',
                        value: 'any',
                    },
                }}
                handleFilterChange={handleChangeFilteredData}
                name={'type'}
            />
            <FilterPeriodsItem
                Component={Select}
                componentProps={{
                    options: [
                        {
                            label: 'Любой',
                            value: 'any',
                        },
                        ...statusOptions,
                    ],
                    placeHolder: 'Выберите',
                    label: 'Статус',
                    containerClassName: 'w-full',
                    value: filters.status,
                    defaultValue: {
                        label: 'Любой',
                        value: 'any',
                    },
                }}
                handleFilterChange={handleChangeFilteredData}
                name={'status'}
            />
        </ul>
    )
}
