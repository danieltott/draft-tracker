import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import rootReducer from '../reducers'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = composeWithDevTools({})

export default function configureStore(preloadedState) {
  return {
    ...createStore(
      rootReducer,
      preloadedState,
      composeEnhancers(applyMiddleware(sagaMiddleware), autoRehydrate())
    ),
    runSaga: sagaMiddleware.run,
  }
}
