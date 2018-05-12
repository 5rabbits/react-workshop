import React from 'react'
import PropTypes from 'prop-types'
import { shallow } from 'enzyme'
import Solution from '../exercises/03'

describe('Ejercicio 3', () => {
  it('debe validar que la propiedad "time" sea un número', () => {
    expect(Solution.propTypes).toBeDefined()
    expect(Solution.propTypes.time).toBe(PropTypes.number)
  })

  it('debe validar que la propiedad "onTimerToggle" sea una función', () => {
    expect(Solution.propTypes).toBeDefined()
    expect(Solution.propTypes.onTimerToggle).toBe(PropTypes.func)
  })

  describe('si la propiedad "time" no es especificada', () => {
    it('debe asignarle el valor 0', () => {
      expect(Solution.defaultProps).toBeDefined()
      expect(Solution.defaultProps.time).toBe(0)
    })
  })

  it('debe formatear el tiempo en base a la propiedad "time"', () => {
    const component = shallow(<Solution time={8765} />)

    expect(component.find('.TimeEntry__timer__time')).toHaveText('02:26:05')
  })

  describe('cuando cambie el estado del timer', () => {
    describe('si el timer ahora está activo', () => {
      it('debe notificar "true" usando la propiedad "onTimerToggle"', () => {
        const onTimerToggle = jest.fn()
        const component = shallow(<Solution onTimerToggle={onTimerToggle} />)

        component.setState({ isTimerActive: false })
        component.find('.TimeEntry__timer__control').simulate('click')

        expect(onTimerToggle).toHaveBeenCalledTimes(1)
        expect(onTimerToggle).toHaveBeenCalledWith(true)
      })
    })

    describe('si el timer ahora está detenido', () => {
      it('debe notificar "false" usando la propiedad "onTimerToggle"', () => {
        const onTimerToggle = jest.fn()
        const component = shallow(<Solution onTimerToggle={onTimerToggle} />)

        component.setState({ isTimerActive: true })
        component.find('.TimeEntry__timer__control').simulate('click')

        expect(onTimerToggle).toHaveBeenCalledTimes(1)
        expect(onTimerToggle).toHaveBeenCalledWith(false)
      })
    })

    describe('si la propiedad "onTimerToggle" no fue especificada', () => {
      it('no debe fallar', () => {
        const component = shallow(<Solution />)

        expect(() => {
          component.find('.TimeEntry__timer__control').simulate('click')
        }).not.toThrow()
      })
    })
  })
})
