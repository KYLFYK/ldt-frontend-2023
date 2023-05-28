import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { CheckoutStatus } from '../../types/common/data-types'
import { classNames } from '../../utils/common'
import {
  checkoutStatusToColorClass,
  checkoutStatusToString,
} from '../../utils/common/data-utils'
import { RoutePaths, pathToName } from '../../utils/routes/route-paths'

type TProps = {
  title: string
  status: CheckoutStatus
}

export const AuditHeading: FC<TProps> = ({ title, status }) => {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <nav className="flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <NavLink
                  to={RoutePaths.AUDITS}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {pathToName(RoutePaths.AUDITS)}
                </NavLink>
              </div>
            </li>
          </ol>
        </nav>
        <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-2 sm:flex-row sm:flex-wrap sm:space-x-6">
          <span
            className={classNames(
              'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
              checkoutStatusToColorClass(status)
            )}
          >
            {checkoutStatusToString(status)}
          </span>
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <DocumentArrowDownIcon
            className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Скачать XLSX
        </button>
        <button
          type="button"
          className="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <DocumentArrowDownIcon
            className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Скачать CSV
        </button>
        {/*<button*/}
        {/*  type="button"*/}
        {/*  className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
        {/*>*/}
        {/*  <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />*/}
        {/*  Подписать*/}
        {/*</button>*/}
      </div>
    </div>
  )
}
