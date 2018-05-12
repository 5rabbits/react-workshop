import React from 'react'
import PropTypes from 'prop-types'
import { shallow, mount } from 'enzyme'
import Solution from '../exercises/04'

describe('Ejercicio 4', () => {
  describe('al iniciar el timer', () => {
    it('el tiempo debe incrementar cada segundo', () => {
      const component = shallow(<Solution />)

      expect(component.find('.TimeEntry__timer__time')).toHaveText('00:00:00')
      component.find('.TimeEntry__timer__control').simulate('click')

      expect(setInterval).toHaveBeenCalledTimes(1)
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000)

      jest.runOnlyPendingTimers()
      component.update()
      expect(component.find('.TimeEntry__timer__time')).toHaveText('00:00:01')

      jest.runOnlyPendingTimers()
      component.update()
      expect(component.find('.TimeEntry__timer__time')).toHaveText('00:00:02')
    })
  })

  describe('al detener el timer', () => {
    it('el tiempo debe dejar de incrementar', () => {
      const component = shallow(<Solution />)

      expect(component.find('.TimeEntry__timer__time')).toHaveText('00:00:00')
      component.find('.TimeEntry__timer__control').simulate('click')
      component.find('.TimeEntry__timer__control').simulate('click')

      jest.runOnlyPendingTimers()
      component.update()
      expect(component.find('.TimeEntry__timer__time')).toHaveText('00:00:00')
    })
  })

  describe('al desmontar el componente', () => {
    it('el tiempo debe dejar de incrementar', () => {
      const component = mount(<Solution />)
      const setState = jest.fn()

      expect(component.find('.TimeEntry__timer__time')).toHaveText('00:00:00')
      component.find('.TimeEntry__timer__control').simulate('click')
      component.instance().setState = setState
      component.unmount()

      jest.runOnlyPendingTimers()
      expect(setState).not.toHaveBeenCalled()
    })
  })
})
