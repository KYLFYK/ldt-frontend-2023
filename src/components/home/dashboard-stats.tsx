import dayjs from 'dayjs'
import React, { FC } from 'react'

import { useAuditsSelector } from '../../ducks/audits/audits-list/selectors'
import { Loader } from '../ui/loader'
import { DashboardChart } from './dashboard-chart'
import { StatItem } from './stat-item'

export const DashboardStats: FC = () => {
    const { loading, data } = useAuditsSelector()

    return (
        <div className="grid grid-cols-8 gap-4">
            <div className="col-span-2 flex flex-col gap-y-4">
                <StatItem
                    label={'Проверки'}
                    value={
                        loading ? (
                            <Loader
                                iconClassName={
                                    'h-9 w-9 fill-blue-600 text-gray-200 dark:text-gray-600'
                                }
                            />
                        ) : (
                            data.length
                        )
                    }
                />
                <StatItem
                    label={'Последняя проверка'}
                    value={
                        loading ? (
                            <Loader
                                iconClassName={
                                    'h-9 w-9 fill-blue-600 text-gray-200 dark:text-gray-600'
                                }
                            />
                        ) : (
                            dayjs(data[0]?.dateStart).format('DD MMMM HH:mm') ??
                            'Не проводилась'
                        )
                    }
                />
                <StatItem
                    label={'Следующая проверка'}
                    value={
                        loading ? (
                            <Loader
                                iconClassName={
                                    'h-9 w-9 fill-blue-600 text-gray-200 dark:text-gray-600'
                                }
                            />
                        ) : (
                            dayjs()
                                .add(12, 'days')
                                .startOf('day')
                                .format('DD MMMM HH:mm') ?? 'Не проводилась'
                        )
                    }
                />
            </div>
            <div className="col-span-6 h-full">
                <div className="h-full w-full rounded-lg border border-gray-200">
                    <DashboardChart />
                </div>
            </div>
        </div>
    )
}
