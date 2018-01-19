import React from 'react'
import HeaderBar from './layout/header-bar'
import Routes from '../config/router'

export default class App extends React.Component {
  componentDidMount() {
    // do something here
  }

  render() {
    return [
      <HeaderBar key="headerbar" />,
      <Routes key="routes" />,
    ]
  }
}
