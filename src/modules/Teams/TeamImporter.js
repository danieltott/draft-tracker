import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import { importTeamOrder } from './actions'

class TeamImporter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      importContent: '',
    }
  }
  render() {
    console.log('Importer rendering')
    return (
      <div>
        <textarea
          className="form-control"
          value={this.state.importContent}
          onChange={e => this.setState({ importContent: e.target.value })}
        />
        <Button bsStyle="primary" onClick={this.saveImport}>
          Import from footballguys
        </Button>
      </div>
    )
  }
  saveImport = () => {
    this.props.importTeamOrder(this.state.importContent)
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
