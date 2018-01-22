import React from 'react'
import PropTypes from 'prop-types'
import './LiveMatch.scss'
import PlayerTable from './PlayerTable'
import { gameTime } from '../../actions/matchProcessing'
import LiveValue from './LiveValue'
import Progress from '../Progress'

class LiveMatch extends React.Component {

  static propTypes = {
    wsGetLiveMatchDetails: PropTypes.func.isRequired,
    serverId: PropTypes.string.isRequired,
    teams: PropTypes.arrayOf(PropTypes.shape({
      players: PropTypes.array.isRequired,
      team_name: PropTypes.string.isRequired,
      team_logo: PropTypes.string.isRequired,
      team_id: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
    })),
    match: PropTypes.shape({
      game_time: PropTypes.number.isRequired,
      game_mode: PropTypes.number.isRequired,
      league_id: PropTypes.number.isRequired
    }),
    average_mmr: PropTypes.number,
    graph_data: PropTypes.shape({
      graph_gold: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
    }),
    updated: PropTypes.number,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    isLoading: true,
    average_mmr: 0,
    graph_data: {
      graph_gold: []
    },
    teams: [],
    match: {
      game_time: 0,
      game_mode: 0,
      league_id: 0,
    },
    updated: 0,
  }

  componentDidMount() {
    this.props.wsGetLiveMatchDetails(this.props.serverId)
  }

  render() {
    if (this.props.isLoading) {
      return <Progress />
    }

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
