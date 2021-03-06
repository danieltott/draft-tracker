import action from '../../actions/action'
import * as types from './types'

export const addTeam = () => action(types.ADD_TEAM)

export const removeTeam = teamIndex => action(types.REMOVE_TEAM, { teamIndex })
export const displayTeam = teamIndex =>
  action(types.DISPLAY_TEAM, { teamIndex })

export const editTeamName = (teamIndex, name) =>
  action(types.EDIT_TEAM_NAME, { teamIndex, name })

export const importTeamOrderFbg = (teamIndex, order) =>
  action(types.IMPORT_TEAMORDER_FBG, { teamIndex, order })

export const importTeamDataJson = (teamIndex, team) =>
  action(types.IMPORT_TEAM_DATA_JSON, { teamIndex, team })

export const togglePlayerClaimed = (teamIndex, playerId) =>
  action(types.TOGGLE_CLAIMED, { teamIndex, playerId })
export const togglePlayerOwned = (teamIndex, playerId) =>
  action(types.TOGGLE_OWNED, { teamIndex, playerId })
export const togglePlayerWatched = (teamIndex, playerId) =>
  action(types.TOGGLE_WATCHED, { teamIndex, playerId })
export const movePlayer = (teamIndex, oldI, newI) =>
  action(types.MOVE_PLAYER, { teamIndex, oldI, newI })

export const toggleFilter = (teamIndex, filter) =>
  action(types.TOGGLE_FILTER, { teamIndex, filter })

export const downloadExport = team => action(types.DOWNLOAD_EXPORT, { team })
