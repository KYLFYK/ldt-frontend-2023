import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import FolderIcon from '../../icons/folder'

type TProps = {
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
    text: string
    icon?: ReactNode
    dashed?: boolean
    isFile?: boolean
}

export const FolderButton: FC<TProps> = ({
    text,
    icon = <FolderIcon className="mx-auto h-12 w-12 text-inherit" />,
    onClick,
    dashed,
    isFile,
}) => {
    return (
        <button
            type="button"
            className={`relative block w-full rounded-lg border-2${
                dashed ? ' border-dashed' : ''
            } ${
                isFile
                    ? 'border-indigo-300 text-indigo-800 hover:border-indigo-400 hover:text-indigo-900'
                    : 'border-gray-300 text-gray-800 hover:border-gray-400 hover:text-gray-900'
            } select-none p-12 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            onClick={onClick}
        >
            {icon}
            <span className="mt-2 block text-sm font-semibold text-inherit">
                {text}
            </span>
        </button>
    )
}
