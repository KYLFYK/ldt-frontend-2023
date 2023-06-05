import React, { FC } from 'react'

import { CreateForm, TSubmitAction } from './create-form'

type TProps = {
    handleFinishForm: TSubmitAction
}

export const AuditMainParamsForm: FC<TProps> = ({ handleFinishForm }) => {
    return (
        <div className="col-span-4">
            <div className="mb-6 text-xl font-semibold">Основные параметры</div>
            <CreateForm handleFinishForm={handleFinishForm} />
        </div>
    )
}
