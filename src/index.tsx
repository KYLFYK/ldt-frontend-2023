import dayjs from 'dayjs'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './input.css'

import { store } from './ducks'
import { Services } from './services'
import { RootRoutes } from './utils/routes/root-routes'

// tslint:disable-next-line:no-var-requires
require('dayjs/locale/ru')

dayjs.locale('ru')

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Services>
                    <RootRoutes />
                </Services>
            </Provider>
        </BrowserRouter>
    </StrictMode>
)
