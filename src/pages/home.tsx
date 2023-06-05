import React, { FC } from 'react'

import { DashboardCheckoutsTable } from '../components/home/dashboard-checkouts-table'
import { DashboardFilters } from '../components/home/dashboard-filters'
import { DashboardStats } from '../components/home/dashboard-stats'

export const Home: FC = () => {
    return (
        <div className="h-full">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Кабинет медицинского эксперта
            </h2>
            <DashboardFilters />
            <DashboardStats />
            <DashboardCheckoutsTable />
        </div>
    )
}
