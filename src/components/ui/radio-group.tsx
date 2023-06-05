import { Field } from 'formik'
import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik/dist/types'
import React, { FC, useMemo } from 'react'

import { OptionItem, OptionList } from '../../types/common/components-data'
import { classNames } from '../../utils/common'

type TProps = {
    options: OptionList<string>
    defaultValue?: OptionItem<string>
    label?: string
    subLabel?: string
}

export const RadioGroup: FC<TProps> = ({
    options,
    defaultValue,
    label,
    subLabel,
}) => {
    return (
        <div>
            {label && (
                <label className="text-base font-semibold text-gray-900">
                    {label}
                </label>
            )}
            {subLabel && <p className="text-sm text-gray-500">{subLabel}</p>}
            <fieldset className="mt-4">
                {label && <legend className="sr-only">{label}</legend>}
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {options.map((option) => (
                        <div key={option.value} className="flex items-center">
                            <input
                                id={option.value as string}
                                name="notification-method"
                                type="radio"
                                disabled={option.disabled}
                                defaultChecked={
                                    option.value === defaultValue?.value
                                }
                                className="h-4 w-4 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600 disabled:cursor-not-allowed disabled:ring-gray-200"
                            />
                            <label
                                htmlFor={option.value as string}
                                className={classNames(
                                    'ml-3 block text-sm font-medium leading-6 text-gray-900',
                                    option.disabled
                                        ? 'cursor-not-allowed text-gray-300'
                                        : 'cursor-pointer'
                                )}
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    )
}

export function RadioGroupWithFormik<
    ValuesType,
    ValueType extends keyof ValuesType
>(
    propsData: {
        field: FieldInputProps<ValueType>
        form: FormikProps<ValuesType>
        meta: FieldMetaProps<ValueType>
    } & TProps
) {
    const { label, subLabel, options, field, meta } = propsData

    const error = useMemo(() => {
        return meta?.error && meta?.touched ? meta.error : null
    }, [])

    return (
        <div>
            {label && (
                <label className="text-base font-semibold text-gray-900">
                    {label}
                </label>
            )}
            {subLabel && <p className="text-sm text-gray-500">{subLabel}</p>}
            <fieldset className="mt-4">
                {label && <legend className="sr-only">{label}</legend>}
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {options.map((option) => (
                        <div key={option.value} className="flex items-center">
                            <Field
                                className="h-4 w-4 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600 disabled:cursor-not-allowed disabled:ring-gray-200"
                                type="radio"
                                name={field.name}
                                value={option.value}
                                id={option.value as string}
                                disabled={option.disabled}
                            />
                            <label
                                htmlFor={option.value as string}
                                className={classNames(
                                    'ml-3 block text-sm font-medium leading-6 text-gray-900',
                                    option.disabled
                                        ? 'cursor-not-allowed text-gray-300'
                                        : 'cursor-pointer'
                                )}
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
            {error && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                    {error}
                </p>
            )}
        </div>
    )
}
