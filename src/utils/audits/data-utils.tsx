import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs'
import React from 'react'
import { NavigateFunction } from 'react-router-dom'

import { TAppointTableData } from '../../components/audit/appoints-tab'
import { SmProgressChart } from '../../components/ui/sm-progress-chart'
import {
  AuditResultStatus,
  AuditStartType,
  IAuditResponsible,
  TAuditListItem,
} from '../../types/audits'
import { TAllStats } from '../../types/audits/audit-results'
import { OptionList, TableRow } from '../../types/common/components-data'
import { CheckoutStatus } from '../../types/common/data-types'
import { classNames } from '../common'
import {
  checkoutStatusToColorClass,
  checkoutStatusToString,
} from '../common/data-utils'
import { getAuditAppointPath, getAuditPath } from '../routes/route-paths'
import { userRoleToString } from '../users'
import { appointStatusToColor, auditTypeToString } from './index'

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
        <span className="text-gray-900">{value as string}</span>
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
      return `${dayjs(dataItem.dateStart as string).format(
        'DD.MM HH:mm'
      )} - ${dayjs(value as string).format('DD.MM HH:mm')}`
    },
  },
  {
    dataKey: 'allStats',
    label: 'Объем назначений',
    onClick: (dataItem) => {
      nav(getAuditPath(dataItem.id))
    },
    renderFunc: (value, dataItem) =>
      dataItem.allStats.cardsCount.toLocaleString(),
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
        return (
          <SmProgressChart
            results={
              {
                error:
                  (dataItem.allStats.cardsCount / 100) *
                  dataItem.allStats.error,
                warning:
                  (dataItem.allStats.cardsCount / 100) *
                  dataItem.allStats.warning,
                unchecked:
                  (dataItem.allStats.cardsCount / 100) *
                  dataItem.allStats.unchecked,
                green:
                  (dataItem.allStats.cardsCount / 100) *
                  dataItem.allStats.green,
                cardsCount: dataItem.allStats.cardsCount,
              } as TAllStats
            }
          />
        )
      }
    },
  },
  {
    dataKey: 'responsible',
    label: 'Ответственный',
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

export const radioAuditStartTypeOptions: OptionList = [
  {
    value: AuditStartType.NOW,
    label: 'Сейчас',
  },
  {
    value: AuditStartType.BY_DATE,
    label: 'Выбрать дату',
    disabled: true,
  },
]

export const averageToResStatus: (avg: number) => AuditResultStatus = (
  avg: number
) => {
  switch (true) {
    case avg > 90:
      return AuditResultStatus.SUCCESS
    case avg > 40:
      return AuditResultStatus.WARNING
    default:
      return AuditResultStatus.DANGER
  }
}

export const appointsRows: (
  nav: NavigateFunction,
  auditId: string | number
) => TableRow<TAppointTableData, keyof TAppointTableData>[] = (
  nav,
  auditId
) => [
  {
    dataKey: 'status',
    label: '',
    renderFunc: (value) => (
      <span
        className={classNames(
          'block h-4 w-4 min-w-min rounded-full',
          appointStatusToColor(value as AuditResultStatus)
        )}
      />
    ),
    onClick: (dataItem) => {
      nav(getAuditAppointPath(auditId, dataItem.id))
    },
  },
  {
    dataKey: 'patientId',
    label: 'ID пациента',
    onClick: (dataItem) => {
      nav(getAuditAppointPath(auditId, dataItem.id))
    },
  },
  {
    dataKey: 'gender',
    label: 'ПОЛ',
    onClick: (dataItem) => {
      nav(getAuditAppointPath(auditId, dataItem.id))
    },
  },
  {
    dataKey: 'birthDate',
    label: 'дата рождения',
    renderFunc: (value) => dayjs(value).format('DD.MM.YYYY'),
    onClick: (dataItem) => {
      nav(getAuditAppointPath(auditId, dataItem.id))
    },
  },
  {
    dataKey: 'mkbCode',
    label: 'КОД МКБ',
    onClick: (dataItem) => {
      nav(getAuditAppointPath(auditId, dataItem.id))
    },
  },
  {
    dataKey: 'mkbName',
    label: 'Заболевание',
    onClick: (dataItem) => {
      nav(getAuditAppointPath(auditId, dataItem.id))
    },
  },
  {
    dataKey: 'serviceDate',
    label: 'Дата',
    renderFunc: (value) => dayjs(value).format('DD.MM.YYYY'),
    onClick: (dataItem) => {
      nav(getAuditAppointPath(auditId, dataItem.id))
    },
  },
  {
    dataKey: 'doctorJobTitle',
    label: 'Должность',
    onClick: (dataItem) => {
      nav(getAuditAppointPath(auditId, dataItem.id))
    },
  },
]
