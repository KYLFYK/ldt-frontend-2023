export enum RoutePaths {
  BASE = '/',
  WORKFLOWS = '/workflows',
  LOGIN = '/login',
  FORGOT_PASSWORD = '/forgot-password',
  REGISTRATION = '/registration',
  DOCUMENTS = '/documents',
  CALENDAR = '/calendar',
  CHARTS = '/charts',
  REPORTS = '/reports',
  PROFILE = '/profile',
}

export const pathToName: (path: RoutePaths) => string = (path) => {
  switch (path) {
    case RoutePaths.BASE:
      return 'Главная'
    case RoutePaths.DOCUMENTS:
      return 'Документы'
    case RoutePaths.WORKFLOWS:
      return 'Процессы'
    case RoutePaths.CALENDAR:
      return 'Календарь'
    case RoutePaths.CHARTS:
      return 'График'
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
      return ''
  }
}
