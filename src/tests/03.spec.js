/**
 * 🚨 ATENCIÓN: Los tests pueden tener spoilers de la solución, te
 * recomiendo verlos después de que hayas resuelto el ejercicio.
 */













































import React from 'react'
import { shallow } from 'enzyme'
import TimeEntry from '../exercises/03'

describe('Ejercicio 03', () => {
  it('define un estado inicial', () => {
    const component = shallow(<TimeEntry />)

    expect(component).toHaveState('isTimerActive', false)
  })

  describe('al presionar el control del timer', () => {
    describe('si el timer está detenido', () => {
      it('lo inicia', () => {
        const component = shallow(<TimeEntry />)

        component.setState({ isTimerActive: false })
        component.find('.TimeEntry__timer__control').simulate('click')

        expect(component).toHaveState('isTimerActive', true)
      })
    })

    describe('si el timer está activo', () => {
      it('lo detiene', () => {
        const component = shallow(<TimeEntry />)

        component.setState({ isTimerActive: true })
        component.find('.TimeEntry__timer__control').simulate('click')

        expect(component).toHaveState('isTimerActive', false)
      })
    })
  })

  describe('si el timer está detenido', () => {
    it('debe mostrar el icono "play"', () => {
      const component = shallow(<TimeEntry />)

      component.setState({ isTimerActive: false })

      expect(component.find('.TimeEntry__timer__control i')).toHaveClassName(
        'icon ion-md-play'
      )
    })
  })

  describe('si el timer está activo', () => {
    it('debe mostrar el icono "pause"', () => {
      const component = shallow(<TimeEntry />)

      component.setState({ isTimerActive: true })

      expect(component.find('.TimeEntry__timer__control i')).toHaveClassName(
        'icon ion-md-pause'
      )
    })
  })
})
