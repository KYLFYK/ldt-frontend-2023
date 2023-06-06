import React, { FC } from 'react'

import { CreateForm } from './create-form'

export const AuditMainParamsForm: FC = () => {
    return (
        <div className="col-span-4">
            <div className="mb-6 text-xl font-semibold">Основные параметры</div>
            <CreateForm />
        </div>
    )
}
