import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TeamsSelectors from '../../modules/Teams/selectors'
import * as teamActions from '../../modules/Teams/actions'

class Player extends React.Component {
  render() {
    const { playerInfo, playerState, i, showClaimed } = this.props
    if (!playerState || (!showClaimed && playerState.claimed)) {
      console.log(this.props.playerId)
      return null
    }
    return (
      <tr
        className={
          playerState.owned
            ? 'success'
            : playerState.claimed ? 'danger' : playerState.watched ? 'info' : ''
        }
      >
        <td>
          {i}
        </td>
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
              className="btn btn-default"
              type="button"
              onClick={this.toggleClaimed}
            >
              Claimed
            </button>
            <button
              className="btn btn-success"
              type="button"
              onClick={this.toggleOwned}
            >
              Owned
            </button>
            <button
              className="btn btn-info"
              type="button"
              onClick={this.toggleWatched}
            >
              Watched
            </button>
            <button
              className="btn btn-default"
              type="button"
              aria-label="Up"
              onClick={this.movePlayerUp}
            >
              <span className="glyphicon glyphicon-arrow-up" />
            </button>
            <button
              className="btn btn-default"
              type="button"
              aria-label="Down"
              onClick={this.movePlayerDown}
            >
              <span className="glyphicon glyphicon-arrow-down" />
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
  movePlayerUp = () => {
    this.props.actions.movePlayer(
      this.props.teamIndex,
      this.props.i,
      this.props.i - 1
    )
  }
  movePlayerDown = () => {
    this.props.actions.movePlayer(
      this.props.teamIndex,
      this.props.i,
      this.props.i + 1
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
