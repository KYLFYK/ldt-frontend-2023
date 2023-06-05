import { Field, Formik, FormikHelpers } from 'formik'
import React, { FC } from 'react'

import { responsibleOptionsMocks } from '../../mocks/select-options-mocks'
import { AuditStartType, AuditType, ICreateAuditForm } from '../../types/audits'
import { auditTypeOptions } from '../../utils/audits'
import { radioAuditStartTypeOptions } from '../../utils/audits/data-utils'
import { InputWithFormik } from '../ui/input'
import { RadioGroupWithFormik } from '../ui/radio-group'
import { SelectWithFormik } from '../ui/select'
import { TextAreaWithFormik } from '../ui/text-area'

export type TSubmitAction = (
    values: ICreateAuditForm,
    actions: FormikHelpers<ICreateAuditForm>
) => void | Promise<any>

type TProps = {
    handleFinishForm: TSubmitAction
}

export const CreateForm: FC<TProps> = ({ handleFinishForm }) => {
    return (
        <Formik
            initialValues={{
                name: '',
                responsible: '',
                startType: AuditStartType.NOW,
                endDate: '',
                type: AuditType.TARGET,
                auditReason: '',
                datasetFilters: {
                    mkbCodes: [],
                    doctorsId: [],
                    date: {
                        start: '',
                        end: '',
                    },
                },
            }}
            onSubmit={handleFinishForm}
        >
            <div className="gap-y flex flex-col gap-y-6">
                <Field
                    type={'text'}
                    label={'Название проверки'}
                    name="name"
                    component={InputWithFormik}
                />
                <Field
                    type={'text'}
                    label={'Ответственный'}
                    name="responsible"
                    component={SelectWithFormik}
                    options={responsibleOptionsMocks}
                    containerClassName="w-full"
                />
                <Field
                    type={'text'}
                    label={'Начало проверки'}
                    name="startType"
                    component={RadioGroupWithFormik}
                    options={radioAuditStartTypeOptions}
                    containerClassName="w-full"
                />
                <Field
                    type={'date'}
                    label={'Окончание'}
                    name="endDate"
                    component={InputWithFormik}
                />
                <Field
                    type={'text'}
                    label={'Вид проверки'}
                    name="type"
                    component={SelectWithFormik}
                    options={auditTypeOptions}
                    containerClassName="w-full"
                />
                <Field
                    type={'text'}
                    label={'Причина проверки'}
                    name="auditReason"
                    component={TextAreaWithFormik}
                    containerClassName="w-full"
                    placeholder="Например, подтверждённая жалоба пациента"
                />
            </div>
        </Formik>
    )
}
