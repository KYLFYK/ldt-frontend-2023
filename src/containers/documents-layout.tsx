import React, { FC } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import { FileBreadcrumbs } from '../components/documents/file-breadcrumbs'

export const DocumentsLayout: FC = () => {
  const params = useParams()

  return (
    <div>
      <FileBreadcrumbs params={params} />
      <Outlet />
    </div>
  )
}
