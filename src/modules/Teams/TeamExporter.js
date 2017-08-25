import React from 'react'
import { connect } from 'react-redux'
import { downloadExport } from './actions'

class TeamExporter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showEditor: false,
    }
  }
  render() {
    const { team, downloadExport } = this.props
    if (this.state.showEditor) {
      return (
        <div>
          <textarea
            className="form-control"
            autoFocus
            value={JSON.stringify(team)}
            readOnly
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
          <button
            type="button"
            className="btn btn-link"
            onClick={() => downloadExport(team)}
          >
            Download Export File
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

const mapStateToProps = (state, ownProps) => {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    downloadExport: team => dispatch(downloadExport(team)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamExporter)
