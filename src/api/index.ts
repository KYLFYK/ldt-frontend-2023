import axios from 'axios'

import { BASE_URL } from '../constants/app'
import { localStoragePaths } from '../utils/common'

export const baseAPIInstance = axios.create({
    baseURL: BASE_URL,
})

baseAPIInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        localStoragePaths.accessTokenPath
    )}`
    return config
})
