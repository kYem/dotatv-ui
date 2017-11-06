import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { gameTime, getKnownPlayers } from '../../actions/matchProcessing'
import NotablePlayer from './NotablePlayer'
import './TopLiveMatches.scss'

export default class TopLiveMatches extends React.Component {
  static propTypes = {
    team_name_radiant: PropTypes.string,
    team_name_dire: PropTypes.string,
    average_mmr: PropTypes.number.isRequired,
    building_state: PropTypes.number.isRequired,
    deactivate_time: PropTypes.number.isRequired,
    dire_score: PropTypes.number.isRequired,
    game_time: PropTypes.number.isRequired,
    last_update_time: PropTypes.number.isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
      account_id: PropTypes.number.isRequired,
      hero_id: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    radiant_lead: PropTypes.number.isRequired,
    radiant_score: PropTypes.number.isRequired,
    server_steam_id: PropTypes.string.isRequired,
    spectators: PropTypes.number.isRequired,
  }

  static defaultProps = {
    game_time: 0,
    updated: 0,
    team_name_radiant: 'Radiant',
    team_name_dire: 'Dire',
    average_mmr: 0,
  };


  render() {
    return (
      <div className='main-container col-md-12'>
        <h5>
          <Link to={`/live/${this.props.server_steam_id}`} activeClassName='page-layout__nav-item--active'>
            {this.props.team_name_radiant} {this.props.radiant_score}
            <span>:</span>
            {this.props.dire_score} {this.props.team_name_dire}
          </Link>
        </h5>
        <div className={'game-info'}>
          <span>Game time: {gameTime(this.props.game_time)}</span> - mmr {this.props.average_mmr}
          <div>Viewers: {this.props.spectators}</div>
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

