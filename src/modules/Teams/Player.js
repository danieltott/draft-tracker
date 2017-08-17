import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import * as TeamsSelectors from '../../modules/Teams/selectors'
import * as teamActions from '../../modules/Teams/actions'

class Player extends React.Component {
  render() {
    const { playerId, playerInfo, playerState, teamIndex } = this.props
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
          <ButtonGroup>
            <Button bsStyle="default" onClick={this.toggleClaimed}>
              Claimed
            </Button>
            <Button bsStyle="success" onClick={this.toggleOwned}>
              Owned
            </Button>
            <Button bsStyle="info" onClick={this.toggleWatched}>
              Watched
            </Button>
          </ButtonGroup>
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
