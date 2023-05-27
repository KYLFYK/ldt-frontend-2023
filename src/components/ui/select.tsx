import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik/dist/types'
import React, { Fragment, HTMLAttributes, useMemo, useState } from 'react'

import { OptionItem, OptionList } from '../../types/common/components-data'
import { classNames } from '../../utils/common'

type TProps<T> = {
  options: OptionList<T>
  containerClassName?: HTMLAttributes<HTMLDivElement>['className']
  label?: string
  defaultValue?: OptionItem<T>
  placeHolder?: string
  onChange?: (option: OptionItem<T>) => void
  error?: string | null
}

export const optionClassName = ({ active }: { active: boolean }) =>
  classNames(
    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
    'relative cursor-default select-none py-2 pl-3 pr-9'
  )

export const Select: <T = string | number>(props: TProps<T>) => JSX.Element = ({
  options,
  containerClassName = '',
  label,
  defaultValue,
  placeHolder = 'Выберите',
}) => {
  const [current, setCurrent] = useState(defaultValue)

  return (
    <div className={classNames('w-56', containerClassName)}>
      <Listbox value={current} onChange={setCurrent}>
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
                      key={option.value as string | number}
                      className={optionClassName}
                      value={option}
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate'
                            )}
                          >
                            {option.label}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
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
  } & TProps<ValueType>
) {
  const { field, meta, form, ...props } = propsData

  const error = useMemo(() => {
    return meta?.error && meta?.touched ? meta.error : null
  }, [])

  return <Select {...field} {...props} error={error} />
}
