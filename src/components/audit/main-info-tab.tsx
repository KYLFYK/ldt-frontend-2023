import dayjs from 'dayjs'
import React, { FC } from 'react'

import { AuditType, IAuditResponsible } from '../../types/audits'
import { auditTypeToString } from '../../utils/audits'

type TProps = {
  dateStart: string
  dateEnd: string
  auditType: AuditType
  responsible: IAuditResponsible
  auditReason: string
}

export const MainInfoTab: FC<TProps> = ({
  auditReason,
  auditType,
  dateEnd,
  responsible,
  dateStart,
}) => {
  return (
    <div className="w-full">
      <div className="my-6 flex flex-wrap gap-8">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Даты проверки</span>
          <span className="text-sm text-gray-800">
            {dayjs(dateStart ?? '').format('DD.MM HH:mm')} -{' '}
            {dayjs(dateEnd ?? '').format('DD.MM HH:mm')}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Вид проверки</span>
          <span className="text-sm text-gray-800">
            {auditTypeToString(auditType)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Ответственный</span>
          <span className="text-sm text-gray-800">
            {responsible.lastName} {responsible.firstName}.
            {responsible.lastName}.
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Причины проверки</span>
          <span className="text-sm text-gray-800">{auditReason}</span>
        </div>
      </div>
    </div>
  )
}
