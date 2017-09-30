import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import './HomeView.scss'
import { getLiveMatches } from '../../../actions/api'
import TopLiveMatches from '../../../components/Match/TopLiveMatches'

export class HomeView extends React.Component {
  static propTypes = {
    getLiveMatches: PropTypes.func.isRequired,
    matches: PropTypes.array.isRequired,
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
    }
    
    return (
      <div className={'row'}>
        <div className={'col-md-4'}>
          {matches}
        </div>
        <div className={'col-md-8'}>
          Main
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
}

const mapStateToProps = state => ({
  matches: state.home.matches
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
