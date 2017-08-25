import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TeamsSelectors from '../../modules/Teams/selectors'
import * as teamActions from '../../modules/Teams/actions'

class Player extends React.Component {
  render() {
    const { playerData } = this.props
    if (!playerData.state) {
      console.log('Not found: ' + this.props.playerId)
      return null
    }
    return (
      <tr
        className={
          playerData.state.owned
            ? 'success'
            : playerData.state.claimed
              ? 'danger'
              : playerData.state.watched ? 'info' : ''
        }
      >
        <td>
          {playerData.originalRank + 1}
        </td>
        <td>
          <a href={playerData.info.link} target="_blank" rel="nofollow">
            {playerData.info.name}
          </a>{' '}
          {playerData.info.note
            ? <span className="glyphicon glyphicon-question-sign" />
            : ''}
        </td>
        <td>
          {playerData.info.position}
        </td>
        <td>
          {playerData.info.team}
        </td>
        <td>
          {playerData.info.bye}
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
    playerData: TeamsSelectors.getPlayerData(state, ownProps),
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(teamActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
