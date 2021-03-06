/**
 * 🚨 ATENCIÓN: Está es la solución a un problema, no la veas a menos que
 * hayas podido resolverlo por ti mism@.
 *
 * Si necesitas orientación no tengas miedo de preguntar, o si lo prefieres
 * puedes trabajar en conjunto con un compañero para que se apoyen mutuamente,
 * pero si miras y copias la solución a los problemas no le sacarás mucho
 * provecho al workshop, así que no lo hagas 😉
 */








































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

  componentWillUnmount() {
    this.stopTimerInterval()
  }

  handleTimerToggle = timeEntryId => {
    this.setState(
      state => ({
        activeTimeEntryId:
          state.activeTimeEntryId === timeEntryId ? null : timeEntryId,
      }),
      () => {
        this.stopTimerInterval()

        if (this.state.activeTimeEntryId) {
          this.startTimerInterval()
        }
      }
    )
  }

  startTimerInterval() {
    this.interval = setInterval(() => {
      const index = this.state.timeEntries.findIndex(
        timeEntry => timeEntry.id === this.state.activeTimeEntryId
      )

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

  stopTimerInterval() {
    clearInterval(this.interval)
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
