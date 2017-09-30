import React from 'react'
import PropTypes from 'prop-types'

class NotablePlayer extends React.Component {
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
  }

  render() {
    return (
      <tr>
        <td>
          <img src={this.props.hero_image} alt={this.props.hero_name} className='ui mini left floated rounded image' />
        </td>
        <td className='aligned'>
          <a
            href={`https://www.dotabuff.com/players/${this.props.account_id}`}
            target='_blank'
          >{this.props.name || this.props.personaname}</a>
        </td>
      </tr>
    )
  }
}

export default NotablePlayer
