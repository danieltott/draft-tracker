import { createSelector } from 'reselect'

export const getTeams = state => state.teams

export const getVisibleTeamIndex = state => state.visibleTeamIndex

export const getPlayersById = state => state.playersById

export const getVisibleTeam = createSelector(
  getTeams,
  getVisibleTeamIndex,
  (teams, visibleTeamIndex) => teams[visibleTeamIndex]
)

export const getPlayerInfo = (state, ownProps) =>
  state.playersById[ownProps.playerId]

export const getPlayerState = (state, ownProps) =>
  state.teams[ownProps.teamIndex].byId[ownProps.playerId]
