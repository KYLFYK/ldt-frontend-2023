export enum RoutePaths {
  BASE = '/',
  AUDITS = '/audits',
  CREATE_AUDIT = '/audit-create',
  AUDIT = '/audit',
  LOGIN = '/login',
  FORGOT_PASSWORD = '/forgot-password',
  REGISTRATION = '/registration',
  CONSTRUCTOR = '/constructor',
  GUIDES = '/guides',
  REPORTS = '/reports',
  PROFILE = '/profile',
}

export const pathToName: (path: RoutePaths) => string | undefined = (path) => {
  switch (path) {
    case RoutePaths.BASE:
      return 'Главная'
    case RoutePaths.AUDITS:
      return 'Проверки'
    case RoutePaths.AUDIT:
      return 'Проверка'
    case RoutePaths.CREATE_AUDIT:
      return 'Создание проверки'
    case RoutePaths.CONSTRUCTOR:
      return 'Конструктор проверок'
    case RoutePaths.GUIDES:
      return 'Справочник'
    case RoutePaths.REPORTS:
      return 'Отчёты'
    case RoutePaths.LOGIN:
      return 'Логин'
    case RoutePaths.REGISTRATION:
      return 'Регистрация'
    case RoutePaths.PROFILE:
      return 'Профиль'
    case RoutePaths.FORGOT_PASSWORD:
      return 'Забыли пароль'
    default:
      return undefined
  }
}

export const paramNameToName: (paramKey: string) => string = (st) => {
  const resObj: Record<string, string> = {
    ['auditId']: 'Проверка',
    ['appointId']: 'Назначение',
  }
  return resObj[st as keyof typeof resObj]
}

export const getAuditPath = (id: string | number) => `${RoutePaths.AUDIT}/${id}`
export const getAuditAppointPath = (
  auditId: string | number,
  appointId: string | number
) => `${RoutePaths.AUDIT}/${auditId}/${appointId}`
