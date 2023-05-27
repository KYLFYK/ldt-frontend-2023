import React, { FC, useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { LogoShort } from '../icons/logo-short'
import { RoutePaths } from '../utils/routes/route-paths'

export const Login: FC = () => {
  const navigate = useNavigate()

  const handleLogin = useCallback(() => {
    navigate(RoutePaths.BASE)
  }, [])

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <LogoShort className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Войти в аккаунт
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <Input
            id={'email'}
            name={'email'}
            type={'email'}
            autoComplete={'email'}
            required={true}
            label={'Email'}
          />

          <Input
            id={'password'}
            name={'password'}
            type={'password'}
            autoComplete={'current-password'}
            required={true}
            label={'Пароль'}
            additionalLink={{
              path: RoutePaths.FORGOT_PASSWORD,
              text: 'Забыли пароль?',
            }}
          />
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
