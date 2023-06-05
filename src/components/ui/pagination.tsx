import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import React, { FC, useCallback, useMemo } from 'react'

import { TPaginationData } from '../../types/common/components-data'
import { classNames } from '../../utils/common'
import { PaginationItem } from './pagination-item'

type TProps = TPaginationData

export const Pagination: FC<TProps> = ({
  currentPage,
  pagesCount,
  handleSelect,
  handlePrev,
  handleNext,
  onPageCount,
  itemsCount,
}) => {
  const pagesList: number[] = useMemo(() => {
    const res: number[] = []

    for (let i = 1; i <= pagesCount; i++) {
      if (i >= currentPage - 5 && i <= currentPage + 5) {
        res.push(i)
      }
    }

    return res
  }, [currentPage, pagesCount])

  const handleFirstPage = useCallback(() => {
    handleSelect(1)
  }, [])

  const handleLastPage = useCallback(() => {
    handleSelect(pagesCount)
  }, [pagesCount])

  const handleComponentPrev = useCallback(() => {
    if (currentPage !== 1) {
      handlePrev()
    }
  }, [currentPage, handlePrev])

  const handleComponentNext = useCallback(() => {
    if (currentPage !== pagesCount) {
      handleNext()
    }
  }, [currentPage, handlePrev, pagesCount])

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <span
          className="relative inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handleComponentPrev}
        >
          Назад
        </span>
        <span
          className="relative ml-3 inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handleComponentNext}
        >
          Далее
        </span>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Показываются с{' '}
            <span className="font-medium">
              {currentPage * onPageCount - 24}
            </span>{' '}
            по{' '}
            <span className="font-medium">
              {Math.min(onPageCount * currentPage, itemsCount)}
            </span>{' '}
            из <span className="font-medium">{itemsCount}</span> результатов
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md"
            aria-label="Pagination"
          >
            {pagesList[0] !== 1 && (
              <span
                className="relative inline-flex cursor-pointer items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={handleFirstPage}
              >
                <span>В начало</span>
              </span>
            )}
            {currentPage !== 1 && (
              <span
                className={classNames(
                  'relative inline-flex cursor-pointer items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                  pagesList[0] !== 1 ? undefined : 'rounded-l-md'
                )}
                onClick={handleComponentPrev}
              >
                <span className="sr-only">Назад</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            )}
            {pagesList.map((el) => (
              <PaginationItem
                isCurrent={el === currentPage}
                pageNumber={el}
                pagesCount={pagesCount}
                key={el}
                onSelect={handleSelect}
              />
            ))}
            {currentPage !== pagesCount && (
              <span
                onClick={handleComponentNext}
                className={classNames(
                  'relative inline-flex cursor-pointer items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                  pagesList[pagesList.length - 1] !== pagesCount
                    ? undefined
                    : 'rounded-r-md'
                )}
              >
                <span className="sr-only">Далее</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            )}
            {pagesList[pagesList.length - 1] !== pagesCount && (
              <span
                className="relative inline-flex cursor-pointer items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={handleLastPage}
              >
                <span>В конец</span>
              </span>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
