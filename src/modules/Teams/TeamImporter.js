import React from 'react'
import { connect } from 'react-redux'

import { importTeamOrder } from './actions'

class TeamImporter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      importContent: '',
      showEditor: false,
    }
  }
  render() {
    if (this.state.showEditor) {
      return (
        <div>
          <textarea
            className="form-control"
            value={this.state.importContent}
            onChange={e => this.setState({ importContent: e.target.value })}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.saveImport}
          >
            Import from footballguys
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
            Import Order
          </button>
        </div>
      )
    }
  }
  saveImport = () => {
    this.props.importTeamOrder(this.state.importContent)
    this.setState({ showEditor: false })
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    importTeamOrder: order => {
      dispatch(importTeamOrder(ownProps.teamIndex, order))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamImporter)
