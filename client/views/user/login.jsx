import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import message from 'antd/lib/message'
import {
  observer,
  inject,
} from 'mobx-react'
import UserWrapper from './userWrapper'

@inject((stores) => {
  return {
    appState: stores.appState,
  }
}) @observer
class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      passWord: '',
    }
  }

  changeState = (e, flag) => {
    this.setState({
      [flag]: e.target.value,
    })
  }

  getFrom = (location) => {
    location = location || this.props.location
    const query = queryString.parse(location.search)
    return query.from || '/user/info'
  }

  login = () => {
    const { userName, passWord } = this.state
    this.props.appState.login(userName, passWord).then((result) => {
      console.log(result)
      if (!result.success) {
        message.error(result.data.error_msg)
      }
    })
  }

  render() {
    const from = this.getFrom()
    const { isLogin } = this.props.appState
    if (isLogin) {
      return <Redirect to={from} />
    }
    return (
      <UserWrapper>
        <div className="login" >
          <Helmet>
            <title>六大门派入口</title>
            <meta name="description" content="混元霹雳手znode高仿社区" />
          </Helmet>
          <div>
            <Input
              placeholder="请输入用户名"
              value={this.state.userName}
              onChange={e => this.changeState(e, 'userName')}
              style={{ width: 300 }}
            />
          </div>
          <div>
            <Input
              placeholder="请输入密码"
              value={this.state.passWord}
              onChange={e => this.changeState(e, 'passWord')}
              style={{ width: 300 }}
            />
          </div>
          <div className="loginIn" >
            <Button
              type="primary"
              onClick={this.login}
              style={{ width: 300 }}
            >
              登陆
            </Button>
          </div>
        </div>
      </UserWrapper>
    )
  }
}

Login.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}
Login.propTypes = {
  location: PropTypes.object.isRequired,
}
export default Login
