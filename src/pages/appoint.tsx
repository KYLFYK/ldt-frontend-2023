import React, { FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useAuditContext } from '../contexts/audit-context'
import {
  TAppointsResult,
  TAuditPageResult,
} from '../types/audits/audit-results'

export const Appoint: FC = () => {
  const params = useParams<{
    auditId: string
    appointId: string
  }>()

  const { data } = useAuditContext()

  const selectedItem = useMemo(() => {
    return data.find(
      (el) => el.id === Number(params.auditId)
    ) as TAuditPageResult
  }, [data, params])

  const selectedAppoint = useMemo(() => {
    return selectedItem.result.find(
      (resItem) => resItem.id === params.appointId
    ) as TAppointsResult
  }, [selectedItem, params])

  console.log(selectedAppoint)

  return (
    <div className="flex h-32 w-full items-center justify-center">
      <div className="w-full rounded-xl border-2 border-gray-200 p-6">
        <div className="mb-6 flex flex-col">
          <span className="text-xs text-gray-500">Диагноз МКБ-10</span>
          <span className="text-sm text-gray-800">
            {selectedAppoint.appointData.mkbName}
          </span>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Назначения</span>
            {selectedAppoint?.result ? (
              <>
                {selectedAppoint.result.list.map((el) => (
                  <span
                    className="text-sm text-gray-800"
                    key={el.actualRecommendation}
                  >
                    {el.actualRecommendation}
                  </span>
                ))}
              </>
            ) : (
              <span className="text-sm text-gray-800">
                Результаты не найдены
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">
              Возможно имелось ввиду
            </span>
            {selectedAppoint?.result ? (
              <>
                {selectedAppoint.result.list.map((el) => (
                  <span
                    className="flex gap-4 text-sm text-gray-800"
                    key={el.actualRecommendation}
                  >
                    {['0', '1', '2'].map((conItem, index) => (
                      <div key={index}>
                        <span>
                          {
                            el.conjunction[(index + 1) as 1 | 2 | 3]
                              .mcbRecommendation
                          }
                        </span>{' '}
                        |{' '}
                        <span>
                          {el.conjunction[(index + 1) as 1 | 2 | 3].score}
                        </span>
                      </div>
                    ))}
                  </span>
                ))}
              </>
            ) : (
              <span className="text-sm text-gray-800">
                Результаты не найдены
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
