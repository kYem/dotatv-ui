import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import Player from './Player'

class Players extends React.Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    average_mmr: PropTypes.number.isRequired,
    server_steam_id: PropTypes.string.isRequired,
    radiant_score: PropTypes.number.isRequired,
    dire_score: PropTypes.number.isRequired,
    game_time: PropTypes.number.isRequired,
    updated: PropTypes.number.isRequired,
    getLiveMatchDetails: PropTypes.func.isRequired
  }

  static defaultProps = {
    game_time: 0,
    updated: 0
  };
  componentDidMount() {
    if (this.props.players) {
      this.refresh = setInterval(() => {
        this.props.getLiveMatchDetails(this.props.server_steam_id)
      }, 2000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.refresh)
  }

  render() {
    let players = null
    if (this.props.players) {
      players = this.props.players.map(player => (<Player key={player.accountid} {...player} />))
    }

    const minutes = Math.floor(this.props.game_time / 60).toFixed(0)
    const seconds = (this.props.game_time - (minutes * 60)).toFixed(0)
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const lastUpdated = new Date(this.props.updated)

    return (
      <div>
        <h6>Average mmr {this.props.average_mmr} Server Id:            <Link to={`/live/${this.props.server_steam_id}`} activeClassName='page-layout__nav-item--active'>Live Match</Link></h6>
        <div>
          <div>Time: {formattedMinutes}:{formattedSeconds} - <span>Last updated {lastUpdated.toLocaleString()}</span></div>
        </div>
        <hr />
        <h3>  Radiant <span>{this.props.radiant_score}</span> : <span>{this.props.dire_score}</span> Dire</h3>
        <table className='ui table'>
          <thead>
            <tr>
              <th>Hero</th>
              <th>Player</th>
              <th>Pro</th>
              <th>Level</th>
              <th>K/D/A</th>
              <th>LH/DN</th>
              <th>Gold</th>
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

export default Players
