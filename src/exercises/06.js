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
  }

  static defaultProps = {
    // ✏️ Define los nuevos valores por defecto que sean necesarios
    project: 'Sin proyecto',
    time: 0,
  }

  // ✏️ Sube el estado al componente `TimeEntriesList`
  state = {
    isTimerActive: false,
    time: this.props.time,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.time !== prevState.time) {
      return {
        time: nextProps.time,
      }
    }

    return null
  }

  componentWillUnmount() {
    this.stopTimerInterval()
  }

  handleToggleTimerClick = () => {
    /**
     * ✏️ El componente ahora no tendrá estado, así que cuando se
     * necesite cambiar el timer debes notificar al componente padre
     * mediante un callback pasado por props.
     */
    this.setState(
      state => ({
        isTimerActive: !state.isTimerActive,
      }),
      () => {
        this.stopTimerInterval()

        if (this.state.isTimerActive) {
          this.startTimerInterval()
        }
      }
    )
  }

  startTimerInterval() {
    this.interval = setInterval(() => {
      this.setState(state => ({
        time: state.time + 1,
      }))
    }, 1000)
  }

  stopTimerInterval() {
    clearInterval(this.interval)
  }

  /**
   * ✏️ Este componente ahora no tiene estado, así que solo puedes
   * utilizar props.
   */
  render() {
    return (
      <div className="TimeEntry">
        <div className="TimeEntry__project">{this.props.project}</div>

        <div className="TimeEntry__timer">
          <div className="TimeEntry__timer__time">
            {formatTime(this.state.time)}
          </div>

          <button
            className="TimeEntry__timer__control"
            onClick={this.handleToggleTimerClick}
            type="button"
          >
            {this.state.isTimerActive ? (
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

  /**
   * ✏️ Define e implementa los cambios de estados que subieron desde
   * el componente `TimeEntry`.
   */

  /**
   * ✏️ Debes ajustar el render para utilizar el state del componente
   * y pasar las propiedades que necesites a los componentes `TimEntry`.
   */
  render() {
    return (
      <div className="TimeEntriesList">
        {this.props.timeEntries.map(entry => (
          <TimeEntry key={entry.id} project={entry.project} time={entry.time} />
        ))}
      </div>
    )
  }
}
