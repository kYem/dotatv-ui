import React from 'react'
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
    }).isRequired),
    radiant_lead: PropTypes.number.isRequired,
    radiant_score: PropTypes.number.isRequired,
    server_steam_id: PropTypes.string.isRequired,
    spectators: PropTypes.number.isRequired,
    subscribeLiveMatch: PropTypes.func.isRequired,
    active: PropTypes.string.isRequired
  }

  static defaultProps = {
    active: '',
    game_time: 0,
    updated: 0,
    team_name_radiant: 'Radiant',
    team_name_dire: 'Dire',
    average_mmr: 0,
    players: []
  };


  render() {
    const mmr = this.props.average_mmr ? ` - mmr ${this.props.average_mmr}` : ''
    return (
      <div className='main-container col-md-12'>
        <h5 className={'header'}>
          <a
            role='button'
            tabIndex={0}
            onClick={() => this.props.subscribeLiveMatch(this.props.server_steam_id)}
            className={this.props.active}
          >
            {this.props.team_name_radiant} {this.props.radiant_score}
            <span>:</span>
            {this.props.dire_score} {this.props.team_name_dire}
          </a>
        </h5>
        <div className={'game-info'}>
          <span>Game time: {gameTime(this.props.game_time)}</span>{mmr}
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

