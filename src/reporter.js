const jest = require('jest')
const path = require('path')
const createJestConfig = require('react-scripts/scripts/utils/createJestConfig')

const defaultJestConfig = createJestConfig(
  relativePath => path.resolve('node_modules/react-scripts', relativePath),
  path.resolve('.'),
  false
)

defaultJestConfig.transform['^.+\\.(js|jsx|mjs)$'] = '<rootDir>/node_modules/babel-jest'

process.env.NODE_ENV = 'test'

jest.runCLI({
  ...defaultJestConfig,
  silent: true,
  env: 'jsdom',
  reporters: [],
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
