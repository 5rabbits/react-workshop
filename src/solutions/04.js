/**
 * Ejercicio 4 - Lifecycle
 *
 * 🏆 Objetivos:
 *   1. Almacenar el valor de la propiedad "time" en el state, para
 *      poder mutar su valor.
 *   2. Al iniciar el timer el tiempo debe incrementar segundo a segundo.
 *   3. Al detener el timer el tiempo debe dejar de incrementar.
 *   4. Usa `formatTime` para mostrar el tiempo transcurrido.
 *   5. Si el componente recibe un nuevo valor para la propiedad "time"
 *      debe reemplazar al tiempo transcurrido actual.
 *   6. Si el componente debe detener el timer antes de desmontarse para
 *      evitar fugas de memoria.
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
    isTimerActive: false,
    time: this.props.time,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.time !== prevState.time) {
      return {
        time: nextProps.time
      }
    }

    return null
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleToggleTimerClick = () => {
    this.setState(state => ({
      isTimerActive: !state.isTimerActive
    }), () => {
      clearInterval(this.interval)

      if (this.state.isTimerActive) {
        this.interval = setInterval(() => {
          this.setState(state => ({
            time: state.time + 1
          }))
        }, 1000)
      }
    })
  }

  render() {
    return (
      <div className="TimeEntry">
        <div className="TimeEntry__project">
          React Workshop
        </div>

        <div className="TimeEntry__timer">
          <div className="TimeEntry__timer__time">
            {formatTime(this.state.time)}
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
