import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { persistStore } from 'redux-persist'
import theme from './styles/theme'
import configureStore from './store'
import App from './components/App'
import teamsSaga from './modules/Teams/sagas'

const store = configureStore()

store.runSaga(teamsSaga, store.getState)

const persistor = persistStore(store, { blacklist: ['playersById'] })

const clearLocalStorage = () => {
  persistor.purge()
  window.location.reload()
}

render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App clearData={clearLocalStorage} />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
