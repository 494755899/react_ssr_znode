import React from 'react'
import Avatar from 'antd/lib/avatar'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

@inject((stores) => {
  return {
    appState: stores.appState,
  }
}) @observer
class UserWrapper extends React.Component {
  componentDidMount() {
    // will do
  }

  render() {
    const { isLogin, info } = this.props.appState
    return (
      <div className="user">
        <div className="userWrapper">
          {
            isLogin ? (<Avatar size="large" src={info.avatar_url} />) : (<Avatar shape="square" size="large" icon="user" />)
          }
          <p>{info.loginname || '未登录'}</p>
        </div>
        {this.props.children}
      </div>
    )
  }
}

UserWrapper.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}

UserWrapper.propTypes = {
  children: PropTypes.element.isRequired,
}

export default UserWrapper
