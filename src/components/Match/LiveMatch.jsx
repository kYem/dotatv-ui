import React from 'react'
import PropTypes from 'prop-types'
import './LiveMatch.scss'
import PlayerTable from './PlayerTable'
import { gameTime } from '../../actions/matchProcessing'

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
    const lastUpdated = this.props.updated ? new Date(this.props.updated) : '-'

    return (
      <div>
        <h6>Average mmr {this.props.average_mmr}</h6>
        <div>Time: {gameTime(this.props.match.game_time)} - <span>Last updated {lastUpdated.toLocaleString()}</span></div>
        <hr />
        <h3>Radiant <span>{radiant.score}</span> : <span>{dire.score}</span> Dire</h3>
        <hr />
        <h6>Radiant</h6>
        <PlayerTable players={radiant} />
        <h6>Dire</h6>
        <PlayerTable players={dire} />
      </div>
    )
  }
}

export default LiveMatch
