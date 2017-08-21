import { createSelector } from 'reselect'
import { getPlayersById } from '../../reducers'

export const getTeams = state => state.teams

export const getTeamName = (state, ownProps) =>
  state.teams[ownProps.teamIndex].name

export const getTeam = (state, ownProps) => state.teams[ownProps.teamIndex]

export const getTeamFilters = createSelector(getTeam, team => team.filters)

export const getVisibleTeamIndex = state => state.visibleTeamIndex

// export const getPlayersById = state => state.playersById

export const getVisibleTeam = createSelector(
  getTeams,
  getVisibleTeamIndex,
  (teams, visibleTeamIndex) => teams[visibleTeamIndex]
)

export const getPlayerInfo = (state, ownProps) =>
  state.playersById[ownProps.playerId]

export const getPlayerState = (state, ownProps) =>
  state.teams[ownProps.teamIndex].byId[ownProps.playerId]

export const getPlayerOriginalRank = (state, ownProps) =>
  state.teams[ownProps.teamIndex].allIds.indexOf(ownProps.playerId)

export const getPlayerData = createSelector(
  getPlayerInfo,
  getPlayerState,
  getPlayerOriginalRank,
  (info, state, originalRank) => ({
    info,
    state,
    originalRank,
  })
)

export const getFilteredPlayers = createSelector(
  getTeam,
  getPlayersById,
  (team, players) =>
    team.allIds.filter(playerId => {
      if (!team.filters.showIDP && players[playerId].position === 'FLEXIDP') {
        return false
      }

      if (team.filters.showClaimed) {
        return playerId
      } else {
        return !team.byId[playerId].claimed
      }
    })
)
