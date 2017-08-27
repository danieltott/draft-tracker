import React from 'react'
import { connect } from 'react-redux'
import { importTeamOrderFbg, importTeamDataJson } from './actions'

class TeamImporter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      importContentFbg: '',
      importJsonContent: '',
      showEditor: false,
    }
  }
  render() {
    switch (this.state.showEditor) {
      case 'footballguys':
        return (
          <div>
            <textarea
              className="form-control"
              value={this.state.importContentFbg}
              onChange={e =>
                this.setState({ importContentFbg: e.target.value })}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.saveImportFbg}
            >
              Import from footballguys
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.setState({ showEditor: '' })}
            >
              Cancel
            </button>
          </div>
        )

      case 'jsonData':
        return (
          <div>
            <textarea
              className="form-control"
              value={this.state.importJsonContent}
              onChange={e =>
                this.setState({ importJsonContent: e.target.value })}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.saveImportJson}
            >
              Import JSON data
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.setState({ showEditor: '' })}
            >
              Cancel
            </button>
          </div>
        )

      default:
        return (
          <div>
            <button
              className="btn btn-link btn-small"
              onClick={() => {
                this.setState({ showEditor: 'footballguys' })
              }}
            >
              Import from footballguys
            </button>
            <button
              className="btn btn-link btn-small"
              onClick={() => {
                this.setState({ showEditor: 'jsonData' })
              }}
            >
              Import from json file
            </button>
          </div>
        )
    }
  }
  saveImportFbg = () => {
    this.props.importTeamOrderFbg(this.state.importContentFbg)
    this.setState({ showEditor: '', importContentFbg: '' })
  }
  saveImportJson = files => {
    this.props.importTeamDataJson(this.state.importJsonContent)
    this.setState({ showEditor: '', importJsonContent: '' })
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    importTeamOrderFbg: order => {
      dispatch(importTeamOrderFbg(ownProps.teamIndex, order))
    },
    importTeamDataJson: json => {
      dispatch(importTeamDataJson(ownProps.teamIndex, json))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamImporter)
