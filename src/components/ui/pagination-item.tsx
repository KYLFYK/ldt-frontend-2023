import React, { FC, useCallback } from 'react'

import { classNames } from '../../utils/common'

type TProps = {
    onSelect?: (el: number) => void
    pageNumber: number
    isCurrent: boolean
    pagesCount: number
}

export const PaginationItem: FC<TProps> = ({
    onSelect,
    isCurrent,
    pageNumber,
    pagesCount,
}) => {
    const handleSelect = useCallback(() => {
        if (onSelect && !isCurrent) {
            onSelect(pageNumber)
        }
    }, [onSelect, isCurrent, pageNumber])

    return (
        <span
            aria-current={isCurrent ? 'page' : undefined}
            className={classNames(
                isCurrent
                    ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    : 'relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                1 === pageNumber && isCurrent ? 'rounded-l-md' : undefined,
                pagesCount === pageNumber && isCurrent
                    ? 'rounded-r-md'
                    : undefined
            )}
            onClick={handleSelect}
        >
            {pageNumber}
        </span>
    )
}
