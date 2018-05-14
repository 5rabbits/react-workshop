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

  /**
   * ✏️ Define el state inicial del componente.
   *
   * 🦄 https://reactjs.org/docs/state-and-lifecycle.html
   */

  /**
   * ✏️ Define un handler para el click del botón.
   *
   * 🦄 https://reactjs.org/docs/handling-events.html
   */

  render() {
    return (
      <div className="TimeEntry">
        <div className="TimeEntry__project">React Workshop</div>

        <div className="TimeEntry__timer">
          <div className="TimeEntry__timer__time">{formatTime(0)}</div>

          <button
            className="TimeEntry__timer__control"
            type="button"
            /**
             * ✏️ Reacciona al click para ejecutar el handler que definiste
             * anteriormente.
             *
             * 🦄 `onClick={fn}`
             */
          >
            {/**
             * ✏️ Dependiendo del estado actual, debes mostrar uno de los
             * siguientes iconos.
             *
             * 🦄 https://reactjs.org/docs/conditional-rendering.html
             */}

            {/* <i className="icon ion-md-play" /> */}
            {/* <i className="icon ion-md-pause" /> */}
          </button>
        </div>
      </div>
    )
  }
}
