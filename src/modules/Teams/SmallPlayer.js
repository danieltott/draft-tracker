import React from 'react'
import { connect } from 'react-redux'

import * as TeamsSelectors from '../../modules/Teams/selectors'

class SmallPlayer extends React.Component {
  render() {
    const { playerInfo } = this.props
    return (
      <tr>
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
      </tr>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    playerInfo: TeamsSelectors.getPlayerInfo(state, ownProps),
  }
}

export default connect(mapStateToProps)(SmallPlayer)
