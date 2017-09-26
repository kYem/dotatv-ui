import React from 'react'
import Player from '../../routes/Counter/components/Player'

export default ({players}) => (

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
    {players.map(player => (<Player key={player.accountid} {...player} />))}
    </tbody>
  </table>

)
