import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import React, { FC } from 'react'

import { PaginationItem } from './pagination-item'

type TProps = {
  currentPage: number
  pages: number[]
  handleNext?: () => void
  handlePrev?: () => void
  handleSelect?: (page: number) => void
}

export const Pagination: FC<TProps> = ({
  currentPage,
  pages,
  handleSelect,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <span
          className="relative inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handlePrev}
        >
          Назад
        </span>
        <span
          className="relative ml-3 inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handleNext}
        >
          Далее
        </span>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Показываются с <span className="font-medium">1</span> по{' '}
            <span className="font-medium">3</span> из{' '}
            <span className="font-medium">97</span> результатов
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md"
            aria-label="Pagination"
          >
            <span
              className="relative inline-flex cursor-pointer items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={handlePrev}
            >
              <span className="sr-only">Назад</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            {pages.map((el) => (
              <PaginationItem
                isCurrent={el === currentPage}
                pageNumber={el}
                key={el}
                onSelect={handleSelect}
              />
            ))}
            <span
              onClick={handleNext}
              className="relative inline-flex cursor-pointer items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Далее</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </nav>
        </div>
      </div>
    </div>
  )
}
