import { TPagination } from '../../types/common/components-data'

export function classNames(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

export function getBasePaginationData(itemsCount: number): TPagination {
    return {
        currentPage: 1,
        onPageCount: 25,
        itemsCount,
        pagesCount: itemsCount / 25 > 1 ? Math.ceil(itemsCount / 25) : 1,
    }
}

export const localStoragePaths = {
    accessTokenPath: 'accessToken',
    refreshTokenPath: 'refreshToken',
} as const

export const parseJwt: (token: string) => Record<string, string> = (
    token: string
) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    return JSON.parse(
        decodeURIComponent(
            window
                .atob(base64)
                .split('')
                // tslint:disable-next-line:only-arrow-functions
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join('')
        )
    )
}

export async function findArray<T>(
    array: T[],
    condition: (props: T) => boolean
): Promise<T | undefined> {
    const findInPath: (mI: number, arr: T[]) => Promise<T | undefined> = async (
        mI: number,
        arr: T[]
    ) => {
        const pr: Promise<T | undefined> = new Promise((res) => {
            arr.splice(mI - 25, Math.max(arr.length, mI)).find((el) => {
                if (condition(el)) {
                    res(el)
                }
            })

            res(undefined)
        })

        return await pr
    }

    return await new Promise(async (res) => {
        let startIndex = 25
        const arrCopy = [...array]

        while (arrCopy.length > 0) {
            const result = await findInPath(startIndex, arrCopy)

            startIndex += 25
            if (result) {
                res(result)
            }
        }

        res(undefined)
    })
}
