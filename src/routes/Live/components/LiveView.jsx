import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './LiveView.scss'
import Match from '../../../components/Match/LiveMatch'
import { getLiveMatchDetails } from '../../../actions/api'

export class LiveView extends React.Component {

  static propTypes = {
    getLiveMatchDetails: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getLiveMatchDetails(this.props.params.serverId, 'live')
  }

  render() {
    let match = null
    if (this.props.liveMatch) {
      match = <Match {...this.props.liveMatch} />
    }

    return (
      <div style={{ margin: '0 auto' }} >
        <div>
          <h5>Live Matches!</h5>
          {this.props.liveMatch === undefined ? 'Loading ...' : match || <h6>match data not available</h6>}
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = {
  getLiveMatchDetails,
}

const mapStateToProps = state => ({
  liveMatch: state.live.live
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveView)
