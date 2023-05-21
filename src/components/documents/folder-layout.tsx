import React, { FC, PropsWithChildren } from 'react'

export const FolderLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-5">
      {children}
    </div>
  )
}
