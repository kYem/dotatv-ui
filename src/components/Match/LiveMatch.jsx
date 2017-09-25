import React from 'react'
import PropTypes from 'prop-types'
import './LiveMatch.scss'
import Player from '../../routes/Counter/components/Player'
import PlayerTable from './PlayerTable'

class LiveMatch extends React.Component {

  static propTypes = {
    teams: PropTypes.arrayOf(PropTypes.shape({
      players: PropTypes.array.isRequired,
      team_name: PropTypes.string.isRequired,
      team_logo: PropTypes.string.isRequired,
      team_id: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
    })).isRequired,
    match: PropTypes.shape({
      server_steam_id:  PropTypes.string.isRequired,
      matchid:  PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      game_time: PropTypes.number.isRequired,
      game_mode: PropTypes.number.isRequired,
      league_id: PropTypes.number.isRequired
    }).isRequired
  }

  render() {
    const radiant = this.props.teams[0].players
    const dire = this.props.teams[1].players

    const minutes = Math.floor(this.props.game_time / 60).toFixed(0)
    const seconds = (this.props.game_time - (minutes * 60)).toFixed(0)
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const lastUpdated = new Date(this.props.updated || '-')

    return (
      <div>
        <h6>Average mmr {this.props.average_mmr}</h6>
        <div>Time: {formattedMinutes}:{formattedSeconds} - <span>Last updated {lastUpdated.toLocaleString()}</span></div>
        <hr />
        <h3>Radiant <span>{this.props.teams[0].score}</span> : <span>{this.props.teams[1].score}</span> Dire</h3>
        <PlayerTable players={radiant} />
        <PlayerTable players={dire} />
      </div>
    )
  }
}

export default LiveMatch
