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

const TimeEntry = props => (
  <div className="TimeEntry">
    <div className="TimeEntry__project">{props.project}</div>

    <div className="TimeEntry__timer">
      <div className="TimeEntry__timer__time">{formatTime(props.time)}</div>
    </div>
  </div>
)

TimeEntry.propTypes = {
  project: PropTypes.string,
  time: PropTypes.number,
}

TimeEntry.defaultProps = {
  project: 'Sin proyecto',
  time: 0,
}

export default TimeEntry
