import { CheckoutStatus } from '../../types/common/data-types'

export const checkoutStatusToString: (status: CheckoutStatus) => string = (
  status
) => {
  switch (status) {
    case CheckoutStatus.COMPLETED:
      return 'Завершено'
    case CheckoutStatus.PLANNED:
      return 'Запланирована'
    case CheckoutStatus.IN_PROGRESS:
      return 'В работе'
    default:
      return 'Запланирована'
  }
}

export const checkoutStatusToColorClass: (status: CheckoutStatus) => string = (
  status
) => {
  switch (status) {
    case CheckoutStatus.COMPLETED:
      return 'bg-green-100 text-green-800'
    case CheckoutStatus.PLANNED:
      return 'bg-blue-100 text-blue-800'
    case CheckoutStatus.IN_PROGRESS:
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-green-100 text-green-800'
  }
}
