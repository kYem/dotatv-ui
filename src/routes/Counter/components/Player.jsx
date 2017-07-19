import React from 'react'
import PropTypes from 'prop-types'

class Player extends React.Component {
  static propTypes = {
    account_id: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    avatarfull: PropTypes.string,
    avatarmedium: PropTypes.string,
    hero_id: PropTypes.number.isRequired,
    hero_image: PropTypes.string.isRequired,
    hero_name: PropTypes.string.isRequired,
    name: PropTypes.string,
    personaname: PropTypes.string,
    steamid: PropTypes.string,
    level: PropTypes.number,
    kill_count: PropTypes.number,
    death_count: PropTypes.number,
    assists_count: PropTypes.number,
    denies_count: PropTypes.number,
    lh_count: PropTypes.number,
    gold: PropTypes.number,
  }
  static defaultProps = {
    kill_count: 0,
    death_count: 0,
    assists_count: 0,
    denies_count: 0,
    lh_count: 0,
    gold: 0,
    level: 0,
  };

  // style = {
  //   "display:block;width: 60px;white-space: nowrap;overflow: hidden!important;text-overflow: ellipsis!important;"
  // }

  render() {
    return (
      <tr>
        <td>
          <img src={this.props.hero_image} alt={this.props.hero_name} className='ui mini left floated rounded image' />
        </td>
        <td className='center aligned'>
          <a
            href={`https://www.dotabuff.com/players/${this.props.account_id}`}
            target='_blank'
          >{this.props.personaname}</a>
          <p>{this.props.hero_name}</p>
        </td>
        <td className='center aligned'>
          <a href='/GH-GOD'>{this.props.name}</a>
        </td>
        <td className='center aligned'><p>{this.props.level}</p></td>
        <td className='center aligned'><p>{this.props.kill_count}/{this.props.death_count}/{this.props.assists_count} </p></td>
        <td className='center aligned'><p>{this.props.lh_count}/{this.props.denies_count}</p></td>
        <td className='center aligned'><p>{this.props.gold}</p></td>
      </tr>
    )
  }
}

export default Player
