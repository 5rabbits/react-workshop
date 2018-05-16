import React from 'react'
import { shallow } from 'enzyme'
import HelloWorld from '../exercises/01'

describe('Ejercicio 1', () => {
  it('muestra el texto "Hola mundo"', () => {
    const component = shallow(<HelloWorld />)

    expect(component).toHaveText('Hola mundo')
  })
})
