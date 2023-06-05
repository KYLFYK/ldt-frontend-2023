import { DocumentPlusIcon, FolderPlusIcon } from '@heroicons/react/20/solid'
import React, { FC, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { Folder } from '../components/reports/folder'
import { FolderButton } from '../components/reports/folder-button'
import { FolderLayout } from '../components/reports/folder-layout'
import DocumentIcon from '../icons/document'
import { DocumentsMockState } from '../mocks/documents-mock-state'
import { TDocuments } from '../types/documents'

export const Reports: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const params = useParams()

    const currentFolderData = useMemo(() => {
        if (params['*']) {
            const pathNames = params['*']?.split('/')

            let currentNode: TDocuments = {
                ...DocumentsMockState.tree,
            }

            pathNames.forEach((path, index) => {
                if (currentNode.id === path && index === pathNames.length - 1) {
                    return
                } else if (currentNode.id !== path) {
                    const foundNode = currentNode.children?.find(
                        (el) => el.id === path
                    )

                    if (foundNode) {
                        currentNode = foundNode
                    }
                } else {
                    throw new Error('Директория отсутствует')
                }
            })

            return currentNode
        } else {
            return {
                ...DocumentsMockState.tree,
            }
        }
    }, [params])

    return (
        <FolderLayout>
            {currentFolderData.children?.map((el) => (
                <Folder
                    key={el.id}
                    node={el}
                    parentRoutePath={location.pathname}
                    navigate={navigate}
                />
            ))}
            {currentFolderData.files.map((el) => (
                <FolderButton
                    key={el.id}
                    text={el.fileName}
                    icon={
                        <DocumentIcon className="mx-auto h-12 w-12 text-inherit" />
                    }
                    isFile={true}
                />
            ))}
            <FolderButton
                icon={
                    <FolderPlusIcon className="mx-auto h-12 w-12 text-gray-500" />
                }
                dashed={true}
                text={'Создать папку'}
            />
            <FolderButton
                icon={
                    <DocumentPlusIcon className="mx-auto h-12 w-12 text-gray-500" />
                }
                dashed={true}
                text={'Загрузить новый файл'}
            />
        </FolderLayout>
    )
}
