import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './input.css'

import { AuditContext } from './contexts/audit-context'
import { store } from './ducks'
import { RootRoutes } from './utils/routes/root-routes'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuditContext>
        <Provider store={store}>
          <RootRoutes />
        </Provider>
      </AuditContext>
    </BrowserRouter>
  </StrictMode>
)
