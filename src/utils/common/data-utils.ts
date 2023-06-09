import dayjs, { Dayjs } from 'dayjs'

import { OptionList } from '../../types/common/components-data'
import { CheckoutStatus, Period } from '../../types/common/data-types'

export const checkoutStatusToString: (status: CheckoutStatus) => string = (
    status
) => {
    switch (status) {
        case CheckoutStatus.COMPLETED:
            return 'Окончена'
        case CheckoutStatus.PLANNED:
            return 'Запланированная'
        case CheckoutStatus.IN_PROGRESS:
            return 'В работе'
        case CheckoutStatus.SIGNED:
            return 'Подписана'
        case CheckoutStatus.ARCHIVE:
            return 'Архив'
        default:
            return 'Запланирована'
    }
}

export const checkoutStatusToColorClass: (status: CheckoutStatus) => string = (
    status
) => {
    switch (status) {
        case CheckoutStatus.SIGNED:
            return 'bg-green-100 text-green-800'
        case CheckoutStatus.PLANNED:
            return 'bg-pink-100 text-pink-800'
        case CheckoutStatus.IN_PROGRESS:
            return 'bg-yellow-100 text-yellow-800'
        case CheckoutStatus.COMPLETED:
            return 'bg-blue-100 text-blue-800'
        case CheckoutStatus.ARCHIVE:
            return 'bg-gray-100 text-gray-800'
        default:
            return 'bg-pink-100 text-pink-800'
    }
}

export const periods: OptionList<Period> = [
    { value: Period.DAY, label: 'День' },
    { value: Period.WEEK, label: 'Неделя' },
    { value: Period.MONTHS, label: 'Месяц' },
    { value: Period.YEAR, label: 'Год' },
]

export const getPeriodDatesBetween: (period: Period) => [Dayjs, Dayjs] = (
    p
) => {
    switch (p) {
        case Period.MONTHS:
            return [dayjs().add(-1, 'months'), dayjs()]
        case Period.WEEK:
            return [dayjs().add(-7, 'days'), dayjs()]
        case Period.YEAR:
            return [dayjs().add(-1, 'years'), dayjs()]
        case Period.DAY:
            return [dayjs().add(-1, 'days'), dayjs()]
        default:
            return [dayjs().add(-1, 'months'), dayjs()]
    }
}

export const statusOptions: OptionList<CheckoutStatus> = [
    {
        value: CheckoutStatus.COMPLETED,
        label: checkoutStatusToString(CheckoutStatus.COMPLETED),
    },
    {
        value: CheckoutStatus.PLANNED,
        label: checkoutStatusToString(CheckoutStatus.PLANNED),
    },
    {
        value: CheckoutStatus.IN_PROGRESS,
        label: checkoutStatusToString(CheckoutStatus.IN_PROGRESS),
    },
    {
        value: CheckoutStatus.SIGNED,
        label: checkoutStatusToString(CheckoutStatus.SIGNED),
    },
    {
        value: CheckoutStatus.ARCHIVE,
        label: checkoutStatusToString(CheckoutStatus.ARCHIVE),
    },
]
