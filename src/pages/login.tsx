import React, { FC, useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { COMPANY_NAME } from '../constants/app'
import { RoutePaths } from '../utils/routes/route-paths'

export const Login: FC = () => {
  const navigate = useNavigate()

  const handleLogin = useCallback(() => {
    navigate(RoutePaths.BASE)
  }, [])

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt={COMPANY_NAME}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Войти в аккаунт
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <Input
                id={'email'}
                name={'email'}
                type={'email'}
                autoComplete={'email'}
                required={true}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Пароль
              </label>
              <div className="text-sm">
                <NavLink
                  to={RoutePaths.FORGOT_PASSWORD}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Забыли пароль?
                </NavLink>
              </div>
            </div>
            <div className="mt-2">
              <Input
                id={'password'}
                name={'password'}
                type={'password'}
                autoComplete={'current-password'}
                required={true}
              />
            </div>
          </div>

          <div>
            <Button onClick={handleLogin}>Войти</Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Не зарегистрированы?{' '}
          <NavLink
            to={RoutePaths.REGISTRATION}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Регистрация
          </NavLink>
        </p>
      </div>
    </div>
  )
}
