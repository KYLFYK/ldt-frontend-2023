import React, { FC, ReactNode } from 'react'

type TProps = {
    label: string
    value: ReactNode
}

export const AuditStatItem: FC<TProps> = ({ label, value }) => {
    return (
        <div className="col-span-6 flex flex-col justify-between overflow-hidden rounded-lg border border-gray-200 px-4 py-5 sm:col-span-4 sm:p-6 xl:col-span-2">
            <dt className="truncate text-sm font-medium text-gray-500">
                {label}
            </dt>
            <dd className="text-3xl font-semibold tracking-tight text-gray-900">
                {value}
            </dd>
        </div>
    )
}
