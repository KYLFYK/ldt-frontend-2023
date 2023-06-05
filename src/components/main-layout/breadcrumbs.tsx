import { HomeIcon } from '@heroicons/react/20/solid'
import React, { FC, useMemo } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'

import {
  RoutePaths,
  paramNameToName,
  pathToName,
} from '../../utils/routes/route-paths'

export const Breadcrumbs: FC = () => {
  const params = useParams<Record<string, string>>()
  const { pathname } = useLocation()
  const pages = useMemo(() => {
    const res: { name: string; href: string; current: boolean }[] = []
    let names: (RoutePaths | string)[] = pathname
      .split('/')
      .filter(Boolean)
      .map((el) => `/${el}` as RoutePaths)
      .filter((el) => Object.values(RoutePaths).includes(el))

    if (names.length === 1 && names[0] === RoutePaths.AUDIT) {
      names = names.filter((el) => el !== RoutePaths.AUDIT)
      res.push({
        name: pathToName(RoutePaths.AUDITS) as string,
        current: false,
        href: RoutePaths.AUDITS,
      })
    }

    const paramsKeys: string[] = Object.keys(params)

    res.push(
      ...names.map((el, index) => ({
        name: pathToName(el as RoutePaths) ?? '',
        href: pathname.split('/').splice(0, index).join('/') + el,
        current: index === names.length - 1,
      }))
    )

    if (paramsKeys.length > 0) {
      paramsKeys.forEach((pat, i) => {
        let pathn = res[res.length - 1].href + '/' + params[pat]

        if (pat === 'auditId') {
          pathn = RoutePaths.AUDIT + '/' + params[pat]
        }

        res.push({
          name: paramNameToName(pat),
          current: i === names.length,
          href: pathn,
        })
      })
    }

    return res
  }, [pathname, params])

  if (pathname === RoutePaths.BASE) {
    return null
  }

  return (
    <nav className="hidden h-10 sm:flex" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex space-x-4 rounded-md bg-white px-6 shadow"
      >
        <li className="flex">
          <div className="flex items-center">
            <NavLink
              to={RoutePaths.BASE}
              className="text-gray-400 hover:text-gray-500"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Главная</span>
            </NavLink>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name} className="flex">
            <div className="flex items-center">
              <svg
                className="h-full w-6 flex-shrink-0 text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <NavLink
                to={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </NavLink>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
