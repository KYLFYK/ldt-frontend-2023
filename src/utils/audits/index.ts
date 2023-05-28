import { AuditResultStatus, AuditType } from '../../types/audits'
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
