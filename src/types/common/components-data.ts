import { HTMLAttributes } from 'react'

export type OptionItem<T = string | number> = {
    value: T
    label: string
    disabled?: boolean
}

export type OptionList<T = string | number> = OptionItem<T>[]

export type TabItem = {
    name: string
    key: string
    component: JSX.Element
    current?: boolean
}
export type TabList = TabItem[]

type TableDataSimpleTypes = string | number
type TableDataHardTypes =
    | number[]
    | string[]
    | JSX.Element
    | boolean
    | boolean[]
    | Record<string, TableDataSimpleTypes>
    | null
type TableDataTypes = TableDataHardTypes | TableDataSimpleTypes

export type TableDataSource<T extends object> = {
    [key in keyof T]: T[key] extends TableDataTypes ? T[key] : never
} & {
    key: string | number
}

export type TableRow<T extends object, K extends keyof T> = {
    dataKey: K
    label: string
    rowClassName?: HTMLAttributes<HTMLSpanElement>['className']
    onClick?: (dataItem: TableDataSource<T>) => void
    colClassName?: HTMLAttributes<HTMLDivElement>['className']
    renderFunc?: (
        value: T[K],
        dataItem: TableDataSource<T>
    ) => string | number | JSX.Element | null
}

export type TPagination = {
    onPageCount: number
    currentPage: number
    pagesCount: number
    itemsCount: number
}

export type TPaginationData = TPagination & {
    handleNext: () => void
    handlePrev: () => void
    handleSelect: (num: number) => void
}
