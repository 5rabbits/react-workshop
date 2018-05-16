import React from 'react'
import PropTypes from 'prop-types'
import formatTime from '../helpers/formatTime'

const TimeEntry = props => (
  <div className="TimeEntry">
    <div className="TimeEntry__project">{props.project}</div>

    <div className="TimeEntry__timer">
      <div className="TimeEntry__timer__time">
        {formatTime(props.time)}
      </div>
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
