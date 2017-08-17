import React from 'react'
import Player from './Player'
import SmallPlayer from './SmallPlayer'
import TeamImporter from './TeamImporter'

class Team extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showClaimed: true,
      importContent: '',
    }
  }
  render() {
    const { team, teamIndex } = this.props

    return (
      <div className="container-fluid">
        <TeamImporter teamIndex={teamIndex} />
        <h1>
          {team.name}
        </h1>
        <div className="row">
          <div className="col-xs-8">
            <h3>All Players</h3>
            <table className="table">
              <tbody>
                {team.allIds.map(playerId =>
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
                  .filter(playerId => team.byId[playerId].owned)
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
