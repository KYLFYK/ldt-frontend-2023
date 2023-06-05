import { DocumentPlusIcon } from '@heroicons/react/24/solid'
import React, { FC, HTMLAttributes } from 'react'

type TProps = {
    label?: string
    placeholder?: string
    subPlaceholder?: string
    restrictions?: string
    handleChange?: HTMLAttributes<HTMLInputElement>['onChange']
    accept?: string
}

export const UploadFile: FC<TProps> = ({
    label,
    placeholder,
    subPlaceholder,
    restrictions,
    handleChange,
    accept,
}) => {
    return (
        <div className="col-span-full">
            {label && (
                <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {label}
                </label>
            )}
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <DocumentPlusIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            <span>
                                {placeholder ? placeholder : 'Загрузить файл'}
                            </span>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleChange}
                                accept={accept}
                            />
                        </label>
                        {subPlaceholder && (
                            <p className="pl-1">{subPlaceholder}</p>
                        )}
                    </div>
                    {restrictions && (
                        <p className="text-xs leading-5 text-gray-600">
                            {restrictions}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
