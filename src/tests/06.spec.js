import React from 'react'
import PropTypes from 'prop-types'
import { shallow, mount } from 'enzyme'
import Solution, { TimeEntry } from '../exercises/06'

describe('Ejercicio 6', () => {
  const timeEntries = [
    { id: 1, time: 3600, project: 'React Workshop' },
    { id: 2, time: 18425, project: 'TimeBillingX' },
    { id: 3, time: 5678, project: 'LemonLabs' },
    { id: 4, time: 0, project: 'TheTimeBilling' },
  ]

  describe('TimeEntry', () => {
    it('valida que la propiedad "isTimerActive" sea un boolean', () => {
      expect(TimeEntry.propTypes).toBeDefined()
      expect(TimeEntry.propTypes.isTimerActive).toBe(PropTypes.bool)
    })

    describe('si la propiedad "isTimerActive" no es especificada', () => {
      it('le asigna el valor `false`', () => {
        expect(TimeEntry.defaultProps).toBeDefined()
        expect(TimeEntry.defaultProps.isTimerActive).toBe(false)
      })
    })
  })

  describe('TimeEntriesList', () => {
    it('define el state `timeEntries` a partir de `props.timeEntries`', () => {
      const component = shallow(<Solution timeEntries={timeEntries} />)

      expect(component).toHaveState('timeEntries', timeEntries)
    })

    it('define el state `activeTimeEntryId` con valor `null`', () => {
      const component = shallow(<Solution timeEntries={timeEntries} />)

      expect(component).toHaveState('activeTimeEntryId', null)
    })
  })

  describe('TimeEntry', () => {
    it('valida que la propiedad `id` sea una número obligatorio', () => {
      expect(TimeEntry.propTypes).toBeDefined()
      expect(TimeEntry.propTypes.id).toBe(PropTypes.number.isRequired)
    })

    it('valida que la propiedad `onTimerToggle` sea una función obligatoria', () => {
      expect(TimeEntry.propTypes).toBeDefined()
      expect(TimeEntry.propTypes.onTimerToggle).toBe(PropTypes.func.isRequired)
    })

    describe('al hacer click en el timer', () => {
      it('invoca la propiedad `onTimerToggle` pasando el id como primer argumento', () => {
        const onTimerToggle = jest.fn()
        const component = shallow(
          <TimeEntry id={1234} onTimerToggle={onTimerToggle} />
        )

        expect(onTimerToggle).not.toHaveBeenCalled()

        component.find('.TimeEntry__timer__control').simulate('click')

        expect(onTimerToggle).toHaveBeenCalledTimes(1)
        expect(onTimerToggle).toHaveBeenCalledWith(1234)
      })
    })

    it('ahora es un componente sin estado', () => {
      const component = shallow(<TimeEntry id={1} onTimerToggle={() => {}} />)

      expect(component.state()).toBe(null)
    })
  })

  describe('TimeEntriesList', () => {
    describe('al iniciar un timer', () => {
      it('guarda el id del trabajo activo en `state.activeTimeEntryId`', () => {
        const component = mount(<Solution timeEntries={timeEntries} />)
        const timeEntriesComponents = component.find(TimeEntry)

        timeEntries.forEach((timeEntry, index) => {
          timeEntriesComponents
            .at(index)
            .find('.TimeEntry__timer__control')
            .simulate('click')

          expect(component).toHaveState('activeTimeEntryId', timeEntry.id)
        })
      })

      it('el tiempo del trabajo activo de incrementar cada segundo', () => {
        const component = mount(<Solution timeEntries={timeEntries} />)

        component.find(TimeEntry).at(1)
          .find('.TimeEntry__timer__control')
          .simulate('click')

        expect(setInterval).toHaveBeenCalledTimes(1)
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000)

        jest.runOnlyPendingTimers()
        component.update()
        expect(component.state('timeEntries')).toEqual([
          { id: 1, time: 3600, project: 'React Workshop' },
          { id: 2, time: 18425 + 1, project: 'TimeBillingX' },
          { id: 3, time: 5678, project: 'LemonLabs' },
          { id: 4, time: 0, project: 'TheTimeBilling' },
        ])

        expect(component.find(TimeEntry).at(1)).toHaveProp('time', 18425 + 1)

        jest.runOnlyPendingTimers()
        component.update()
        expect(component.state('timeEntries')).toEqual([
          { id: 1, time: 3600, project: 'React Workshop' },
          { id: 2, time: 18425 + 2, project: 'TimeBillingX' },
          { id: 3, time: 5678, project: 'LemonLabs' },
          { id: 4, time: 0, project: 'TheTimeBilling' },
        ])

        expect(component.find(TimeEntry).at(1)).toHaveProp('time', 18425 + 2)
      })

      it('solo el trabajo activo debe mostrar el icono "pause"', () => {
        const component = mount(<Solution timeEntries={timeEntries} />)

        expect(
          component.find(TimeEntry).find('.ion-md-play').length
        ).toBe(timeEntries.length)

        component.find(TimeEntry).at(1)
          .find('.TimeEntry__timer__control')
          .simulate('click')

        expect(
          component.find(TimeEntry).find('.ion-md-play').length
        ).toBe(timeEntries.length - 1)

        expect(
          component.find(TimeEntry).at(1).find('.ion-md-pause').length
        ).toBe(1)
      })
    })

    describe('al detener el timer', () => {
      it('devuelve `state.activeTimeEntryId` a null', () => {
        const component = mount(<Solution timeEntries={timeEntries} />)
        const timeEntriesComponents = component.find(TimeEntry)

        timeEntries.forEach((timeEntry, index) => {
          const timerControl = timeEntriesComponents
            .at(index)
            .find('.TimeEntry__timer__control')

          timerControl.simulate('click')
          expect(component).toHaveState('activeTimeEntryId', timeEntry.id)

          timerControl.simulate('click')
          expect(component).toHaveState('activeTimeEntryId', null)
        })
      })
    })
  })
})
