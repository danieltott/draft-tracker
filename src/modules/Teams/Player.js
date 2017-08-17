import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TeamsSelectors from '../../modules/Teams/selectors'
import * as teamActions from '../../modules/Teams/actions'

class Player extends React.Component {
  render() {
    const { playerInfo, playerState } = this.props
    return (
      <tr
        className={
          playerState.owned
            ? 'success'
            : playerState.claimed ? 'danger' : playerState.watched ? 'info' : ''
        }
      >
        <td>
          <a href={playerInfo.link} target="_blank" rel="nofollow">
            {playerInfo.name}
          </a>{' '}
          {playerInfo.note
            ? <span className="glyphicon glyphicon-question-sign" />
            : ''}
        </td>
        <td>
          {playerInfo.position}
        </td>
        <td>
          {playerInfo.team}
        </td>
        <td>
          {playerInfo.bye}
        </td>
        <td>
          <div className="btn-group">
            <button
              className="btn-default"
              type="button"
              onClick={this.toggleClaimed}
            >
              Claimed
            </button>
            <button
              className="btn-success"
              type="button"
              onClick={this.toggleOwned}
            >
              Owned
            </button>
            <button
              className="btn-info"
              type="button"
              onClick={this.toggleWatched}
            >
              Watched
            </button>
          </div>
        </td>
      </tr>
    )
  }
  toggleClaimed = () => {
    this.props.actions.togglePlayerClaimed(
      this.props.teamIndex,
      this.props.playerId
    )
  }
  toggleOwned = () => {
    this.props.actions.togglePlayerOwned(
      this.props.teamIndex,
      this.props.playerId
    )
  }
  toggleWatched = () => {
    this.props.actions.togglePlayerWatched(
      this.props.teamIndex,
      this.props.playerId
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    playerInfo: TeamsSelectors.getPlayerInfo(state, ownProps),
    playerState: TeamsSelectors.getPlayerState(state, ownProps),
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(teamActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
