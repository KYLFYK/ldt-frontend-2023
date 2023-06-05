import { PaperClipIcon, XCircleIcon } from '@heroicons/react/24/solid'
import React, { FC, HTMLAttributes, useCallback, useMemo } from 'react'

import { classNames } from '../../utils/common'

type TProps = {
    files: File[]
    containerClassName?: HTMLAttributes<HTMLDivElement>['className']
    onFileRemove?: (file: File) => void
}

const FileItem: FC<{
    file: File
    onFileRemove?: (file: File) => void
}> = ({ file, onFileRemove }) => {
    const handleRemove = useCallback(() => {
        if (onFileRemove) {
            onFileRemove(file)
        }
    }, [file])

    const fileSizeData = useMemo(() => {
        switch (true) {
            case file.size < 100000:
                return {
                    size: Math.round(file.size / 1024),
                    prefix: 'KB',
                }
            case file.size < 1073741824:
                return {
                    size: Math.round(file.size / 1024 / 1024),
                    prefix: 'MB',
                }
            default:
                return {
                    size: Math.round(file.size / 1024 / 1024 / 1024),
                    prefix: 'GB',
                }
        }
    }, [file])

    return (
        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
            <div className="flex w-0 flex-1 items-center">
                <PaperClipIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                />
                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium">{file.name}</span>
                    <span className="flex-shrink-0 text-gray-400">
                        {fileSizeData.size}
                        {fileSizeData.prefix}
                    </span>
                </div>
            </div>
            <div className="ml-4 flex-shrink-0">
                <div
                    onClick={handleRemove}
                    className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                >
                    <XCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                </div>
            </div>
        </li>
    )
}

export const FileList: FC<TProps> = ({
    files,
    containerClassName,
    onFileRemove,
}) => {
    return (
        <div
            className={classNames(
                'mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0',
                containerClassName ?? ''
            )}
        >
            <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
            >
                {files.map((el) => (
                    <FileItem
                        file={el}
                        key={el.webkitRelativePath}
                        onFileRemove={onFileRemove}
                    />
                ))}
            </ul>
        </div>
    )
}
