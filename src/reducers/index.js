import { combineReducers } from 'redux'
import { teams, visibleTeamIndex } from '../modules/Teams/reducer'

import players from '../data/players'

export const getPlayersById = state => state.playersById

function playersById(state = players, action) {
  return state
}

const rootReducer = combineReducers({
  teams,
  visibleTeamIndex,
  playersById,
})

export default rootReducer
