/**
 * Ejercicio 2 - Props
 *
 * 🏆 Objetivos:
 *   1. Valida que la propiedad `time` sea un número y que sea opcional.
 *   2. Si no se especifica `time`, asígnale el valor `0` por defecto.
 *   3. Usa `formatTime` para mostrar el tiempo especifiado en la propiedad `time`.
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

  render() {
    return (
      <div className="TimeEntry">
        <div className="TimeEntry__project">React Workshop</div>

        <div className="TimeEntry__timer">
          <div className="TimeEntry__timer__time">
            {formatTime(this.props.time)}
          </div>
        </div>
      </div>
    )
  }
}
