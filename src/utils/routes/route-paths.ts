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

export const pathToName: (path: RoutePaths) => string = (path) => {
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
      return path
  }
}

export const getAuditPath = (id: string | number) => `${RoutePaths.AUDIT}/${id}`
