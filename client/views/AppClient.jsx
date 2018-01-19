import React from 'react'
import HeaderBar from './layout/header-bar'
import RouterClient from '../config/routerClient'

export default class AppClient extends React.Component {
  componentDidMount() {
    // do something here
  }

  render() {
    return [
      <HeaderBar key="headerbar" />,
      <RouterClient key="routes" />,
    ]
  }
}
