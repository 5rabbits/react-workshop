import React from 'react'
import PropTypes from 'prop-types'
import { shallow } from 'enzyme'
import Solution from '../exercises/02'

describe('Ejercicio 2', () => {
  it('valida que la propiedad "time" sea un número', () => {
    expect(Solution.propTypes).toBeDefined()
    expect(Solution.propTypes.time).toBe(PropTypes.number)
  })

  describe('si la propiedad "time" no es especificada', () => {
    it('le asigna el valor 0', () => {
      expect(Solution.defaultProps).toBeDefined()
      expect(Solution.defaultProps.time).toBe(0)
    })
  })

  it('formatea el tiempo en base a la propiedad "time"', () => {
    const component = shallow(<Solution time={8765} />)

    expect(component.find('.TimeEntry__timer__time')).toHaveText('02:26:05')
  })
})
