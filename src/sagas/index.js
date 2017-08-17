import { all } from 'redux-saga/effects'
import TeamsSaga from '../modules/Teams/sagas'

export default function* rootSaga() {
  yield all([TeamsSaga()])
}
