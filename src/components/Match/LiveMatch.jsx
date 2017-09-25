import React from 'react'
import PropTypes from 'prop-types'
import './LiveMatch.scss'
import Player from '../../routes/Counter/components/Player'

class LiveMatch extends React.Component {

  static propTypes = {
    players: PropTypes.array.isRequired,
    average_mmr: PropTypes.number.isRequired,
    server_steam_id: PropTypes.string.isRequired,
    radiant_score: PropTypes.number.isRequired,
    dire_score: PropTypes.number.isRequired,
    game_time: PropTypes.number.isRequired,
  }

  render() {

    let players = null
    if (this.props.players) {
      players = this.props.players.map(player => (<Player key={player.account_id} {...player} />))
    }

    const minutes = Math.floor(this.props.game_time / 60).toFixed(0)
    const seconds = (this.props.game_time - (minutes * 60)).toFixed(0)
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    const lastUpdated = new Date(this.props.updated || '-')

    return (
      <div>
        <h6>Average mmr {this.props.average_mmr} Server Id: {this.props.server_steam_id}</h6>
        <div>
          <div>Time: {formattedMinutes}:{formattedSeconds} - <span>Last updated {lastUpdated.toLocaleString()}</span></div>
        </div>
        <hr />
        <h3>  Radiant <span>{this.props.radiant_score}</span> : <span>{this.props.dire_score}</span> Dire</h3>
        <table className='ui table'>
          <thead>
          <tr>
            <th className='two wide center aligned'>Hero</th>
            <th className='four wide center aligned'>Player</th>
            <th className='four wide center aligned'>Pro</th>
            <th className='one wide center aligned'>Level</th>
            <th className='one wide center aligned'>K/D/A</th>
            <th className='one wide center aligned'>LH/DN</th>
            <th className='one wide center aligned'>Gold</th>
          </tr>
          </thead>
          <tbody>
          <tr />
          </tbody>
          <tbody>
          {players}
          </tbody>
        </table>
      </div>
    )
  }
}

export default LiveMatch