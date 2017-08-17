import { createStore, applyMiddleware } from 'redux'
import { autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import rootReducer from '../reducers'

const composeEnhancers = composeWithDevTools({})

export default function configureStore(preloadedState) {
  return {
    ...createStore(
      rootReducer,
      preloadedState,
      composeEnhancers(applyMiddleware(), autoRehydrate())
    ),
  }
}
