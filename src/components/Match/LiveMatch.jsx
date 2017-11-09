import React from 'react'
import PropTypes from 'prop-types'
import './LiveMatch.scss'
import PlayerTable from './PlayerTable'
import { gameTime } from '../../actions/matchProcessing'
import LiveValue from './LiveValue'

class LiveMatch extends React.Component {

  static propTypes = {
    wsGetLiveMatchDetails: PropTypes.func.isRequired,
    teams: PropTypes.arrayOf(PropTypes.shape({
      players: PropTypes.array.isRequired,
      team_name: PropTypes.string.isRequired,
      team_logo: PropTypes.string.isRequired,
      team_id: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
    })).isRequired,
    match: PropTypes.shape({
      server_steam_id:  PropTypes.string.isRequired,
      match_id:  PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      game_time: PropTypes.number.isRequired,
      game_mode: PropTypes.number.isRequired,
      league_id: PropTypes.number.isRequired
    }).isRequired,
    average_mmr: PropTypes.number,
    graph_data: PropTypes.shape({
      graph_gold: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
    }).isRequired
  }

  static defaultProps = {
    average_mmr: 0,
    graph_data: {
      graph_gold: []
    }
  }

  componentDidMount() {
    this.props.wsGetLiveMatchDetails(this.props.match.server_steam_id)
    this.refresh = setInterval(() => {
      this.props.wsGetLiveMatchDetails(this.props.match.server_steam_id)
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.refresh)
  }

  render() {
    const radiant = this.props.teams[0]
    const dire = this.props.teams[1]
    const lastUpdated = this.props.updated ? new Date(this.props.updated) : '-'
    const graphGold = this.props.graph_data.graph_gold
    const lastAdvantageTick = graphGold[graphGold.length - 1]
    const teamAdvantage = <LiveValue shouldResetStyle={false} value={Math.abs(lastAdvantageTick)} />
    return (
      <div className='liveMatch'>
        <header>
          <h4 className='title'>
            { lastAdvantageTick > 0 ? teamAdvantage : ''}
            {radiant.team_name || 'Radiant'} {radiant.score}
            <span> : </span>
            {dire.score} {dire.team_name || 'Dire'}
            { lastAdvantageTick < 0 ? teamAdvantage : ''}
          </h4>
          <div>
            <span>Game time: {gameTime(this.props.match.game_time)}</span>
            <span> {this.props.average_mmr ? <span> | mmr {this.props.average_mmr}</span> : ''} </span>
            <span className='updated timestamp'>Last updated {lastUpdated.toLocaleString()}</span>
          </div>
        </header>
        <hr />
        <h6>Radiant</h6>
        <PlayerTable players={radiant.players} />
        <h6>Dire</h6>
        <PlayerTable players={dire.players} />
      </div>
    )
  }
}

export default LiveMatch
