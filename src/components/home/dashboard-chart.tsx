import React, { FC, useCallback } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

import { HomePageMockState } from '../../mocks/home-page-mock-state'
import { AuditResultStatus } from '../../types/audits'
import {
    AuditResultColors,
    auditResultEnToText,
} from '../../utils/audits/data-utils'

export const DashboardChart: FC = () => {
    const tooltipFormatter: (value: number, name: string) => [number, string] =
        useCallback((value, name) => {
            return [value, auditResultEnToText(name as AuditResultStatus)]
        }, [])

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={HomePageMockState}
                margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
            >
                <XAxis dataKey="date" />
                <Tooltip formatter={tooltipFormatter} />
                <Line
                    type="monotone"
                    dataKey={AuditResultStatus.SUCCESS}
                    stroke={AuditResultColors.SUCCESS}
                />
                <Line
                    type="monotone"
                    dataKey={AuditResultStatus.WARNING}
                    stroke={AuditResultColors.WARNING}
                />
                <Line
                    type="monotone"
                    dataKey={AuditResultStatus.DANGER}
                    stroke={AuditResultColors.DANGER}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
