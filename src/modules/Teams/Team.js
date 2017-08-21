import React from 'react'
import { connect } from 'react-redux'
import { toggleFilter } from './actions'
import { getFilteredPlayers } from './selectors'
import Player from './Player'
import SmallPlayer from './SmallPlayer'
import TeamImporter from './TeamImporter'
import TeamName from './TeamName'

class Team extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      importContent: '',
    }
  }
  render() {
    const {
      team,
      teamIndex,
      playersById,
      toggleShowClaimed,
      toggleShowIDP,
      filteredPlayers,
    } = this.props

    return (
      <div className="container-fluid">
        <TeamImporter teamIndex={teamIndex} />
        <TeamName teamIndex={teamIndex} />

        <div className="row">
          <div className="col-xs-8">
            <h3>All Players</h3>
            <div>
              <button className="btn btn-link" onClick={toggleShowClaimed}>
                {team.filters.showClaimed ? 'Hide ' : 'Show '} Claimed
              </button>

              <button className="btn btn-link" onClick={toggleShowIDP}>
                {team.filters.showIDP ? 'Hide ' : 'Show '} IDP
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">R</th>
                  <th scope="col">Player</th>
                  <th scope="col">Pos</th>
                  <th scope="col">Tm</th>
                  <th scope="col">Bye</th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((playerId, i) =>
                  <Player
                    key={playerId}
                    playerId={playerId}
                    teamIndex={teamIndex}
                  />
                )}
              </tbody>
            </table>
          </div>
          <div className="col-xs-4">
            <h3>My Team</h3>

            <table className="table table-condensed">
              <tbody>
                {team.allIds
                  .filter(playerId => {
                    if (team.byId[playerId]) {
                      return team.byId[playerId].owned
                    } else {
                      console.log(playerId)
                      return false
                    }
                  })
                  .sort(function(a, b) {
                    const posA = playersById[a].position
                    const posB = playersById[b].position
                    if (posA < posB) {
                      return -1
                    }
                    if (posA > posB) {
                      return 1
                    }

                    // names must be equal
                    return 0
                  })
                  .map(playerId =>
                    <SmallPlayer key={playerId} playerId={playerId} />
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    filteredPlayers: getFilteredPlayers(state, ownProps),
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleShowClaimed: () =>
      dispatch(toggleFilter(ownProps.teamIndex, 'showClaimed')),
    toggleShowIDP: () => dispatch(toggleFilter(ownProps.teamIndex, 'showIDP')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Team)
