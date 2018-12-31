import React from 'react'
import PropTypes from 'prop-types'
import IconVersus from '../icons/IconVersus'
import IconRadiant from '../icons/IconRadiant'
import IconDire from '../icons/IconDire'

const propTypes = {
  team_name_radiant: PropTypes.string.isRequired,
  team_name_dire: PropTypes.string.isRequired,
  dire_score: PropTypes.number.isRequired,
  radiant_score: PropTypes.number.isRequired,
}

const MatchScore = props => (
  <div className='match-header'>
    <div className='score radiant'>
      <div>
        {props.team_name_radiant || <IconDire height={'24'} />}
        {props.radiant_score || 0}
      </div>
      <span className='team-name ellipsis'>
        {props.team_name_dire}
      </span>
    </div>

    <div className={'versus-container'}>
      <IconVersus height={'36'} />
    </div>

    <div className='score dire'>
      <div>
        {props.dire_score || 0}
        {props.team_name_dire || <IconRadiant height={'24'} />}
      </div>
      <span className='team-name ellipsis'>
        {props.team_name_dire}
      </span>
    </div>
  </div>
)

MatchScore.propTypes = propTypes

export default MatchScore
