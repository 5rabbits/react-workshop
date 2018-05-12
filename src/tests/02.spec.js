import React from 'react'
import { shallow } from 'enzyme'
import Solution from '../exercises/02'

describe('Ejercicio 2', () => {
  describe('si el timer está detenido', () => {
    it('debe mostrar el icono "play"', () => {
      const component = shallow(<Solution />)

      component.setState({ isTimerActive: false })

      expect(component.find('.TimeEntry__timer__control i')).toHaveClassName('icon ion-md-play')
    })
  })

  describe('si el timer está activo', () => {
    it('debe mostrar el icono "pause"', () => {
      const component = shallow(<Solution />)

      component.setState({ isTimerActive: true })

      expect(component.find('.TimeEntry__timer__control i')).toHaveClassName('icon ion-md-pause')
    })
  })

  describe('al presionar el control del timer', () => {
    describe('si el timer está detenido', () => {
      it('debe iniciarlo', () => {
        const component = shallow(<Solution />)

        component.setState({ isTimerActive: false })
        component.find('.TimeEntry__timer__control').simulate('click')

        expect(component).toHaveState('isTimerActive', true)
      })
    })

    describe('si el timer está activo', () => {
      it('debe detenerlo', () => {
        const component = shallow(<Solution />)

        component.setState({ isTimerActive: true })
        component.find('.TimeEntry__timer__control').simulate('click')

        expect(component).toHaveState('isTimerActive', false)
      })
    })
  })
})
