import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { persistStore } from 'redux-persist'
import theme from './styles/theme'

import configureStore from './store'
import rootSaga from './sagas/index'

import App from './components/App'

const store = configureStore()

persistStore(store)

// store.runSaga(rootSaga, store.getState)

store.runSaga(rootSaga, store.getState)

render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)

