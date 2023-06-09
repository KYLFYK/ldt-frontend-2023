import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik/dist/types'
import React, {
    Fragment,
    HTMLAttributes,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

import { OptionItem, OptionList } from '../../types/common/components-data'
import { classNames } from '../../utils/common'

export type TSelectProps<T> = {
    options: OptionList<T>
    containerClassName?: HTMLAttributes<HTMLDivElement>['className']
    label?: string
    defaultValue?: OptionItem<T>
    value?: T
    placeHolder?: string
    onChange?: (value: string) => void
    error?: string | null
    name?: string
}

export const optionClassName = ({ active }: { active: boolean }) =>
    classNames(
        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
        'relative cursor-default select-none py-2 pl-3 pr-9'
    )

export const Select: <T = string | number>(
    props: TSelectProps<T>
) => JSX.Element = ({
    options,
    containerClassName = '',
    label,
    defaultValue,
    placeHolder = 'Выберите',
    error,
    onChange,
    value,
    name,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [current, setCurrent] = useState(
        value ? options.find((el) => el.value === value) : defaultValue
    )

    useEffect(() => {
        const event = new Event('input', { bubbles: true })

        if (inputRef.current) {
            inputRef.current.dispatchEvent(event)
        }
    }, [current])

    const handleChange = useCallback((optionItem: any) => {
        setCurrent(optionItem)

        if (onChange) {
            onChange(optionItem.value)
        }
    }, [])

    return (
        <div className={classNames('w-56', containerClassName)}>
            <Listbox value={current} onChange={handleChange} name={name}>
                {({ open }) => (
                    <>
                        {label && (
                            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                {label}
                            </Listbox.Label>
                        )}
                        <div className="relative mt-2">
                            <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <span
                                    className={classNames(
                                        'block truncate',
                                        current ? '' : 'text-gray-400'
                                    )}
                                >
                                    {current?.label ?? placeHolder}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {options.map((option) => (
                                        <Listbox.Option
                                            key={
                                                option.value as string | number
                                            }
                                            className={optionClassName}
                                            value={option}
                                        >
                                            {({ active, selected }) => (
                                                <>
                                                    <span
                                                        className={classNames(
                                                            selected
                                                                ? 'font-semibold'
                                                                : 'font-normal',
                                                            'block truncate'
                                                        )}
                                                    >
                                                        {option.label}
                                                    </span>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active
                                                                    ? 'text-white'
                                                                    : 'text-indigo-600',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                            )}
                                                        >
                                                            <CheckIcon
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
            {error && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                    {error}
                </p>
            )}
        </div>
    )
}

export function SelectWithFormik<
    ValuesType,
    ValueType extends keyof ValuesType
>(
    propsData: {
        field: FieldInputProps<ValueType>
        form: FormikProps<ValuesType>
        meta: FieldMetaProps<ValueType>
    } & TSelectProps<ValueType>
) {
    const { field, meta, form, name, ...props } = propsData

    const error = useMemo(() => {
        return meta?.error && meta?.touched ? meta.error : null
    }, [])

    const handleChange = useCallback(
        (value: string) => {
            form.setFieldValue(field.name ?? '', value)
        },
        [field, form]
    )

    return (
        <Select {...field} {...props} error={error} onChange={handleChange} />
    )
}
