import React from 'react'

class TeamExporter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showEditor: false,
    }
  }
  render() {
    const { team } = this.props
    if (this.state.showEditor) {
      return (
        <div>
          <textarea
            className="form-control"
            autofocus
            value={JSON.stringify(team)}
            readonly
          />
          <button
            type="button"
            className="btn btn-link"
            onClick={() => {
              this.setState({ showEditor: false })
            }}
          >
            Close
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <button
            className="btn btn-link btn-small"
            onClick={() => {
              this.setState({ showEditor: true })
            }}
          >
            Export Team
          </button>
        </div>
      )
    }
  }
}

export default TeamExporter
