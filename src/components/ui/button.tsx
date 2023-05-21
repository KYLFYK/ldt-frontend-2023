import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

type TProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  className?: ButtonHTMLAttributes<HTMLButtonElement>['className']
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

export const Button: FC<PropsWithChildren<TProps>> = ({
  type,
  className,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600${
        className ? ` ${className}` : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
