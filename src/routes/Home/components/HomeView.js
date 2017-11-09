import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import './HomeView.scss'
import { getLiveMatches, wsGetLiveMatchDetails } from '../../../actions/api'
import TopLiveMatches from '../../../components/Match/TopLiveMatches'
import LiveMatch from '../../../components/Match/LiveMatch'

export class HomeView extends React.Component {
  static propTypes = {
    getLiveMatches: PropTypes.func.isRequired,
    wsGetLiveMatchDetails: PropTypes.func.isRequired,
    matches: PropTypes.array.isRequired,
    liveMatch: PropTypes.object,
  }

  componentDidMount() {
    this.props.getLiveMatches()
    this.refresh = setInterval(() => {
      this.props.getLiveMatches()
    }, 6000)
  }

  render() {
    let matches = null
    if (this.props.matches.length > 0) {
      matches = this.props.matches.map(match => (<TopLiveMatches key={match.server_steam_id} {...match} />))
      if (!this.props.liveMatch) {
        this.props.wsGetLiveMatchDetails(this.props.matches[0].server_steam_id)
      }
    }

    let match = <div>Please select match</div>
    if (this.props.liveMatch && this.props.liveMatch.teams) {
      match = (<LiveMatch
        wsGetLiveMatchDetails={this.props.wsGetLiveMatchDetails}
        {...this.props.liveMatch}
      />)
    }

    return (
      <div className={'row'}>
        <div className={'col-md-4 col-lg-3'}>
          {matches}
        </div>
        <div className={'col-md-8 col-lg-9'}>
          {match}
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    clearInterval(this.refresh)
  }
}

const mapDispatchToProps = {
  getLiveMatches,
  wsGetLiveMatchDetails,
}

const mapStateToProps = state => ({
  matches: state.home.matches,
  liveMatch: state.home.live,
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
