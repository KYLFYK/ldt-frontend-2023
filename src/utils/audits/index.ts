import { AuditType } from '../../types/audits'
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
