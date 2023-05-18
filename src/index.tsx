import './input.css'

import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { Application } from './Application'
import { store } from './ducks'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <StrictMode>
    <Provider store={store}>
      <Application />
    </Provider>
  </StrictMode>
)
