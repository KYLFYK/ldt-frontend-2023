import React, { FC, useCallback } from 'react'

import { AuditMainParamsForm } from '../components/audits-create/audit-main-params-form'
import { AuditsCreateHeading } from '../components/audits-create/audits-create-heading'
import { TSubmitAction } from '../components/audits-create/create-form'

export const CreateAudit: FC = () => {
  const handleCreate = useCallback(() => {
    return
  }, [])

  const handleFinishForm = useCallback<TSubmitAction>((values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      actions.setSubmitting(false)
    }, 1000)
  }, [])

  return (
    <div className="w-full">
      <AuditsCreateHeading handleCreate={handleCreate} />
      <div className="grid grid-cols-12 gap-4">
        <AuditMainParamsForm handleFinishForm={handleFinishForm} />
      </div>
    </div>
  )
}
