/**
 * 🚨 ATENCIÓN: Los tests pueden tener spoilers de la solución, te
 * recomiendo verlos después de que hayas resuelto el ejercicio.
 */













































import React from 'react'
import { shallow } from 'enzyme'
import HelloWorld from '../exercises/01'

describe('Ejercicio 01', () => {
  it('muestra el texto "Hola mundo"', () => {
    const component = shallow(<HelloWorld />)

    expect(component).toHaveText('Hola mundo')
  })
})
