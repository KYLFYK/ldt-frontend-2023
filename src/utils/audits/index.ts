import { string } from 'yup'

import {
  AuditAverageNum,
  AuditResultStatus,
  AuditScoreNum,
  AuditType,
} from '../../types/audits'
import { OptionList } from '../../types/common/components-data'

export const auditTypeToString: (type: AuditType) => string = (audit) => {
  switch (audit) {
    case AuditType.PLANNED:
      return 'Плановая'
    case AuditType.TARGET:
      return 'Целевая'
  }
}

export const auditTypeOptions: OptionList<AuditType> = [
  {
    value: AuditType.PLANNED,
    label: auditTypeToString(AuditType.PLANNED),
  },
  {
    value: AuditType.TARGET,
    label: auditTypeToString(AuditType.TARGET),
  },
]

export const appointStatusToColor: (st: AuditResultStatus) => string = (s) => {
  switch (s) {
    case AuditResultStatus.DANGER:
      return 'bg-pink-500'
    case AuditResultStatus.SUCCESS:
      return 'bg-green-400'
    case AuditResultStatus.WARNING:
      return 'bg-yellow-300'
    case AuditResultStatus.UNCHECKED:
      return 'bg-gray-300'
  }
}

export const scoreNumToStatus: (st: number) => AuditResultStatus = (st) => {
  switch (true) {
    case st >= AuditScoreNum.SUCCESS:
      return AuditResultStatus.SUCCESS
    case st >= AuditScoreNum.WARNING:
      return AuditResultStatus.WARNING
    default:
      return AuditResultStatus.DANGER
  }
}

export const scoreNumToString: (num: number, isSkipped?: boolean) => string = (
  num,
  sk
) => {
  switch (true) {
    case num >= AuditScoreNum.SUCCESS:
      return 'Соответствует'
    case num >= AuditScoreNum.WARNING:
      return 'Возможны ошибки'
    case !!sk:
      return 'Не проверено'
    default:
      return 'Не соответствует'
  }
}
