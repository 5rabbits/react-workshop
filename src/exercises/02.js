import React from 'react'
import formatTime from '../helpers/formatTime'

export default class Solution extends React.Component {
  state = {
    isTimerActive: false,
  }

  handleToggleTimerClick = () => {
    this.setState(state => ({
      isTimerActive: !state.isTimerActive
    }))
  }

  render() {
    return (
      <div className="TimeEntry">
        <div className="TimeEntry__project">
          React Workshop
        </div>

        <div className="TimeEntry__timer">
          <div className="TimeEntry__timer__time">
            {formatTime(0)}
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
