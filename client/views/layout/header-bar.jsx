import React from 'react'
import PropTypes from 'prop-types'
import Button from 'antd/lib/button'
import { observer, inject } from 'mobx-react'

@inject((stores) => {
  return {
    appState: stores.appState,
  }
}) @observer
class HeaderBar extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    // will do
  }

  handlerLogin = () => {
    if (this.props.appState.isLogin) {
      this.context.router.history.push('/user/info')
    } else {
      this.context.router.history.push('/user/login')
    }
  }

  createTopic = () => {
    this.context.router.history.push('/createtopic')
  }

  render() {
    const { isLogin, info } = this.props.appState
    return (
      <div className="navbar" key="header">
        <div className="navbar-inner">
          <div className="container">
            <a className="brand">
              <img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="logo" />
            </a>
            <div className="login">
              <Button
                type="success"
                onClick={this.createTopic}
                style={{ marginRight: 20 }}
              >
                创建话题
              </Button>
              <span onClick={this.handlerLogin}>
                {isLogin ? info.loginname : <span>登录</span>}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HeaderBar.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}

export default HeaderBar
