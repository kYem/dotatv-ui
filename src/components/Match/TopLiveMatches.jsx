import React from 'react'
import PropTypes from 'prop-types'
import { gameTime, getKnownPlayers } from '../../actions/matchProcessing'
import './TopLiveMatches.scss'

export default class TopLiveMatches extends React.PureComponent {
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
    const mmr = this.props.average_mmr ? `${this.props.average_mmr}` : ''
    const knownPlayers = getKnownPlayers(this.props.players)
    return (
      <div className='top-match col-12 shadow-sm p-2'>
        <h5 className={'header'}>
          <a
            role='button'
            tabIndex={0}
            onClick={() => this.props.subscribeLiveMatch(this.props.server_steam_id)}
            className={this.props.active}
          >
            <span className='score radiant'>
              {this.props.team_name_radiant || 'Radiant'}
              {this.props.radiant_score}
            </span>
            <span>:</span>
            <span className='score dire'>
              {this.props.dire_score}
              {this.props.team_name_dire || 'Dire'}
            </span>
          </a>
        </h5>

        <div className={'game-info'}>
          <div className='game-info-row'>
            <span className='material-icons md-18 mr-2'>show_chart</span>
            <span>{mmr}</span>
          </div>
          <div className='game-info-row'>
            <i className='material-icons md-18 mr-2'>remove_red_eye</i>
            <span>
              {this.props.spectators}
            </span>
          </div>
        </div>

        <div className='live-match'>
          {knownPlayers.map(player => (
            <div className='player mt-2 mb-2' key={player.account_id}>
              <img
                src={player.hero_image}
                alt={player.hero_name}
                className='rounded hero-image'
              />
              <a
                href={`https://www.dotabuff.com/players/${player.account_id}`}
                target='_blank'
                className='ml-1 ellipsis'
              >{player.name || player.personaname}</a>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

