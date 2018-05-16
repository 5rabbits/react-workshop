/**
 * 🚨 ATENCIÓN: Los tests pueden tener spoilers de la solución, te
 * recomiendo verlos después de que hayas resuelto el ejercicio.
 */













































import React from 'react'
import PropTypes from 'prop-types'
import { shallow } from 'enzyme'
import TimeEntry from '../exercises/02'

describe('Ejercicio 2', () => {
  it('valida que la propiedad "time" sea un número', () => {
    expect(TimeEntry.propTypes).toBeDefined()
    expect(TimeEntry.propTypes.time).toBe(PropTypes.number)
  })

  it('valida que la propiedad "project" sea un string', () => {
    expect(TimeEntry.propTypes).toBeDefined()
    expect(TimeEntry.propTypes.project).toBe(PropTypes.string)
  })

  describe('si la propiedad "time" no es especificada', () => {
    it('le asigna el valor 0', () => {
      expect(TimeEntry.defaultProps).toBeDefined()
      expect(TimeEntry.defaultProps.time).toBe(0)
    })
  })

  describe('si la propiedad "project" no es especificada', () => {
    it('le asigna el valor "Sin proyecto"', () => {
      expect(TimeEntry.defaultProps).toBeDefined()
      expect(TimeEntry.defaultProps.project).toBe('Sin proyecto')
    })
  })

  it('formatea el tiempo en base a la propiedad "time"', () => {
    const component = shallow(<TimeEntry time={8765} />)

    expect(component.find('.TimeEntry__timer__time')).toHaveText('02:26:05')
  })

  it('despliega el proyecto recibido en la propiedad "project"', () => {
    const component = shallow(<TimeEntry project="React Workshop" />)

    expect(component.find('.TimeEntry__project')).toHaveText('React Workshop')
  })
})
