import { Menu as TailMenu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon } from '@heroicons/react/20/solid'
import React, { FC, Fragment, useCallback, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

import { Breadcrumbs } from '../components/main-layout/breadcrumbs'
import { Menu } from '../components/main-layout/menu'
import { classNames } from '../utils/common'
import { RoutePaths } from '../utils/routes/route-paths'

const userNavigation = [
  { name: 'Мой профиль', href: RoutePaths.PROFILE },
  { name: 'Выйти', href: RoutePaths.LOGIN },
]

export const MainLayout: FC = () => {
  const { pathname } = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleOpenSideBar = useCallback(() => {
    setSidebarOpen(true)
  }, [])

  const handleCloseSideBar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  const menuHidden = useMemo(() => {
    return (
      pathname.includes(`${RoutePaths.AUDIT}/`) && window.innerWidth >= 1024
    )
  }, [pathname, window.innerWidth])

  return (
    <div className="max-h-screen">
      {!menuHidden ? (
        <Menu
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          handleCloseSideBar={handleCloseSideBar}
        />
      ) : null}
      <div className={menuHidden ? 'max-h-screen' : 'max-h-screen lg:pl-72'}>
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={handleOpenSideBar}
          >
            <span className="sr-only">Открыть меню</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="h-6 w-px bg-gray-900/10 lg:hidden"
            aria-hidden="true"
          />

          <div
            className={`flex flex-1 items-center justify-end gap-x-4 self-stretch lg:gap-x-6${
              pathname !== RoutePaths.BASE ? ' sm:justify-between' : ''
            }`}
          >
            <Breadcrumbs />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Посмотреть уведомления</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Separator */}
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                aria-hidden="true"
              />

              {/* Profile dropdown */}
              <TailMenu as="div" className="relative">
                <TailMenu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Меню пользователя</span>
                  <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                      aria-hidden="true"
                    >
                      Том Круз
                    </span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </TailMenu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <TailMenu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <TailMenu.Item key={item.name}>
                        {({ active }) => (
                          <NavLink
                            to={item.href}
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            {item.name}
                          </NavLink>
                        )}
                      </TailMenu.Item>
                    ))}
                  </TailMenu.Items>
                </Transition>
              </TailMenu>
            </div>
          </div>
        </div>
        <main
          className="overflow-y-auto py-4 sm:py-10"
          style={{
            maxHeight: `calc(100vh - 64px)`,
          }}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
