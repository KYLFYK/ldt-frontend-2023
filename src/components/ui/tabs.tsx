import React, { FC, useCallback, useState } from 'react'

import { TabItem, TabList } from '../../types/common/components-data'
import { classNames } from '../../utils/common'

type TProps = {
  tabs: TabList
  containerClassName?: string
}

export const Tabs: FC<TProps> = ({ tabs, containerClassName }) => {
  const [currentTab, setCurrentTab] = useState<TabItem>(tabs[0])

  const handleSelectTab = useCallback(
    (key: string) => {
      setCurrentTab(tabs.find((el) => el.key === key) as TabItem)
    },
    [tabs]
  )

  return (
    <div className={containerClassName}>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue={currentTab.key}
          onChange={(event) => {
            handleSelectTab(event.target.value)
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.key}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <span
                key={tab.name}
                className={classNames(
                  tab.key === currentTab.key
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'cursor-pointer whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                )}
                aria-current={tab.key === currentTab.key ? 'page' : undefined}
                onClick={() => {
                  handleSelectTab(tab.key)
                }}
              >
                {tab.name}
              </span>
            ))}
          </nav>
        </div>
      </div>
      <div>{currentTab.component}</div>
    </div>
  )
}
