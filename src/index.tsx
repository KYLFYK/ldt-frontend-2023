import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from './ducks'
import './input.css'
import { RootRoutes } from './utils/routes/root-routes'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <RootRoutes />
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
