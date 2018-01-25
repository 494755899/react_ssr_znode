
import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
// import { Redirect } from 'react-router-dom'
import Input from 'antd/lib/input'
import message from 'antd/lib/message'
import Button from 'antd/lib/button'
import { post } from '../../util/http'
// import {
//   observer,
//   inject,
// } from 'mobx-react'
import UserWrapper from './userWrapper'

// @inject((stores) => {
//   return {
//     appState: stores.appState,
//   }
// }) @observer
class Register extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      passWord: '',
      repassWord: '',
    }
  }

  changeState = (e, flag) => {
    const value = e.target.value
    this.setState({
      [flag]: value,
    })
  }

  register = () => {
    const { userName, repassWord, passWord } = this.state
    post('users/signUp', {}, { userName, repassWord, passWord })
      .then(() => {
        message.success('成功')
      })
  }

  render() {
    const { userName, passWord, repassWord } = this.state
    return (
      <UserWrapper>
        <div className="register" >
          <Helmet>
            <title>六大门派入口</title>
            <meta name="description" content="混元霹雳手znode高仿社区" />
          </Helmet>
          <div>
            <Input
              placeholder="请输入用户名"
              value={userName}
              onChange={e => this.changeState(e, 'userName')}
              style={{ width: 300 }}
            />
          </div>
          <div>
            <Input
              placeholder="请输入密码"
              value={passWord}
              onChange={e => this.changeState(e, 'passWord')}
              style={{ width: 300 }}
            />
          </div>
          <div>
            <Input
              placeholder="请输确认密码"
              value={repassWord}
              onChange={e => this.changeState(e, 'repassWord')}
              style={{ width: 300 }}
            />
          </div>
          <div className="registerIn" >
            <Button
              type="primary"
              onClick={this.register}
              style={{ width: 300 }}
            >
              注册
            </Button>
          </div>
        </div>
      </UserWrapper>
    )
  }
}

// Register.wrappedComponent.propTypes = {
//   appState: PropTypes.object.isRequired,
// }
// Register.propTypes = {
//   location: PropTypes.object.isRequired,
// }
export default Register
