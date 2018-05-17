/**
 * 🚨 ATENCIÓN: Los tests pueden tener spoilers de la solución, te
 * recomiendo verlos después de que hayas resuelto el ejercicio.
 */













































import React from 'react'
import { shallow, mount } from 'enzyme'
import TimeEntry from '../exercises/04'

describe('Ejercicio 04', () => {
  it('define el state inicial', () => {
    const component = shallow(<TimeEntry time={1234} />)

    expect(component).toHaveState('time', 1234)
  })

  describe('al iniciar el timer', () => {
    it('el tiempo debe incrementar cada segundo', () => {
      const component = shallow(<TimeEntry />)

      expect(component.find('.TimeEntry__timer__time')).toHaveText('00:00:00')
      component.find('.TimeEntry__timer__control').simulate('click')

      expect(setInterval).toHaveBeenCalledTimes(1)
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000)

      jest.runOnlyPendingTimers()
      component.update()
      expect(component).toHaveState('time', 1)
      expect(component.find('.TimeEntry__timer__time')).toHaveText('00:00:01')

      jest.runOnlyPendingTimers()
      component.update()
      expect(component).toHaveState('time', 2)
      expect(component.find('.TimeEntry__timer__time')).toHaveText('00:00:02')
    })
  })

  describe('al detener el timer', () => {
    it('el tiempo debe dejar de incrementar', () => {
      const component = shallow(<TimeEntry />)

      expect(component.find('.TimeEntry__timer__time')).toHaveText('00:00:00')
      component.find('.TimeEntry__timer__control').simulate('click')

      jest.runOnlyPendingTimers()
      component.update()
      expect(component).toHaveState('time', 1)
      expect(component.find('.TimeEntry__timer__time')).toHaveText('00:00:01')

      component.find('.TimeEntry__timer__control').simulate('click')

      jest.runOnlyPendingTimers()
      component.update()
      expect(component).toHaveState('time', 1)
      expect(component.find('.TimeEntry__timer__time')).toHaveText('00:00:01')
    })
  })

  describe('si el componente recibe un nuevo valor para la propiedad "time"', () => {
    it('respeta el nuevo valor recibido', () => {
      const component = mount(<TimeEntry />)

      component.setProps({ time: 60 })
      expect(component).toHaveState('time', 60)
    })
  })

  describe('si el componente recibe el mismo valor para la propiedad "time"', () => {
    it('no actualiza el state innecesariamente', () => {
      const component = mount(<TimeEntry time={60} />)
      const setState = jest.fn()

      component.instance().setState = setState
      component.setProps({ time: 60 })

      expect(setState).not.toHaveBeenCalled()
    })
  })

  describe('al desmontar el componente', () => {
    it('el tiempo debe dejar de incrementar', () => {
      const component = mount(<TimeEntry />)
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
