/**
 * Ejercicio 2 - Props
 *
 * 🏆 Objetivos:
 *   1. Valida que la propiedad `time` sea un número y que sea opcional.
 *   2. Si no se especifica `time`, asígnale el valor `0` por defecto.
 *   3. Usa `formatTime` para mostrar el tiempo especifiado en la propiedad `time`.
 */

import React from 'react'
import formatTime from '../helpers/formatTime'

/**
 * ✏️ Importa la biblioteca `prop-types` (ya está instalada) para acceder a
 * los validadores.
 *
 * 🦄 https://reactjs.org/docs/typechecking-with-proptypes.html
 */

export default class TimeEntry extends React.Component {
  /**
   * ✏️ Declara las propiedades que este componente acepta.
   *
   * En este caso el componente solo recibe la propiedad "time", que además
   * tiene un valor por defecto en caso que no se especifique.
   */

  render() {
    return (
      <div className="TimeEntry">
        <div className="TimeEntry__project">React Workshop</div>

        <div className="TimeEntry__timer">
          <div className="TimeEntry__timer__time">
            {/* ✏️ Utiliza la propiedad "time" en vez del 0 hardcodeado */}
            {formatTime(0)}
          </div>
        </div>
      </div>
    )
  }
}
