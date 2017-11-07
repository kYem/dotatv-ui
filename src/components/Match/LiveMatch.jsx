import React from 'react'
import PropTypes from 'prop-types'
import './LiveMatch.scss'
import PlayerTable from './PlayerTable'
import { gameTime } from '../../actions/matchProcessing'
import { LiveStreaming } from '../../actions/LiveStreaming'

class LiveMatch extends React.Component {

  static propTypes = {
    getLiveMatchDetails: PropTypes.func.isRequired,
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
  }

  static defaultProps = {
    average_mmr: 0,
  }

  componentDidMount() {
    this.refresh = setInterval(() => {
      this.props.getLiveMatchDetails(this.props.match.server_steam_id)
    }, 2000)

    const liveStreaming = new LiveStreaming('ws://127.0.0.1:8008/socket')
    this.socket = liveStreaming.getSocket(() => {
      this.socket.send('yes')
    })
  }

  componentWillUnmount() {
    clearInterval(this.refresh)
  }

  render() {
    const radiant = this.props.teams[0]
    const dire = this.props.teams[1]
    const lastUpdated = this.props.updated ? new Date(this.props.updated) : '-'
    return (
      <div className='liveMatch'>
        <header>
          <h4 className='title'>
            {radiant.team_name || 'Radiant'} {radiant.score}
            <span> : </span>
            {dire.score} {dire.team_name || 'Dire'}
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
