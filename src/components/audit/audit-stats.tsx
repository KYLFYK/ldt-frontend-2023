import React, { FC } from 'react'

import { TAllStats } from '../../types/audits/audit-results'
import { AuditPieChart } from './audit-pie-chart'
import { AuditStatItem } from './audit-stat-item'

type TProps = {
    stats: TAllStats
}

export const AuditStats: FC<TProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-12 gap-5">
            <AuditPieChart
                wrapperClassName="col-span-12 sm:col-span-4"
                stats={stats}
            />
            <div className="col-span-12 grid grid-cols-12 gap-5 sm:col-span-8 sm:grid-cols-8">
                <AuditStatItem
                    label={'Всего назначений'}
                    value={stats.cardsCount}
                />
                <AuditStatItem
                    label={'Назначения с клиническими рекомендациями'}
                    value={stats.cardsCount - stats.unchecked}
                />
                <AuditStatItem
                    label={'Проверенные назначения'}
                    value={stats.cardsCount - stats.unchecked}
                />
                <AuditStatItem
                    label={'Назначения без клинических рекомендаций'}
                    value={stats.unchecked}
                />
            </div>
        </div>
    )
}
