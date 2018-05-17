const jest = require('jest')
const path = require('path')
const createJestConfig = require('react-scripts/scripts/utils/createJestConfig')
const fs = require('fs')
const debounce = require('lodash.debounce')
const WebSocket = require('ws')

const defaultJestConfig = createJestConfig(
  relativePath => path.resolve('node_modules/react-scripts', relativePath),
  path.resolve('.'),
  false
)

defaultJestConfig.transform['^.+\\.(js|jsx|mjs)$'] =
  '<rootDir>/node_modules/babel-jest'

process.env.NODE_ENV = 'test'

const wsServer = new WebSocket.Server({
  port: 3001,
})

let socket

wsServer.on('connection', ws => {
  socket = ws
  socket.on('message', message => {
    if (message === 'run-all-tests') {
      runTests()
    }
  })
})

const runTests = debounce(exercise => {
  jest.runCLI(
    {
      ...defaultJestConfig,
      silent: true,
      env: 'jsdom',
      reporters: [],
      noStackTrace: true,
      _: exercise ? [exercise] : undefined,
    },
    [path.resolve('.')],
    ({ testResults }) => {
      const results = {}

      testResults.forEach(testResult => {
        const exerciseName = testResult.testFilePath.match(/(\d+)\.spec\.js/)[1]

        results[exerciseName] = {
          state: testResult.failureMessage ? 'failing' : 'passing',
          failureMessage: (
            testResult.testResults.find(
              test => test.failureMessages.length > 0
            ) || {}
          ).fullName,
          explicit: exercise != null,
        }
      })

      socket.send(
        JSON.stringify({
          type: 'tests-results',
          data: results,
        })
      )
    }
  )
}, 100)

fs.watch(path.resolve('src/exercises'), (eventType, filename) => {
  runTests(filename.match(/(\d+)/)[0])
})
