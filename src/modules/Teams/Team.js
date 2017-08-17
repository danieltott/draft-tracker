import React from 'react'
import Player from './Player'
import SmallPlayer from './SmallPlayer'
import TeamImporter from './TeamImporter'
import TeamName from './TeamName'

class Team extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showClaimed: true,
      importContent: '',
    }
  }
  toggleClaimed = () => {
    this.setState({
      showClaimed: !this.state.showClaimed,
    })
  }
  render() {
    const { team, teamIndex, playersById } = this.props

    return (
      <div className="container-fluid">
        <TeamImporter teamIndex={teamIndex} />
        <TeamName teamIndex={teamIndex} />

        <div className="row">
          <div className="col-xs-8">
            <h3>All Players</h3>
            <div>
              <button className="btn btn-link" onClick={this.toggleClaimed}>
                {this.state.showClaimed ? 'Hide ' : 'Show '} Claimed
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
                {team.allIds.map((playerId, i) =>
                  <Player
                    key={playerId}
                    playerId={playerId}
                    teamIndex={teamIndex}
                    i={i}
                    showClaimed={this.state.showClaimed}
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

export default Team
