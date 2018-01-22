import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import './HomeView.scss'
import { getLiveMatches, subscribeLiveMatch } from '../../../actions/api'
import TopLiveMatches from '../../../components/Match/TopLiveMatches'
import LiveMatch from '../../../components/Match/LiveMatch'
import Progress from '../../../components/Progress'

export class HomeView extends React.Component {
  static propTypes = {
    getLiveMatches: PropTypes.func.isRequired,
    subscribeLiveMatch: PropTypes.func.isRequired,
    matches: PropTypes.array,
    liveMatch: PropTypes.shape({}),
    liveMatchServerId: PropTypes.string
  }

  static defaultProps = {
    liveMatchServerId: '',
    liveMatch: null,
    matches: [],
  }

  componentDidMount() {
    this.props.getLiveMatches()
    this.refresh = setInterval(() => {
      this.props.getLiveMatches()
    }, 6000)
  }

  componentWillUnmount() {
    clearInterval(this.refresh)
  }

  render() {
    let matches = <Progress />
    if (this.props.matches.length > 0) {
      matches = this.props.matches.map(match => (
        <TopLiveMatches
          subscribeLiveMatch={this.props.subscribeLiveMatch}
          active={this.props.liveMatchServerId === match.server_steam_id ? 'active' : 'inactive'}
          key={match.server_steam_id}
          {...match}
        />))
    }

    let match = <Progress />
    if (this.props.liveMatchServerId) {
      match = (<LiveMatch
        wsGetLiveMatchDetails={this.props.subscribeLiveMatch}
        serverId={this.props.liveMatchServerId}
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
}

const mapDispatchToProps = {
  getLiveMatches,
  subscribeLiveMatch,
}

const mapStateToProps = state => ({
  matches: state.home.matches,
  liveMatch: state.home.live,
  liveMatchServerId: state.home.server_steam_id
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
