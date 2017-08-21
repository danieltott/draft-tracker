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
    filters: {
      showClaimed: true,
      showIDP: true,
    },
    name: 'My New Team ' + (' ' + Date.now()).substr(-5),
  }
}

const team = (state = initializeTeam(), action) => {
  switch (action.type) {
    case types.EDIT_TEAM_NAME:
      return {
        ...state,
        name: action.payload.name,
      }
    case types.IMPORT_TEAMORDER:
      // console.log(
      //   action.payload.order.match(/id=([^"]*)/g).map(str => str.split('=')[1])
      // )
      // return { ...state }
      return {
        ...state,
        allIds: action.payload.order
          .match(/id=([^"]*)/g)
          .map(str => str.split('=')[1]),
      }

    case types.TOGGLE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filter]: !state.filters[action.payload.filter],
        },
      }

    case types.MOVE_PLAYER:
      const allIds = [...state.allIds]
      const { oldI, newI } = action.payload
      // prettier-ignore
      if (newI >= 0 && newI <= allIds.length) {
        [allIds[newI], allIds[oldI]] = [allIds[oldI], allIds[newI]]

        return {
          ...state,
          allIds,
        }
      }
      else {
        return state
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
