import React from 'react'
import PropTypes from 'prop-types'
import Player from './Player'

class Players extends React.Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    average_mmr: PropTypes.number.isRequired,
  }

  render() {
    return (
      <div>
        <h6>Average mmr {this.props.average_mmr}</h6>
        <table className="ui table">
          <thead>
          <tr>
            <th className="two wide center aligned">Hero</th>
            <th className="four wide center aligned">Player</th>
            <th className="four wide center aligned">Pro</th>
            <th className="one wide center aligned">Level</th>
            <th className="one wide center aligned">K/D/A</th>
            <th className="one wide center aligned">LH/DN</th>
            <th className="one wide center aligned">Gold</th>
          </tr>
          </thead>
          <tbody>
          <tr></tr>
          </tbody>
          <tbody>
          {this.props.players.map(player => (<Player key={player.account_id} {...player} />))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Players
