import React from 'react'
import Player from '../../routes/Counter/components/Player'
import './PlayerTable.scss'

export default ({ players }) => (

  <table className='ui table player-match-table table-striped'>
    <thead className="thead-inverse">
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
      {players.map(player => (<Player key={player.accountid} {...player} />))}
    </tbody>
  </table>

)
