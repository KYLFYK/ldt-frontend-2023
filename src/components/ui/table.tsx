import React, { useCallback, useMemo } from 'react'

import { TableDataSource, TableRow } from '../../types/common/components-data'
import { classNames } from '../../utils/common'
import { Pagination } from './pagination'

type TProps<T extends object> = {
  dataSource: TableDataSource<T>[]
  rows: TableRow<TableDataSource<T>, keyof TableDataSource<T>>[]
  pagination?: boolean
}

const TableCol: <T extends object>(props: {
  row: TableRow<TableDataSource<T>, keyof TableDataSource<T>>
  dataItem: TableDataSource<T>
}) => JSX.Element = ({ row, dataItem }) => {
  const handleClick = useCallback(() => {
    if (row.onClick) {
      row.onClick(dataItem)
    }
  }, [row])

  const content = useMemo(() => {
    return row.renderFunc
      ? row.renderFunc(dataItem[row.dataKey], dataItem)
      : (dataItem[row.dataKey] as string | number | JSX.Element)
  }, [row])

  return (
    <td
      key={row.dataKey as string}
      className={classNames(
        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6',
        row.onClick ? 'cursor-pointer' : '',
        row.colClassName ?? ''
      )}
      onClick={handleClick}
    >
      <div>{content}</div>
    </td>
  )
}

export const Table: <T extends object>(props: TProps<T>) => JSX.Element = ({
  dataSource,
  rows,
  pagination,
}) => {
  return (
    <>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden ring-1 ring-black ring-opacity-5 sm:overflow-y-visible sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {rows.map((el) => (
                      <th
                        key={el.dataKey as string}
                        scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        <span className={el.rowClassName}>{el.label}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {dataSource.map((dataItem) => (
                    <tr
                      key={dataItem.key}
                      className="transition ease-in-out hover:bg-gray-50"
                    >
                      {rows.map((rowItem) => (
                        <TableCol
                          key={rowItem.dataKey as string}
                          row={rowItem}
                          dataItem={dataItem}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {pagination && <Pagination currentPage={1} pages={[1, 2, 3, 4, 5, 6]} />}
    </>
  )
}
