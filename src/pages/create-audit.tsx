import axios from 'axios'
import dayjs from 'dayjs'
import React, { ChangeEvent, FC, useCallback, useState } from 'react'

import { AuditMainParamsForm } from '../components/audits-create/audit-main-params-form'
import { AuditsCreateHeading } from '../components/audits-create/audits-create-heading'
import { CheckoutSettings } from '../components/audits-create/checkout-settings'
import { TSubmitAction } from '../components/audits-create/create-form'
import { InfoAlert } from '../components/ui/info-alert'
import { BASE_URL } from '../constants/app'
import { useAuditContext } from '../contexts/audit-context'
import { AuditType } from '../types/audits'
import { CheckoutStatus } from '../types/common/data-types'
import { UserRole } from '../types/users'
import { RoutePaths } from '../utils/routes/route-paths'

export const CreateAudit: FC = () => {
  const { setLoaded } = useAuditContext()
  const [isStarted, setIsStarted] = useState(false)

  const [file, setFile] = useState<File | undefined>(undefined)

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }, [])

  const clearFile = useCallback(() => {
    setFile(undefined)
  }, [])

  const handleCreate = useCallback(async () => {
    if (file) {
      setIsStarted(true)
      const formData = new FormData()
      formData.set('file', file)
      const resp_file = await axios.post<{
        createAt: string
        fileName: string
        id: number
        updateAt: string
      }>(BASE_URL + '/files-upload', formData)

      const resp = await axios.post(BASE_URL + '/initialize', {
        name: 'Проверка_' + resp_file.data.id,
        type: AuditType.TARGET,
        status: CheckoutStatus.COMPLETED,
        dateStart: dayjs().toISOString(),
        dateEnd: dayjs().add(10, 'days').toISOString(),
        responsible: {
          id: '1',
          firstName: 'И',
          lastName: 'Иванов',
          patronymic: 'И',
          role: UserRole.EXPERT_DEPUTY,
        },
        auditReason: `Проверка на ошибки №` + resp_file.data.id,
        fileId: resp_file.data.id,
      })

      setLoaded(false)
    }
  }, [file])

  const handleFinishForm = useCallback<TSubmitAction>((values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      actions.setSubmitting(false)
    }, 1000)
  }, [])

  return (
    <div className="w-full">
      {!isStarted && <AuditsCreateHeading handleCreate={handleCreate} />}
      <div className="grid grid-cols-12 gap-5 divide-x">
        {isStarted ? (
          <div className="col-span-full flex h-96 items-center justify-center">
            <InfoAlert
              text="Проводим аудит назначений"
              subText="Примерное время ожидания - 8 минут"
              detailsText="К списку проверок"
              detailsHref={RoutePaths.AUDITS}
            />
          </div>
        ) : (
          <>
            <AuditMainParamsForm handleFinishForm={handleFinishForm} />
            <CheckoutSettings
              file={file}
              clearFile={clearFile}
              handleFileChange={handleFileChange}
            />
          </>
        )}
      </div>
    </div>
  )
}
