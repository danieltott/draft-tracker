import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getTeamName } from './selectors'
import { editTeamName } from './actions'

const StyledForm = styled.form`
  margin-top: 20px;
  margin-bottom: 10px;
`

class TeamName extends React.Component {
  constructor(props) {
    super(props)
    // this.componentDidMount = this.componentDidMount.bind(this)

    this.state = {
      showEditor: false,
    }
  }
  render() {
    const { teamName } = this.props
    if (this.state.showEditor) {
      return (
        <StyledForm onSubmit={this.updateTeamName}>
          <div className="input-group input-group-lg">
            <input
              type="text"
              autoFocus
              className="form-control"
              ref={input => (this.input = input)}
              defaultValue={teamName}
            />
            <span className="input-group-btn">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </span>
          </div>
        </StyledForm>
      )
    } else {
      return (
        <h1
          onClick={() => {
            this.setState({ showEditor: true })
          }}
        >
          {teamName}
        </h1>
      )
    }
  }
  updateTeamName = e => {
    e.preventDefault()
    this.props.editTeamName(this.input.value)
    this.setState({ showEditor: false })
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teamName: getTeamName(state, ownProps),
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    editTeamName: name => {
      dispatch(editTeamName(ownProps.teamIndex, name))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamName)
