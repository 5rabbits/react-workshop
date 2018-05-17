/**
 * Ejercicio 3 - State, eventos, render condicional
 *
 * Un componente no puede cambiar directamente las props que recibe,
 * así que cuando necesitamos tener valores dinámicos que afecten el
 * render debemos usar state.
 *
 * Cada vez que el state de un componente cambie, se invocará un render
 * automáticamente para reflejar los cambios necesarios.
 *
 * Normalmente cambiamos el state en respuesta a algún tipo de evento,
 * como el click en un botón, un mensaje de websocket, scroll del
 * documento, etc.
 *
 * 🏆 Objetivos:
 *   1. Define el estado `isTimerActive` con valor inicial `false`.
 *   2. Al presionar el botón del timer debe invertir el valor de `isTimerActive`.
 *   3. Mostrar el icono "play" cuando el timer está detenido.
 *   4. Mostrar el icono "pause" cuando el timer está activo.
 *
 * 🦄 https://reactjs.org/docs/state-and-lifecycle.html
 */

import React from 'react'
import PropTypes from 'prop-types'
import formatTime from '../helpers/formatTime'

/**
 * ✏️ Los componentes funcionales no pueden tener estado ni funciones de instancia,
 * así que antes que todo debes convertirlo en una clase.
 *
 * ✏️ Define el state inicial del componente.
 *
 * ✏️ Define un handler para el click del botón.
 * 🦄 https://reactjs.org/docs/handling-events.html
 */
class TimeEntry extends React.Component {
  static propTypes = {
    project: PropTypes.string,
    time: PropTypes.number,
  }

  static defaultProps = {
    project: 'Sin proyecto',
    time: 0,
  }

  constructor(props) {
    super(props)
    this.state = {
      isTimerActive: false
    }
  }

  handleClick = () => {
    this.setState({
      isTimerActive: !this.state.isTimerActive
    });
  }

  render() {
    return (
      <div className="TimeEntry">
        <div className="TimeEntry__project">{this.props.project}</div>

        <div className="TimeEntry__timer">
          <div className="TimeEntry__timer__time">{formatTime(this.props.time)}</div>

          <button
            className="TimeEntry__timer__control"
            type="button"
            onClick={this.handleClick}
          >
            { !this.state.isTimerActive && <i className="icon ion-md-play" /> }
            { this.state.isTimerActive && <i className="icon ion-md-pause" /> }
          </button>
        </div>
      </div>
    )
  }
}

export default TimeEntry
