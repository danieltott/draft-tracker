import players from '../../data/players.json'
import * as types from './types'

export const teams = (state = [], action) => {
  switch (action.type) {
    case types.ADD_TEAM:
      return [...state, team(undefined, action)]

    case types.REMOVE_TEAM:
      return [
        ...state.slice(0, action.payload.teamIndex),
        ...state.slice(action.payload.teamIndex + 1),
      ]

    default:
      if (action.payload && typeof action.payload.teamIndex !== 'undefined') {
        return state.map(
          (teamObj, i) =>
            i === action.payload.teamIndex ? team(teamObj, action) : teamObj
        )
      }
      return state
  }
}

const initializeTeam = () => {
  const allIds = Object.keys(players)
  const byId = {}
  allIds.forEach(playerId => {
    byId[playerId] = player(undefined, { type: 'none' })
  })

  return {
    allIds,
    byId,
    name: 'My New Team',
  }
}

const team = (state = initializeTeam(), action) => {
  switch (action.type) {
    case types.EDIT_TEAM_NAME:
      return {
        ...state,
        name: action.payload.name,
      }
    default:
      if (action.payload && typeof action.payload.playerId !== 'undefined') {
        return {
          ...state,
          byId: {
            ...state.byId,
            [action.payload.playerId]: player(
              state.byId[action.payload.playerId],
              action
            ),
          },
        }
      }
      return state
  }
}

const player = (
  state = {
    claimed: false,
    owned: false,
    watched: false,
  },
  action
) => {
  switch (action.type) {
    case types.TOGGLE_CLAIMED:
      return {
        ...state,
        claimed: !state.claimed,
      }
    case types.TOGGLE_OWNED:
      return {
        ...state,
        owned: !state.owned,
      }
    case types.TOGGLE_WATCHED:
      return {
        ...state,
        watched: !state.watched,
      }
    default:
      return state
  }
}

export const visibleTeamIndex = (state = null, action) => {
  if (action.type === types.DISPLAY_TEAM) {
    return action.payload.teamIndex
  }
  return state
}
