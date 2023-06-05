import React, { FC } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import { FileBreadcrumbs } from '../components/reports/file-breadcrumbs'

export const ReportsLayout: FC = () => {
    const params = useParams()

    return (
        <div>
            <FileBreadcrumbs params={params} />
            <Outlet />
        </div>
    )
}
