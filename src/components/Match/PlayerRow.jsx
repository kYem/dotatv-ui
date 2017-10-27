import React from 'react'
import PropTypes from 'prop-types'

class PlayerRow extends React.Component {
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
    team_tag: PropTypes.string.optional,
    level: PropTypes.number,
    kill_count: PropTypes.number,
    death_count: PropTypes.number,
    assists_count: PropTypes.number,
    denies_count: PropTypes.number,
    lh_count: PropTypes.number,
    gold: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  }
  static defaultProps = {
    kill_count: 0,
    death_count: 0,
    assists_count: 0,
    denies_count: 0,
    lh_count: 0,
    gold: 0,
    level: 0,
    x: 0,
    y: 0
  };

  render() {
    return (
      <tr>
        <td>
          <img src={this.props.hero_image} alt={this.props.hero_name} className='rounded image' />
        </td>
        <td>
          {this.props.team_tag}
          <a
            href={`https://www.dotabuff.com/players/${this.props.account_id}`}
            target='_blank'
          > {this.props.name}</a>
        </td>
        <td>{this.props.level}</td>
        <td>{this.props.kill_count}/{this.props.death_count}/{this.props.assists_count} </td>
        <td>{this.props.lh_count}/{this.props.denies_count}</td>
        <td>{this.props.gold}</td>
      </tr>
    )
  }
}

export default PlayerRow
