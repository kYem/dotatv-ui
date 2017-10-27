import React from 'react'
import PropTypes from 'prop-types'
import './LiveValue.scss'

export default class LiveValue extends React.Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    includeSymbol: PropTypes.bool.isRequired,
    positiveClass: PropTypes.string.isRequired,
    negativeClass: PropTypes.string.isRequired,
    changeClass: PropTypes.string.isRequired,
    highlightClass: PropTypes.string.isRequired,
  }

  static defaultProps = {
    positiveClass: 'up',
    negativeClass: 'down',
    changeClass: 'change',
    precision: 2,
    includeSymbol: false,
    highlightClass: 'highlight',
  }
  constructor(props) {
    super(props)
    this.state = {
      positiveNegative: '',
      isSymbolVisible: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    let positiveNegative = ''
    if (this.props.value !== nextProps.value) {
      positiveNegative = this.props.value > nextProps.value ? nextProps.negativeClass : nextProps.positiveClass
    }
    const state = { positiveNegative, oldValue: this.props.value }
    this.setState(state)
  }

  render() {
    return (
      <span
        className={`stats-count ${this.props.changeClass} ${this.state.positiveNegative} ${this.props.highlightClass}`}
        data-value={this.state.oldValue}
      >
        {this.props.includeSymbol ? <span className='change' /> : ''}
        {this.props.value}
      </span>
    )
  }
}
