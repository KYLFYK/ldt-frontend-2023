import React, { FC, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { EmptyState } from '../components/ui/empty-state'
import { useAppDispatch } from '../ducks'
import { useAuditsSelector } from '../ducks/audits/audits-list/selectors'
import { loadCurrentAudit } from '../ducks/audits/current/actions'
import { useCurrentAudit } from '../ducks/audits/current/selectors'
import { TAppointsResult } from '../types/audits/audit-results'
import {
    appointStatusToColor,
    scoreNumToStatus,
    scoreNumToString,
} from '../utils/audits'
import { classNames } from '../utils/common'

export const Appoint: FC = () => {
    const dispatch = useAppDispatch()
    const listData = useAuditsSelector()
    const { data, loading, loaded, error } = useCurrentAudit()
    const params = useParams<{
        auditId: string
        appointId: string
    }>()

    useEffect(() => {
        if (!loaded && !error && !loading && listData.loaded) {
            dispatch(
                loadCurrentAudit({
                    id: Number(params.auditId),
                })
            )
        }
    }, [loaded, error, loading, listData])

    const selectedAppoint = useMemo(() => {
        return data?.result?.find(
            (resItem) => resItem.id === params.appointId
        ) as TAppointsResult
    }, [data, params, loaded])

    return (
        <div className="flex w-full items-center justify-center">
            {(loading || listData.loading) && <span>Loading</span>}
            {loaded &&
                !(loading || listData.loading) &&
                selectedAppoint &&
                !error && (
                    <div className="w-full rounded-xl border-2 border-gray-200 p-6">
                        <div className="mb-6 flex flex-col border-b pb-6">
                            <span className="text-xs text-gray-500">
                                Диагноз МКБ-10
                            </span>
                            <span className="text-sm text-gray-800">
                                {selectedAppoint?.appointData.mkbName}
                            </span>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex flex-col gap-3">
                                <span className="text-xs text-gray-500">
                                    Назначения
                                </span>
                                {selectedAppoint?.result ? (
                                    <>
                                        {selectedAppoint.result.list.map(
                                            (el) => (
                                                <span
                                                    className="flex items-center py-1 text-sm text-gray-800"
                                                    key={
                                                        el.actualRecommendation
                                                    }
                                                >
                                                    {el.actualRecommendation}
                                                </span>
                                            )
                                        )}
                                    </>
                                ) : (
                                    <span className="text-sm text-gray-800">
                                        Результаты не найдены
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-4">
                                <span className="text-xs text-gray-500">
                                    Возможно имелось ввиду
                                </span>
                                {selectedAppoint?.result ? (
                                    <>
                                        {selectedAppoint.result.list.map(
                                            (el) => (
                                                <span
                                                    className="flex gap-4 text-sm text-gray-800"
                                                    key={
                                                        el.actualRecommendation
                                                    }
                                                >
                                                    {['0', '1', '2'].map(
                                                        (conItem, index) => (
                                                            <div key={index}>
                                                                <span>
                                                                    {el.conjunction[
                                                                        (index +
                                                                            1) as
                                                                            | 1
                                                                            | 2
                                                                            | 3
                                                                    ].mcbRecommendation.trim()
                                                                        .length >
                                                                    0
                                                                        ? el.conjunction[
                                                                              (index +
                                                                                  1) as
                                                                                  | 1
                                                                                  | 2
                                                                                  | 3
                                                                          ].mcbRecommendation.trim()
                                                                        : 'Не найдено' ??
                                                                          'Не найдено'}
                                                                </span>{' '}
                                                                |{' '}
                                                                <span
                                                                    className={classNames(
                                                                        appointStatusToColor(
                                                                            scoreNumToStatus(
                                                                                Number(
                                                                                    el
                                                                                        .conjunction[
                                                                                        (index +
                                                                                            1) as
                                                                                            | 1
                                                                                            | 2
                                                                                            | 3
                                                                                    ]
                                                                                        .score
                                                                                )
                                                                            )
                                                                        ),
                                                                        'rounded px-2 text-gray-900'
                                                                    )}
                                                                >
                                                                    {
                                                                        el
                                                                            .conjunction[
                                                                            (index +
                                                                                1) as
                                                                                | 1
                                                                                | 2
                                                                                | 3
                                                                        ].score
                                                                    }
                                                                    %
                                                                </span>
                                                            </div>
                                                        )
                                                    )}
                                                </span>
                                            )
                                        )}
                                    </>
                                ) : (
                                    <span className="text-sm text-gray-800">
                                        Результаты не найдены
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="mt-3.5 flex flex-col">
                            <span className="text-xs text-gray-500">
                                Результат проверки
                            </span>
                            <div className="flex items-center">
                                <span
                                    className={classNames(
                                        appointStatusToColor(
                                            scoreNumToStatus(
                                                selectedAppoint?.result?.max ===
                                                    100
                                                    ? 100
                                                    : selectedAppoint?.result
                                                          ?.average ?? 0
                                            )
                                        ),
                                        'mr-2 inline-block h-4 w-4 rounded-full'
                                    )}
                                />
                                <span className="text-sm text-gray-800">
                                    {scoreNumToString(
                                        selectedAppoint?.result?.max === 100
                                            ? 100
                                            : selectedAppoint?.result
                                                  ?.average ?? 0
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            {!selectedAppoint && !(loading || listData.loading) && (
                <EmptyState
                    title="Назначение не найдено"
                    description="Попробуйте найти назначение на странице назначений"
                />
            )}
        </div>
    )
}
