import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs'
import React from 'react'
import { NavigateFunction } from 'react-router-dom'

import { SmProgressChart } from '../../components/ui/sm-progress-chart'
import {
  IAuditResponsible,
  TAuditListItem,
  TAuditResult,
} from '../../types/audits'
import { OptionList, TableRow } from '../../types/common/components-data'
import { CheckoutStatus } from '../../types/common/data-types'
import { classNames } from '../common'
import {
  checkoutStatusToColorClass,
  checkoutStatusToString,
} from '../common/data-utils'
import { getAuditPath } from '../routes/route-paths'
import { userRoleToString } from '../users'
import { auditTypeToString } from './index'

export const auditsListRows: (
  nav: NavigateFunction
) => TableRow<TAuditListItem, keyof TAuditListItem>[] = (nav) => [
  {
    dataKey: 'name',
    label: 'Проверка',
    onClick: (dataItem) => {
      nav(getAuditPath(dataItem.id))
    },
    renderFunc: (value, dataItem) => (
      <div className="flex flex-col">
        <span className="text-gray-900">
          {value as string}-{dataItem.num}
        </span>
        <span className="text-gray-500">
          {auditTypeToString(dataItem.type)}
        </span>
      </div>
    ),
  },
  {
    dataKey: 'status',
    label: 'Статус',
    onClick: (dataItem) => {
      nav(getAuditPath(dataItem.id))
    },
    renderFunc: (value) => (
      <span
        className={classNames(
          'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
          checkoutStatusToColorClass(value as CheckoutStatus)
        )}
      >
        {checkoutStatusToString(value as CheckoutStatus)}
      </span>
    ),
  },
  {
    dataKey: 'dateEnd',
    label: 'Период',
    onClick: (dataItem) => {
      nav(getAuditPath(dataItem.id))
    },
    renderFunc: (value, dataItem) => {
      if (
        dataItem.status === CheckoutStatus.COMPLETED ||
        dataItem.status === CheckoutStatus.SIGNED
      ) {
        return dayjs(value as string).format('DD.MM HH:mm')
      } else {
        return `${dayjs(dataItem.dateStart as string).format(
          'DD.MM HH:mm'
        )} - ${dayjs(value as string).format('DD.MM HH:mm')}`
      }
    },
  },
  {
    dataKey: 'cardsCount',
    label: 'Объем карт',
    onClick: (dataItem) => {
      nav(getAuditPath(dataItem.id))
    },
    renderFunc: (value) => (value as number).toLocaleString(),
  },
  {
    dataKey: 'result',
    label: 'Результат',
    onClick: (dataItem) => {
      nav(getAuditPath(dataItem.id))
    },
    renderFunc: (value, dataItem) => {
      if (
        dataItem.status === CheckoutStatus.PLANNED ||
        dataItem.status === CheckoutStatus.IN_PROGRESS
      ) {
        return null
      } else {
        return <SmProgressChart results={value as TAuditResult} />
      }
    },
  },
  {
    dataKey: 'responsible',
    label: 'ответственный',
    onClick: (dataItem) => {
      nav(getAuditPath(dataItem.id))
    },
    renderFunc: (value) => (
      <div className="flex flex-col">
        <span className="text-gray-900">{`${
          (value as IAuditResponsible).lastName
        } ${(value as IAuditResponsible).firstName[0]}.${
          (value as IAuditResponsible).patronymic[0] + '.' ?? ''
        }`}</span>
        <span className="text-gray-500">
          {userRoleToString((value as IAuditResponsible).role, true)}
        </span>
      </div>
    ),
  },
  {
    dataKey: 'id',
    label: '',
    colClassName: 'w-fit',
    renderFunc: (value, dataItem) => {
      const options: OptionList = []

      switch (dataItem.status) {
        case CheckoutStatus.COMPLETED:
        case CheckoutStatus.ARCHIVE:
          options.push({
            label: 'Смотреть',
            value: 'see',
          })
          break
        case CheckoutStatus.IN_PROGRESS:
          options.push({
            label: 'Отменить',
            value: 'cancel',
          })
          break
        case CheckoutStatus.PLANNED:
          options.push(
            {
              label: 'Отменить',
              value: 'cancel',
            },
            {
              label: 'Изменить',
              value: 'change',
            }
          )
          break
        case CheckoutStatus.SIGNED:
          options.push(
            {
              label: 'Архивировать',
              value: 'archieve',
            },
            {
              label: 'Смотреть',
              value: 'see',
            },
            {
              label: 'Скачать отчёты',
              value: 'download_results',
            }
          )
      }

      return (
        <div className="flex flex-col">
          <EllipsisVerticalIcon className="w-6 cursor-pointer" />
          {/*<Popover options={options}>*/}
          {/*  <EllipsisVerticalIcon className="w-6 cursor-pointer" />*/}
          {/*</Popover>*/}
          {/* TODO: Поправить popver */}
        </div>
      )
    },
  },
]
