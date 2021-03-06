/**
 * 🚨 ATENCIÓN: Los tests pueden tener spoilers de la solución, te
 * recomiendo verlos después de que hayas resuelto el ejercicio.
 */













































import React from 'react'
import { shallow } from 'enzyme'
import TimeEntriesList, { TimeEntry } from '../exercises/05'

describe('Ejercicio 05', () => {
  const timeEntries = [
    { id: 1, time: 3600, project: 'React Workshop' },
    { id: 2, time: 18425, project: 'TimeBillingX' },
    { id: 3, time: 5678, project: 'LemonLabs' },
    { id: 4, time: 0, project: 'TheTimeBilling' },
  ]

  it('despliega un arreglo de trabajos usando el componente `TimeEntry`', () => {
    const component = shallow(<TimeEntriesList timeEntries={timeEntries} />)

    expect(component.find(TimeEntry).length).toBe(4)
  })

  it('asigna el atributo key de manera única a cada trabajo', () => {
    const component = shallow(<TimeEntriesList timeEntries={timeEntries} />)
    const keys = component.find(TimeEntry).map(timeEntry => timeEntry.key())

    expect(new Set(keys).size).toEqual(keys.length)
  })

  it('pasa los datos correctos a cada trabajo', () => {
    const component = shallow(<TimeEntriesList timeEntries={timeEntries} />)

    timeEntries.forEach((timeEntry, index) => {
      const timeEntryComponent = component.find(TimeEntry).at(index)

      expect(timeEntryComponent).toHaveProp('project', timeEntry.project)
      expect(timeEntryComponent).toHaveProp('time', timeEntry.time)
    })
  })
})
