/**
 * Ejercicio 6 - Subiendo el state
 *
 * En este ejercicio haremos que solo un trabajo a la vez pueda tener
 * su timer activo, así que aunque cada trabajo es capaz de mutar el estado
 * de su propio timer, necesitamos una manera de controlar esto a través
 * de todos los trabajos de manera sincronizada.
 *
 * Además, aunque los datos de los trabajos los recibe `TimeEntriesList`,
 * cada `TimeEntry` cambia el valor de su propio `time` sin dar cuenta de ello,
 * rompiendo el concepto de la "fuente de verdad única"
 * (https://en.wikipedia.org/wiki/Single_source_of_truth).
 *
 * Corregiremos esto haciendo que todos los cambios de estado se hagan únicamente
 * en `TimeEntriesList`, o dicho de otra forma, "subiremos" el estado de los trabajos
 * a su primer ancestro común (en este caso, la lista).
 *
 * 🏆 Objetivos:
 *   1. Agregar la propiedad `isTimerActive` (bool, opcional, `false` por defecto) al
 *      componente `TimeEntry`.
 *   2. En el componente `TimeEntriesList`, declara el state `timeEntries`
 *      inicializado con el valor de `props.timeEntries`. Debes responder
 *      a cambios de esa propiedad.
 *   3. En el componente `TimeEntriesList`, declara el state `activeTimeEntryId`
 *      para guardar el ID del componente que tiene su timer activo (por defecto `null`).
 *   4. Agrega la propiedad `id` (número, obligatorio) al componente `TimeEntry`.
 *   5. Agrega la propiedad `onTimerToggle` (func, obligatorio) al componente `TimeEntry`.
 *      Esta función debe ser invocada cada vez que se haga click en el timer de un trabajo,
 *      pasando el id del trabajo como argumento.
 *   6. Sube el state de `TimeEntry` al componente `TimeEntriesList`.
 *
 * 🦄 https://reactjs.org/docs/lifting-state-up.html
 */

import React from 'react'
import PropTypes from 'prop-types'
import formatTime from '../helpers/formatTime'

export class TimeEntry extends React.Component {
  static propTypes = {
    // ✏️ Agrega las nuevas propiedades del componente
    project: PropTypes.string,
    time: PropTypes.number,
    id: PropTypes.number.isRequired,
    isTimerActive: PropTypes.bool,
    onTimerToggle: PropTypes.func.isRequired
  }

  static defaultProps = {
    // ✏️ Define los nuevos valores por defecto que sean necesarios
    project: 'Sin proyecto',
    time: 0,
    isTimerActive: false
  }

  onTimerToggle = () => {
    this.props.onTimerToggle(this.props.id)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.time !== nextProps.time ||
            this.props.isTimerActive !== nextProps.isTimerActive
  }

  /**
   * ✏️ Este componente ahora no tiene estado, así que solo puedes
   * utilizar props.
   */
  render() {
    console.log("rendering")
    return (
      <div className="TimeEntry">
        <div className="TimeEntry__project">{this.props.project}</div>

        <div className="TimeEntry__timer">
          <div className="TimeEntry__timer__time">
            {formatTime(this.props.time)}
          </div>

          <button
            className="TimeEntry__timer__control"
            onClick={this.onTimerToggle}
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
    timeEntries: this.props.timeEntries,
    activeTimeEntryId: null,
    isTimerActive: false,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.timeEntries !== prevState.timeEntries) {
      return {
        timeEntries: nextProps.timeEntries,
      }
    }

    return null
  }

  componentWillUnmount() {
    this.stopTimerInterval()
  }

  handleToggleTimerClick = (id) => {
    const activeId = this.state.activeTimeEntryId
    const status = activeId === id ? !this.state.isTimerActive : true

    this.setState(
      state => ({
        isTimerActive: status
      }),
      () => {
        this.stopTimerInterval()
        if (this.state.isTimerActive) {
          this.startTimerInterval()
        }

        this.setState({
          activeTimeEntryId: this.state.isTimerActive ? id : null
        })
      }
    )
  }

  isTimerActive(entry) {
    return entry.id === this.state.activeTimeEntryId
  }

  startTimerInterval() {
    this.interval = setInterval(() => {
      const activeId = this.state.activeTimeEntryId
      const timeEntries = this.state.timeEntries
      const timeEntry = timeEntries.find((entry) => {
        return entry.id === activeId;
      })

      timeEntry.time = timeEntry.time + 1

      this.setState({
        timeEntries: timeEntries
      })
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
            project={entry.project}
            time={entry.time}
            isTimerActive={this.isTimerActive(entry)}
            onTimerToggle = {this.handleToggleTimerClick} />
        ))}
      </div>
    )
  }
}
