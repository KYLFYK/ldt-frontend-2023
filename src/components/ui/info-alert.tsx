import { InformationCircleIcon } from '@heroicons/react/24/solid'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { RoutePaths } from '../../utils/routes/route-paths'

type TProps = {
  text: string
  subText?: string
  detailsHref?: RoutePaths
  detailsText?: string
}

export const InfoAlert: FC<TProps> = ({
  text,
  detailsText,
  detailsHref,
  subText,
}) => {
  return (
    <div className="w-full rounded-md bg-blue-50 p-4 lg:w-1/2">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        </div>
        <div
          className={
            subText ? 'ml-3' : 'ml-3 flex-1 md:flex md:justify-between'
          }
        >
          {subText ? (
            <>
              <h3 className="text-sm font-medium text-blue-800">{text}</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>{subText}</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-blue-700">{text}</p>
          )}
          {subText && !!detailsHref ? (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <NavLink
                  to={detailsHref}
                  className="rounded-md bg-blue-100 px-2 py-1.5 text-sm font-medium text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50"
                >
                  {detailsText}
                </NavLink>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm md:ml-6 md:mt-0">
              {detailsText && detailsHref ? (
                <NavLink
                  to={detailsHref}
                  className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                >
                  {detailsText}
                  <span aria-hidden="true"> &rarr;</span>
                </NavLink>
              ) : null}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
