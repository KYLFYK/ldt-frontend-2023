import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { MainLayout } from '../../containers/main-layout'
import { Home } from '../../pages/home'
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
    </Routes>
  )
}
