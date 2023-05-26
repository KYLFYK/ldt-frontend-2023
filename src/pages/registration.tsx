import React, { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { LogoShort } from '../icons/logo-short'
import { RoutePaths } from '../utils/routes/route-paths'

export const Registration: FC = () => {
  const navigate = useNavigate()

  const handleRegistration = useCallback(() => {
    navigate(RoutePaths.LOGIN)
  }, [])

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <LogoShort className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Регистрация
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
            <Button onClick={handleRegistration}>Регистрация</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
