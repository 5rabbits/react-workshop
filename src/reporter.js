const jest = require('jest')
const path = require('path')
const createJestConfig = require('react-scripts/scripts/utils/createJestConfig')
const fs = require('fs')
const debounce = require('lodash.debounce')

const defaultJestConfig = createJestConfig(
  relativePath => path.resolve('node_modules/react-scripts', relativePath),
  path.resolve('.'),
  false
)

defaultJestConfig.transform['^.+\\.(js|jsx|mjs)$'] = '<rootDir>/node_modules/babel-jest'

process.env.NODE_ENV = 'test'

const runTests = debounce(exercise => {
  jest.runCLI({
    ...defaultJestConfig,
    silent: true,
    env: 'jsdom',
    reporters: [],
    noStackTrace: true,
    _: exercise ? [exercise] : undefined,
  }, [
    path.resolve('.')
  ], ({ testResults }) => {
    const results = {}

    testResults.forEach(testResult => {
      const exerciseName = testResult.testFilePath.match(/(\d+)\.spec\.js/)[1]

      results[exerciseName] = {
        failureMessage: testResult.failureMessage
      }
    })
  })
}, 100)

fs.watch(path.resolve('src/exercises'), (eventType, filename) => {
  runTests(filename.match(/(\d+)/)[0])
})
