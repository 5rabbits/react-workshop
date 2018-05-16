import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as failFast from 'jasmine-fail-fast'
import 'jest-enzyme'

Enzyme.configure({ adapter: new Adapter() })

jest.useFakeTimers()

beforeEach(() => {
  jest.clearAllTimers()
  setTimeout.mockClear()
  setInterval.mockClear()
  setImmediate.mockClear()
})

/**
 * Fail after the first test in a single test suite fails. This is NOT the same as jest's
 * --bail option, which works across test suites
 */
const jasmineEnv = jasmine.getEnv()

jasmineEnv.addReporter(failFast.init())
