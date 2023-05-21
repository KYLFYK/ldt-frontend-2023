import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { MainLayout } from '../../containers/main-layout'
import { ForgetPassword } from '../../pages/forget-password'
import { Home } from '../../pages/home'
import { Login } from '../../pages/login'
import { Registration } from '../../pages/registration'
import { WorkFlows } from '../../pages/workflows'
import { RoutePaths } from './route-paths'

export const RootRoutes: FC = () => {
  return (
    <Routes>
      <Route path={RoutePaths.BASE} element={<MainLayout />}>
        <Route path={RoutePaths.BASE} element={<Home />} />
        <Route path={RoutePaths.DOCUMENTS} element={<Home />} />
        <Route path={RoutePaths.WORKFLOWS} element={<WorkFlows />} />
        <Route path={RoutePaths.CALENDAR} element={<Home />} />
        <Route path={RoutePaths.CHARTS} element={<Home />} />
        <Route path={RoutePaths.REPORTS} element={<Home />} />
      </Route>
      <Route path={RoutePaths.LOGIN} element={<Login />} />
      <Route path={RoutePaths.FORGOT_PASSWORD} element={<ForgetPassword />} />
      <Route path={RoutePaths.REGISTRATION} element={<Registration />} />
    </Routes>
  )
}