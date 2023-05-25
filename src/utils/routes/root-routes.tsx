import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { MainLayout } from '../../containers/main-layout'
import { ReportsLayout } from '../../containers/reports-layout'
import { ForgetPassword } from '../../pages/forget-password'
import { Home } from '../../pages/home'
import { Login } from '../../pages/login'
import { Registration } from '../../pages/registration'
import { Reports } from '../../pages/reports'
import { WorkFlows } from '../../pages/workflows'
import { RoutePaths } from './route-paths'

export const RootRoutes: FC = () => {
  return (
    <Routes>
      <Route path={RoutePaths.BASE} element={<MainLayout />}>
        <Route path={RoutePaths.BASE} element={<Home />} />
        <Route path={RoutePaths.REPORTS} element={<ReportsLayout />}>
          <Route index={true} element={<Reports />} />
          <Route path={'*'} element={<Reports />} />
        </Route>
        <Route path={RoutePaths.AUDIT} element={<WorkFlows />} />
        <Route path={RoutePaths.CONSTRUCTOR} element={<Home />} />
        <Route path={RoutePaths.GUIDES} element={<Home />} />
      </Route>
      <Route path={RoutePaths.LOGIN} element={<Login />} />
      <Route path={RoutePaths.FORGOT_PASSWORD} element={<ForgetPassword />} />
      <Route path={RoutePaths.REGISTRATION} element={<Registration />} />
    </Routes>
  )
}
