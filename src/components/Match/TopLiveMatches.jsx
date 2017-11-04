import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { gameTime, getKnownPlayers } from '../../actions/matchProcessing'
import NotablePlayer from './NotablePlayer'
import './TopLiveMatches.scss'

export default class TopLiveMatches extends React.Component {
  static propTypes = {
    players: PropTypes.array,
    average_mmr: PropTypes.number.isRequired,
    server_steam_id: PropTypes.string.isRequired,
    radiant_score: PropTypes.number.isRequired,
    dire_score: PropTypes.number.isRequired,
    game_time: PropTypes.number.isRequired,
  }

  static defaultProps = {
    game_time: 0,
    updated: 0
  };


  render() {
    return (
      <div className='main-container col-md-12'>
        <h5>
          <Link to={`/live/${this.props.server_steam_id}`} activeClassName='page-layout__nav-item--active'>
          Radiant <span>{this.props.radiant_score}</span> : <span>{this.props.dire_score}</span> Dire
          </Link>
        </h5>
        <div className={'game-info'}>
          <span>Game time: {gameTime(this.props.game_time)}</span> - mmr {this.props.average_mmr}
        </div>
        <table className='ui table live-match'>
          <tbody>
            {getKnownPlayers(this.props.players).map(player => (<NotablePlayer key={player.account_id} {...player} />))}
          </tbody>
        </table>
      </div>
    )
  }
}

