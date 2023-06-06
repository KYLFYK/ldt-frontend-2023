import { AxiosResponse } from 'axios'

import { baseAPIInstance } from '../index'

export type TFileData = {
    id: number
    createAt: string
    fileName: string
    updateAt: string
}

type TFilesAPI = {
    uploadAppointsTable: (file: File) => Promise<AxiosResponse<TFileData>>
}

export const FilesAPI: TFilesAPI = {
    uploadAppointsTable: async (file) => {
        const formData = new FormData()
        formData.set('file', file)
        return baseAPIInstance.post('/files-upload', formData)
    },
}
