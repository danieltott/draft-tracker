import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
// import createHistory from 'history/createBrowserHistory'
// import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'

const sagaMiddleware = createSagaMiddleware()

// const createdHistory = createHistory()
// const routerMw = routerMiddleware(createdHistory)

const composeEnhancers = composeWithDevTools({})

const analyticsMiddleware = () => next => action => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: action.type,
    payload: action.payload,
  })
  let result = next(action)
  return result
}

export default function configureStore(preloadedState) {
  return {
    ...createStore(
      rootReducer,
      preloadedState,
      composeEnhancers(
        applyMiddleware(sagaMiddleware, analyticsMiddleware),
        autoRehydrate()
      )
    ),
    runSaga: sagaMiddleware.run,
    // createdHistory
  }
}
