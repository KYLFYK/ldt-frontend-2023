import React, { FC } from 'react'

import { TAllStats } from '../../types/audits/audit-results'
import { classNames } from '../../utils/common'

const percentToHeightClassName: (percent: number) => string = (percent) => {
  switch (true) {
    case percent > 90:
      return 'h-5'
    case percent > 80:
      return 'h-4'
    case percent > 60:
      return 'h-3.5'
    case percent > 40:
      return 'h-2.5'
    case percent > 30:
      return 'h-2'
    case percent > 10:
      return 'h-1.5'
    case percent > 0:
      return 'h-1'
    default:
      return 'h-1'
  }
}

type TProps = {
  results: TAllStats
}

export const SmProgressChart: FC<TProps> = ({ results }) => {
  return (
    <div className="flex h-5 items-end p-1">
      <span
        className={classNames(
          'ml-0.5 w-3 rounded-t-sm bg-green-400',
          percentToHeightClassName(results.green)
        )}
      />
      <span
        className={classNames(
          'ml-0.5 w-3 rounded-t-sm bg-yellow-300',
          percentToHeightClassName(results.warning)
        )}
      />
      <span
        className={classNames(
          'ml-0.5 w-3 rounded-t-sm bg-pink-500',
          percentToHeightClassName(results.error)
        )}
      />
      <span
        className={classNames(
          'ml-0.5 w-3 rounded-t-sm bg-gray-300',
          percentToHeightClassName(results.unchecked)
        )}
      />
    </div>
  )
}
