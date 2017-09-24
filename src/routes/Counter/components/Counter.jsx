import React from 'react'
import PropTypes from 'prop-types'
import Players from './Players'

class Counter extends React.Component {
  static propTypes = {
    live: PropTypes.object,
    getLiveMatches: PropTypes.func.isRequired,
    getLiveMatchDetails: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getLiveMatches()
  }

  render() {

    let live = null
    if (this.props.live) {
      live = <Players getLiveMatchDetails={this.props.getLiveMatchDetails} {...this.props.live} />
    } else {
      setTimeout(this.props.getLiveMatches(), 2000)

    }
    return (
      <div style={{ margin: '0 auto' }} >
        <div>
          <h5>Live Matches</h5>
          {live}
        </div>
      </div>
    )
  }
}

export default Counter
