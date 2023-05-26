import dayjs from 'dayjs'

import { AuditType, TAuditListItem } from '../types/audits'
import { CheckoutStatus } from '../types/common/data-types'
import { UserRole } from '../types/users'

export const AuditsPageMockState: {
  auditsList: TAuditListItem[]
} = {
  auditsList: [
    {
      name: 'Проверка на ошибки',
      num: 3,
      id: 'abcd-ksdo',
      type: AuditType.TARGET,
      status: CheckoutStatus.IN_PROGRESS,
      dateStart: dayjs().toISOString(),
      dateEnd: dayjs().add(7, 'minutes').toISOString(),
      cardsCount: 294,
      result: null,
      responsible: {
        id: 'abgh-skcs',
        firstName: 'И',
        lastName: 'Вяткин',
        patronymic: 'В',
        role: UserRole.METHODIST,
      },
    },
    {
      name: 'Ежеквартальная',
      num: 2,
      id: 'abcd-fgbe',
      type: AuditType.PLANNED,
      status: CheckoutStatus.PLANNED,
      dateStart: dayjs().add(12, 'days').toISOString(),
      dateEnd: dayjs().add(12, 'days').add(46, 'minutes').toISOString(),
      cardsCount: 1342,
      result: null,
      responsible: {
        id: 'abgh-skcs',
        firstName: 'И',
        lastName: 'Вяткин',
        patronymic: 'В',
        role: UserRole.EXPERT_DEPUTY,
      },
    },
    {
      name: 'Ежемесячная',
      num: 1,
      id: 'abcd-tyxd',
      type: AuditType.PLANNED,
      status: CheckoutStatus.COMPLETED,
      dateStart: dayjs().add(-2, 'days').toISOString(),
      dateEnd: dayjs().add(-2, 'days').add(8, 'minutes').toISOString(),
      cardsCount: 1342,
      result: {
        errors: 7,
        unchecked: 12,
        success: 70,
        warnings: 11,
      },
      responsible: {
        id: 'abgh-skcs',
        firstName: 'И',
        lastName: 'Вяткин',
        patronymic: 'В',
        role: UserRole.SUB_CHIEF,
      },
    },
  ],
}
