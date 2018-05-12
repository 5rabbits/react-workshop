import React from 'react'
import PropTypes from 'prop-types'
import formatTime from '../helpers/formatTime'

export default class Solution extends React.Component {
  static propTypes = {
    onTimerToggle: PropTypes.func,
    time: PropTypes.number,
  }

  static defaultProps = {
    time: 0,
  }

  state = {
    isTimerActive: false,
    time: this.props.time,
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleToggleTimerClick = () => {
    this.setState(state => ({
      isTimerActive: !state.isTimerActive
    }), () => {
      if (this.props.onTimerToggle) {
        this.props.onTimerToggle(this.state.isTimerActive)
      }

      clearInterval(this.interval)

      if (this.state.isTimerActive) {
        this.interval = setInterval(() => {
          this.setState(state => ({
            time: state.time + 1
          }))
        }, 1000)
      }
    })
  }

  render() {
    return (
      <div className="TimeEntry">
        <div className="TimeEntry__project">
          React Workshop
        </div>

        <div className="TimeEntry__timer">
          <div className="TimeEntry__timer__time">
            {formatTime(this.state.time)}
          </div>

          <button
            className="TimeEntry__timer__control"
            onClick={this.handleToggleTimerClick}
            type="button"
          >
            {this.state.isTimerActive
              ? <i className="icon ion-md-pause" />
              : <i className="icon ion-md-play" />
            }
          </button>
        </div>
      </div>
    )
  }
}
