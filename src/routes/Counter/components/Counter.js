import React from 'react'
import PropTypes from 'prop-types'
import Players from './Players'

class Counter extends React.Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    matches: PropTypes.array.isRequired,
    getLiveMatches: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getLiveMatches()
  }

  render() {
    return (
      <div style={{ margin: '0 auto' }} >
        <div>
          <h5>Live Matches</h5>
          {this.props.matches.map((match) => {
            return <Players key={match.lobby_id} {...match} />
          })}
        </div>
      </div>
    )
  }
}

export default Counter
