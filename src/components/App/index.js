import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Alert from 'react-bootstrap/lib/Alert'
import { getPlayersById } from '../../reducers'
import * as TeamsSelectors from '../../modules/Teams/selectors'
import * as actions from '../../modules/Teams/actions'
import Team from '../../modules/Teams/Team'

// import players from '../../data/players.json'

// const playersObj = {}

// players.forEach(player => {
//   const id = player.link.split('id=')[1]
//   playersObj[id] = player
// })

// <textarea>
//  {JSON.stringify(playersObj)}
// </textarea>

const App = ({
  teams,
  actions,
  visibleTeam,
  visibleTeamIndex,
  playersById,
  clearData,
}) => {
  return (
    <div>
      <Navbar>
        <Nav activeKey={visibleTeamIndex}>
          {teams.map((team, i) =>
            <NavItem
              key={team.name}
              eventKey={i}
              title={team.name}
              onClick={() => {
                actions.displayTeam(i)
              }}
            >
              {team.name}
            </NavItem>
          )}
        </Nav>
        <Nav pullRight>
          <NavItem eventKey="abc123" title="New Team" onClick={actions.addTeam}>
            New Team
          </NavItem>
          <NavItem
            eventKey="abc12345"
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all data?')) {
                clearData()
              }
            }}
          >
            Clear Data
          </NavItem>
        </Nav>
      </Navbar>
      {!visibleTeam &&
        <Alert bsStyle="info">Create a team to get started</Alert>}
      {visibleTeam &&
        <Team
          team={visibleTeam}
          teamIndex={visibleTeamIndex}
          playersById={playersById}
        />}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    teams: TeamsSelectors.getTeams(state),
    visibleTeamIndex: TeamsSelectors.getVisibleTeamIndex(state),
    visibleTeam: TeamsSelectors.getVisibleTeam(state),
    playersById: getPlayersById(state),
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
