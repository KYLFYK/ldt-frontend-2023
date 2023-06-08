import React, { FC, useMemo } from 'react'

import { AuditsFilter } from '../components/audits/audits-filter'
import { AuditsHeading } from '../components/audits/audits-heading'
import { AuditsTable } from '../components/audits/audits-table'
import { EmptyState } from '../components/ui/empty-state'
import { Loader } from '../components/ui/loader'
import { useAppDispatch } from '../ducks'
import { useAuditsSelector } from '../ducks/audits/audits-list/selectors'
import { setPageSelected } from '../ducks/audits/audits-list/slice'
import { TPaginationData } from '../types/common/components-data'

export const Audits: FC = () => {
    const dispatch = useAppDispatch()
    const { loading, currentPage, paginationData, filters } =
        useAuditsSelector()

    const pagination: TPaginationData = useMemo(() => {
        return {
            ...paginationData,
            handleNext: () => {
                dispatch(
                    setPageSelected({
                        page: paginationData.currentPage + 1,
                    })
                )
            },
            handlePrev: () => {
                dispatch(
                    setPageSelected({
                        page: paginationData.currentPage - 1,
                    })
                )
            },
            handleSelect: (num) => {
                dispatch(
                    setPageSelected({
                        page: num,
                    })
                )
            },
        }
    }, [paginationData])

    return (
        <div className="w-full">
            <AuditsHeading />
            <AuditsFilter filters={filters} />
            {loading ? (
                <div className="flex h-80 w-full items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <>
                    {currentPage.length > 0 ? (
                        <AuditsTable
                            currentPage={currentPage}
                            pagination={pagination}
                        />
                    ) : (
                        <EmptyState
                            containerClassName="w-full"
                            title={'Записи отсутствуют'}
                            description={
                                'По необходимым параметрам записей не найдено'
                            }
                        />
                    )}
                </>
            )}
        </div>
    )
}
