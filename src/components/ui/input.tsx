import React, { FC, InputHTMLAttributes } from 'react'

type TProps = {
  name?: InputHTMLAttributes<HTMLInputElement>['name']
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete']
  required?: InputHTMLAttributes<HTMLInputElement>['required']
  id?: InputHTMLAttributes<HTMLInputElement>['id']
  className?: InputHTMLAttributes<HTMLInputElement>['className']
}

export const Input: FC<TProps> = ({
  name,
  type,
  autoComplete,
  required,
  id,
  className,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
    />
  )
}
