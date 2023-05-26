import { UserRole } from '../../types/users'

export const userRoleToString: (role: UserRole, short?: boolean) => string = (
  role,
  short
) => {
  switch (role) {
    case UserRole.ADMIN:
      return short ? 'Админ.' : 'Администратор'
    case UserRole.CHIEF_PHYSICIAN:
      return short ? 'Глав. врач' : 'Главный врач'
    case UserRole.SUB_CHIEF:
      return short ? 'Зам. глав. врача' : 'Заместитель главного врача'
    case UserRole.EXPERT_DEPUTY:
      return short ? 'Зам. экспертной работы' : 'Заместитель экспертной работы'
    case UserRole.MEDICAL_SUBSTITUTE:
      return short ? 'Зам. лечебной работы' : 'Заместитель лечебной работы'
    case UserRole.METHODIST:
      return short ? 'Методист' : 'Методист'
  }
}
