import React from 'react'
import PropTypes from 'prop-types'
import formatTime from '../helpers/formatTime'

export class TimeEntry extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    isTimerActive: PropTypes.bool,
    onTimerToggle: PropTypes.func.isRequired,
    project: PropTypes.string,
    time: PropTypes.number,
  }

  static defaultProps = {
    isTimerActive: false,
    project: 'Sin proyecto',
    time: 0,
  }

  handleToggleTimerClick = () => {
    this.props.onTimerToggle(this.props.id)
  }

  render() {
    return (
      <div className="TimeEntry">
        <div className="TimeEntry__project">{this.props.project}</div>

        <div className="TimeEntry__timer">
          <div className="TimeEntry__timer__time">
            {formatTime(this.props.time)}
          </div>

          <button
            className="TimeEntry__timer__control"
            onClick={this.handleToggleTimerClick}
            type="button"
          >
            {this.props.isTimerActive ? (
              <i className="icon ion-md-pause" />
            ) : (
              <i className="icon ion-md-play" />
            )}
          </button>
        </div>
      </div>
    )
  }
}

export default class TimeEntriesList extends React.Component {
  static propTypes = {
    timeEntries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        project: PropTypes.string,
        time: PropTypes.number,
      })
    ).isRequired,
  }

  state = {
    activeTimeEntryId: null,
    timeEntries: this.props.timeEntries,
  }

  handleTimerToggle = timeEntryId => {
    this.setState(state => ({
      activeTimeEntryId: state.activeTimeEntryId === timeEntryId
        ? null
        : timeEntryId
    }), () => {
      clearInterval(this.interval)

      if (this.state.activeTimeEntryId) {
        const index = this.state.timeEntries.findIndex(timeEntry =>
          timeEntry.id === this.state.activeTimeEntryId
        )

        this.interval = setInterval(() => {
          this.setState(state => ({
            timeEntries: [
              ...state.timeEntries.slice(0, index),
              {
                ...state.timeEntries[index],
                time: state.timeEntries[index].time + 1,
              },
              ...state.timeEntries.slice(index + 1),
            ],
          }))
        }, 1000)
      }
    })
  }

  render() {
    return (
      <div className="TimeEntriesList">
        {this.state.timeEntries.map(entry => (
          <TimeEntry
            key={entry.id}
            id={entry.id}
            isTimerActive={entry.id === this.state.activeTimeEntryId}
            onTimerToggle={this.handleTimerToggle}
            project={entry.project}
            time={entry.time}
          />
        ))}
      </div>
    )
  }
}
