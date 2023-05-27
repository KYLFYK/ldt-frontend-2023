import React, { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { LogoShort } from '../icons/logo-short'
import { RoutePaths } from '../utils/routes/route-paths'

export const ForgetPassword: FC = () => {
  const navigate = useNavigate()

  const handleResetPassword = useCallback(() => {
    navigate(RoutePaths.LOGIN)
  }, [])

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <LogoShort className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Сброс пароля
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
          <div>
            <Button onClick={handleResetPassword}>Сбросить пароль</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
