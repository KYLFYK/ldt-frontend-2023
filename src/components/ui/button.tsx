import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import { classNames } from '../../utils/common'

type TProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  className?: ButtonHTMLAttributes<HTMLButtonElement>['className']
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  view?: 'primary' | 'secondary' | 'danger'
}

export const Button: FC<PropsWithChildren<TProps>> = ({
  type,
  className,
  onClick,
  children,
  view = 'primary',
}) => {
  return (
    <button
      type={type}
      className={classNames(
        `flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2${
          className ? ` ${className}` : 'w-full'
        }`,
        view === 'primary'
          ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
          : '',
        view === 'secondary'
          ? 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
          : '',
        view === 'danger' ? '' : ''
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
