import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'mobx-react'
import store from './store'

const render = AppComponent => {
  ReactDOM.render(
    <Provider store={store}>
      <AppComponent />
    </Provider>,
    document.getElementById('root')
  )
}

render(App)
registerServiceWorker()

if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App').default)
  })
}
