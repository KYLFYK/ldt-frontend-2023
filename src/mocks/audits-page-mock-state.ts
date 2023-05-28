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
      id: 'abcd-ksdo',
      type: AuditType.TARGET,
      status: CheckoutStatus.IN_PROGRESS,
      dateStart: dayjs().toISOString(),
      dateEnd: dayjs().add(7, 'minutes').toISOString(),
      allStats: {
        warning: 0,
        error: 0,
        unchecked: 0,
        cardsCount: 0,
        green: 0,
      },
      result: [],
      auditReason: 'Жалоба пациента №29',
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
      id: 'abcd-fgbe',
      type: AuditType.PLANNED,
      status: CheckoutStatus.PLANNED,
      dateStart: dayjs().add(12, 'days').toISOString(),
      dateEnd: dayjs().add(12, 'days').add(46, 'minutes').toISOString(),
      auditReason: 'Жалоба пациента №29',
      allStats: {
        warning: 0,
        error: 0,
        unchecked: 0,
        cardsCount: 0,
        green: 0,
      },
      result: [],
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
      id: 'abcd-tyxd',
      type: AuditType.PLANNED,
      status: CheckoutStatus.COMPLETED,
      dateStart: dayjs().add(-2, 'days').toISOString(),
      dateEnd: dayjs().add(-2, 'days').add(8, 'minutes').toISOString(),
      auditReason: 'Жалоба пациента №29',
      allStats: {
        warning: 0,
        error: 0,
        unchecked: 0,
        cardsCount: 0,
        green: 0,
      },
      result: [],
      responsible: {
        id: 'abgh-skcs',
        firstName: 'И',
        lastName: 'Вяткин',
        patronymic: 'В',
        role: UserRole.SUB_CHIEF,
      },
    },
    {
      name: 'Ежемесячная',
      id: 'abcd-hfcx',
      type: AuditType.PLANNED,
      status: CheckoutStatus.SIGNED,
      dateStart: dayjs().add(-64, 'days').toISOString(),
      dateEnd: dayjs().add(-64, 'days').add(8, 'minutes').toISOString(),
      auditReason: 'Жалоба пациента №29',
      allStats: {
        warning: 0,
        error: 0,
        unchecked: 0,
        cardsCount: 0,
        green: 0,
      },
      result: [],
      responsible: {
        id: 'abgh-skcs',
        firstName: 'И',
        lastName: 'Вяткин',
        patronymic: 'В',
        role: UserRole.MEDICAL_SUBSTITUTE,
      },
    },
    {
      name: 'Ежемесячная',
      id: 'abcd-cvbw',
      type: AuditType.PLANNED,
      status: CheckoutStatus.SIGNED,
      dateStart: dayjs().add(-96, 'days').toISOString(),
      dateEnd: dayjs().add(-96, 'days').add(8, 'minutes').toISOString(),
      auditReason: 'Жалоба пациента №29',
      allStats: {
        warning: 0,
        error: 0,
        unchecked: 0,
        cardsCount: 0,
        green: 0,
      },
      result: [],
      responsible: {
        id: 'abgh-skcs',
        firstName: 'И',
        lastName: 'Вяткин',
        patronymic: 'В',
        role: UserRole.CHIEF_PHYSICIAN,
      },
    },
  ],
}
