import { Tooltip } from 'flowbite-react'
import { useFormikContext } from 'formik'
import React, { FC, useMemo } from 'react'

import { ICreateAuditForm } from '../../types/audits'

type TProps = {
    haveFile: boolean
}

export const AuditsCreateHeading: FC<TProps> = ({ haveFile }) => {
    const { submitForm, values } = useFormikContext<ICreateAuditForm>()

    const isButtonDisabled = useMemo(() => {
        return (
            !values.name ||
            !values.type ||
            !values.endDate ||
            !values.auditReason ||
            !haveFile
        )
    }, [values, haveFile])

    return (
        <div className="mb-8 md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Новая проверка
                </h2>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
                {isButtonDisabled ? (
                    <Tooltip
                        content="Не все обязательные поля заполнены"
                        placement={'bottom-end'}
                        color={'bg-gray-600'}
                    >
                        <button
                            type="button"
                            className={
                                'ml-3 inline-flex cursor-not-allowed items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm'
                            }
                            disabled={true}
                        >
                            Запустить
                        </button>
                    </Tooltip>
                ) : (
                    <button
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={submitForm}
                    >
                        Запустить
                    </button>
                )}
            </div>
        </div>
    )
}
