import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik/dist/types'
import React, { FC, InputHTMLAttributes, useMemo } from 'react'
import { NavLink } from 'react-router-dom'

import { RoutePaths } from '../../utils/routes/route-paths'

export type TInputProps = {
    name?: InputHTMLAttributes<HTMLInputElement>['name']
    type?: InputHTMLAttributes<HTMLInputElement>['type']
    autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete']
    required?: InputHTMLAttributes<HTMLInputElement>['required']
    id?: InputHTMLAttributes<HTMLInputElement>['id']
    className?: InputHTMLAttributes<HTMLInputElement>['className']
    label?: string
    error?: string | null
    additionalLink?: {
        path: RoutePaths
        text: string
    }
}

export const Input: FC<TInputProps> = ({
    name,
    type,
    autoComplete = 'off',
    required,
    id,
    className,
    label,
    additionalLink,
    error,
}) => {
    return (
        <div>
            {label && (
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        {label}
                    </label>
                    {additionalLink && (
                        <div className="text-sm">
                            <NavLink
                                to={additionalLink.path}
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                {additionalLink.text}
                            </NavLink>
                        </div>
                    )}
                </div>
            )}
            <div className="mt-2">
                <input
                    id={id}
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    required={required}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
                    placeholder="you@example.com"
                />
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                    {error}
                </p>
            )}
        </div>
    )
}

export function InputWithFormik<ValuesType, ValueType extends keyof ValuesType>(
    propsData: {
        field: FieldInputProps<ValueType>
        form: FormikProps<ValuesType>
        meta: FieldMetaProps<ValueType>
    } & TInputProps
) {
    const { field, meta, form, ...props } = propsData

    const error = useMemo(() => {
        return meta?.error && meta?.touched ? meta.error : null
    }, [])

    return <Input {...field} {...props} error={error} />
}
