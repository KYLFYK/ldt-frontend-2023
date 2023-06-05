import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik/dist/types'
import React, { FC, HTMLAttributes, TextareaHTMLAttributes } from 'react'

type TProps = {
    label?: string
    name?: TextareaHTMLAttributes<HTMLTextAreaElement>['name']
    defaultValue?: TextareaHTMLAttributes<HTMLTextAreaElement>['defaultValue']
    value?: any
    onChange?: TextareaHTMLAttributes<HTMLTextAreaElement>['onChange']
    onBlur?: TextareaHTMLAttributes<HTMLTextAreaElement>['onBlur']
    containerClassName?: HTMLAttributes<HTMLDivElement>['className']
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextArea: FC<TProps> = (props) => {
    const {
        label,
        name,
        defaultValue,
        value,
        onBlur,
        onChange,
        containerClassName,
        ...otherProps
    } = props

    return (
        <div className={containerClassName}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {label}
                </label>
            )}
            <div className="mt-2">
                <textarea
                    rows={4}
                    name={name}
                    id={name}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={defaultValue}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    {...otherProps}
                />
            </div>
        </div>
    )
}

export function TextAreaWithFormik<
    ValuesType,
    ValueType extends keyof ValuesType
>(
    propsData: {
        field: FieldInputProps<ValueType>
        form: FormikProps<ValuesType>
        meta: FieldMetaProps<ValueType>
    } & TProps
) {
    const { field, meta, form, ...props } = propsData

    return <TextArea {...field} {...props} />
}
