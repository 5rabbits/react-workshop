/**
 * Ejercicio 2 - Props
 *
 * En React utilizamos `props` para pasar variables de un componente a otro.
 * Puedes pensar en props como los argumentos de una función.
 *
 * Cada componente puede además declarar las props que recibe, permitiendo
 * validar tipos de datos y al mismo tiempo sirviendo como documentación (así
 * nos podemos hacer una buena idea de cómo usar el componente).
 *
 * Props son la base para crear piezas de código reutilizable, así que es
 * importante entenderlos bien! :)
 *
 * 🏆 Objetivos:
 *   1. Valida que la propiedad `time` sea un número y que sea opcional.
 *   2. Valida que la propiedad `project` sea un string y que sea opcional.
 *   3. Si no se especifica `time`, asígnale el valor `0` por defecto.
 *   4. Si no se especifica `project`, asígnale el valor `Sin proyecto` por defecto.
 *   5. Usa `formatTime` para mostrar el tiempo especificado en la propiedad `time`.
 *   6. Reemplaza el texto "Sin proyecto" por la propiedad `project`.
 *
 * 🦄 https://reactjs.org/docs/components-and-props.html
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
   */

  /**
   * ✏️ Declara los valores por defecto para las propiedades
   * opcionales que lo necesiten.
   */

  render() {
    return (
      <div className="TimeEntry">
        <div className="TimeEntry__project">
          {/* ✏️ Utiliza la propiedad `project` */}
          Sin proyecto
        </div>

        <div className="TimeEntry__timer">
          <div className="TimeEntry__timer__time">
            {/* ✏️ Utiliza la propiedad `time` */}
            {formatTime(0)}
          </div>
        </div>
      </div>
    )
  }
}
