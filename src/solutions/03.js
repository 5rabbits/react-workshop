/**
 * Ejercicio 3 - State
 *
 * 🏆 Objetivos:
 *   1. Define el estado `isTimerActive` con valor inicial `false`.
 *   2. Al presionar el botón del timer debe invertir el valor de `isTimerActive`.
 *   3. Mostrar el icono "play" cuando el timer está detenido.
 *   4. Mostrar el icono "pause" cuando el timer está activo.
 */

import React from 'react'
import PropTypes from 'prop-types'
import formatTime from '../helpers/formatTime'

export default class TimeEntry extends React.Component {
  static propTypes = {
    time: PropTypes.number,
  }

  static defaultProps = {
    time: 0,
  }

  state = {
    isTimerActive: false
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
            {formatTime(this.props.time)}
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
