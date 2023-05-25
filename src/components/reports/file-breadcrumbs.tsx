import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { NavLink, Params, useNavigate } from 'react-router-dom'

import { DocumentsMockState } from '../../mocks/documents-mock-state'
import { TDocuments } from '../../types/documents'
import { RoutePaths } from '../../utils/routes/route-paths'

type TProps = {
  params: Readonly<Params>
}

export const FileBreadcrumbs: FC<TProps> = ({ params }) => {
  const navigate = useNavigate()
  const [haveNotFound, setHaveNotFound] = useState<string | undefined>(
    undefined
  )

  const handleBack = useCallback(() => {
    const paramsList = params['*']
    if (paramsList) {
      if (paramsList.split('/').length === 1) {
        navigate(RoutePaths.REPORTS)
      } else {
        const arr = paramsList.split('/')
        arr.splice(-1)

        navigate(`${RoutePaths.REPORTS}/${arr.join('/')}`)
      }
    }
  }, [params])

  const routes = useMemo(() => {
    if (params['*']) {
      let prev: string = RoutePaths.REPORTS
      let currentNode: TDocuments | undefined = DocumentsMockState.tree

      return params['*'].split('/').map((folderId) => {
        currentNode = currentNode?.children?.find(
          (node) => node.id === folderId
        )

        if (!currentNode) {
          setHaveNotFound(prev)
          return {
            name: '',
            link: '',
          }
        }

        prev += `/${folderId}`

        return {
          name: currentNode.name,
          link: prev,
        }
      })
    } else {
      return []
    }
  }, [params])

  useEffect(() => {
    if (haveNotFound) {
      navigate(haveNotFound)
      setHaveNotFound(undefined)
    }
  }, [haveNotFound])

  return (
    <div className="pb-2 sm:pb-6">
      <nav className="sm:hidden" aria-label="Back">
        {routes.length !== 0 && (
          <div
            className="flex cursor-pointer items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            onClick={handleBack}
          >
            <ChevronLeftIcon
              className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            Назад
          </div>
        )}
      </nav>
      <nav className="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div className="flex">
              <NavLink
                to={RoutePaths.REPORTS}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Мои документы
              </NavLink>
            </div>
          </li>
          {routes.map((el) => (
            <li key={el.link}>
              <div className="flex items-center">
                <ChevronRightIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <NavLink
                  to={el.link}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {el.name}
                </NavLink>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
