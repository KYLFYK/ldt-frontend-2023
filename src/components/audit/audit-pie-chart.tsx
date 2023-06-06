import React, {
    FC,
    HTMLAttributes,
    useCallback,
    useMemo,
    useState,
} from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

import { AuditResultStatus } from '../../types/audits'
import { TAllStats } from '../../types/audits/audit-results'
import {
    AuditResultColors,
    auditResultEnToText,
} from '../../utils/audits/data-utils'
import { classNames } from '../../utils/common'
import { renderActiveShape } from '../../utils/common/charts'

type TProps = {
    wrapperClassName: HTMLAttributes<HTMLDivElement>['className']
    stats: TAllStats
}

function getActiveIndexByStats(stats: TAllStats): number {
    if (stats.green > 0) {
        return 0
    } else if (stats.warning > 0) {
        return 1
    } else if (stats.error > 0) {
        return 2
    } else return 3
}

export const AuditPieChart: FC<TProps> = ({ wrapperClassName, stats }) => {
    const [activeShape, setActiveShape] = useState<number>(
        getActiveIndexByStats(stats)
    )

    const handleMouseEnter = useCallback((_: any, index: number) => {
        setActiveShape(index)
    }, [])

    const chartData: {
        name: string
        value: number
        type: AuditResultStatus
    }[] = useMemo(
        () => [
            {
                name: auditResultEnToText(AuditResultStatus.SUCCESS),
                value: stats.green,
                type: AuditResultStatus.SUCCESS,
            },
            {
                name: auditResultEnToText(AuditResultStatus.WARNING),
                value: stats.warning,
                type: AuditResultStatus.WARNING,
            },
            {
                name: auditResultEnToText(AuditResultStatus.DANGER),
                value: stats.error,
                type: AuditResultStatus.DANGER,
            },
            {
                name: auditResultEnToText(AuditResultStatus.UNCHECKED),
                value: stats.unchecked,
                type: AuditResultStatus.UNCHECKED,
            },
        ],
        [stats]
    )

    return (
        <div
            className={classNames(
                wrapperClassName,
                'rounded-lg bg-gray-100 p-5'
            )}
        >
            <div className="text-center text-xl text-gray-600">
                Качество соблюдения КР в назначениях
            </div>
            <ResponsiveContainer width="100%" height={340}>
                <PieChart>
                    <Pie
                        data={chartData}
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={3}
                        dataKey="value"
                        activeShape={renderActiveShape}
                        onMouseEnter={handleMouseEnter}
                        activeIndex={activeShape}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={AuditResultColors[entry.type]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
