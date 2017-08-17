import * as actionTypes from './types'
import action from './action'

export const receiveSettings = settings =>
  action(actionTypes.RECEIVE_SETTINGS, settings)
