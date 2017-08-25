import fileDownload from 'react-file-download'

import { all, takeLatest } from 'redux-saga/effects'
import * as types from './types'

function* watchDownloader() {
  yield takeLatest(types.DOWNLOAD_EXPORT, function*(action) {
    yield fileDownload(JSON.stringify(action.payload.team), 'team.json')
  })
}

export default function* teamsSaga() {
  yield all([watchDownloader()])
}
