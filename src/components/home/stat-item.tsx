import React, { FC, HTMLAttributes } from 'react'

import { classNames } from '../../utils/common'

type TProps = {
  label: string
  value: string
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export const StatItem: FC<TProps> = ({ label, value, className = '' }) => {
  return (
    <div
      className={classNames(
        'overflow-hidden rounded-lg border border-gray-200 px-4 py-5 sm:p-6',
        className
      )}
    >
      <dt className="truncate text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
        {value}
      </dd>
    </div>
  )
}
