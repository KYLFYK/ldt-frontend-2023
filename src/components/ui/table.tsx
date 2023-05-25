import React from 'react'

import { TableDataSource, TableRow } from '../../types/common/components-data'
import { classNames } from '../../utils/common'
import { Pagination } from './pagination'

type TProps<T extends object> = {
  dataSource: TableDataSource<T>[]
  rows: TableRow<TableDataSource<T>, keyof TableDataSource<T>>[]
  pagination?: boolean
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
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
                    <tr key={dataItem.key}>
                      {rows.map((rowItem) => (
                        <td
                          key={rowItem.dataKey as string}
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                          onClick={() => {
                            if (rowItem.onClick) {
                              rowItem.onClick(dataItem)
                            }
                          }}
                        >
                          <div
                            className={classNames(
                              rowItem.colClassName ?? '',
                              rowItem.onClick ? 'cursor-pointer' : ''
                            )}
                          >
                            {rowItem.renderFunc
                              ? rowItem.renderFunc(
                                  dataItem[rowItem.dataKey],
                                  dataItem
                                )
                              : (dataItem[rowItem.dataKey] as
                                  | string
                                  | number
                                  | JSX.Element)}
                          </div>
                        </td>
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
