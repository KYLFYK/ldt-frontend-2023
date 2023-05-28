import React, { FC, useCallback, useState } from 'react'

import { AuditMainParamsForm } from '../components/audits-create/audit-main-params-form'
import { AuditsCreateHeading } from '../components/audits-create/audits-create-heading'
import { CheckoutSettings } from '../components/audits-create/checkout-settings'
import { TSubmitAction } from '../components/audits-create/create-form'
import { InfoAlert } from '../components/ui/info-alert'
import { RoutePaths } from '../utils/routes/route-paths'

export const CreateAudit: FC = () => {
  const [isStarted, setIsStarted] = useState(false)

  const handleCreate = useCallback(() => {
    setIsStarted(true)
  }, [])

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
            <CheckoutSettings />
          </>
        )}
      </div>
    </div>
  )
}
