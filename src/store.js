import { action, decorate, observable, toJS } from 'mobx'

class Store {
  testsResults = {}
  socket

  constructor() {
    this.socket = new WebSocket('ws://127.0.0.1:3001')

    this.socket.addEventListener('open', () => {
      this.socket.send('run-all-tests')
    })

    this.socket.addEventListener('message', message => {
      const messageData = JSON.parse(message.data)

      if (messageData.type === 'tests-results') {
        this.setTestsResults({
          ...toJS(this.testsResults),
          ...messageData.data,
        })
      }
    })
  }

  getExerciseState(exercise) {
    return toJS(this.testsResults[exercise]) || { state: 'pending' }
  }

  setTestsResults(testsResults) {
    this.testsResults = testsResults
  }
}

decorate(Store, {
  testsResults: observable,
  setTestsResults: action,
})

export default new Store()
