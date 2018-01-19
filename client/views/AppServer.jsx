import React from 'react'
import HeaderBar from './layout/header-bar'
import RouterServer from '../config/routerServer'

export default class App extends React.Component {
  componentDidMount() {
    // do something here
  }

  render() {
    return [
      <HeaderBar key="headerbar" />,
      <RouterServer key="routes" />,
    ]
  }
}
