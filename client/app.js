import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import 'antd/lib/menu/style/index.less';
import 'antd/lib/list/style/index.less';
import 'antd/lib/avatar/style/index.less';
import 'antd/lib/spin/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/card/style/index.less';
import 'antd/lib/input/style/index.less';
import 'antd/lib/message/style/index.less';
import 'antd/lib/radio/style/index';
import App from './views/App'
import { AppState, TopicStore } from './store/store'
import './css/index.less'


// ReactDOM.hydrate(<App />, document.getElementById('root'))

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line

const appState = new AppState(initialState.appState)
const topicStore = new TopicStore(initialState.topicStore)


const root = document.getElementById('root')


const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={appState} topicStore={topicStore}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default // eslint-disable-line
    // ReactDOM.hydrate(<NextApp />, document.getElementById('root'))
    render(NextApp)
  })
}
