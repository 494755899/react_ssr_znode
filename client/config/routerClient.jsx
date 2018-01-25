import React from 'react'
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import TopicList from '../views/topic-list/index'
// import TopicDetail from '../views/topic-detail/index'
// import Login from '../views/user/login'
import TestApi from '../views/test/api-test'
import Info from '../views/user/info'
import CreateTopic from '../views/create-topic/index'
import Register from '../views/user/register'
import Bundle from './bundle'

function LoginAsync(props) {
  return (
    <Bundle load={() => import('../views/user/login')}>
      {COM => <COM {...props} />}
    </Bundle>
  )
}

function TopicDetailAsync(props) {
  return (
    <Bundle load={() => import('../views/topic-detail/index')}>
      {COM => <COM {...props} />}
    </Bundle>
  )
}


const PrivateRoute = ({ isLogin, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (
        isLogin ?
          <Component {...props} /> :
          <Redirect
            to={{
              pathname: '/user/login',
              search: `?from=${rest.path}`,
            }}
          />
      )
    }
  />

)

const InjectPrivateRoute = withRouter(inject((stores) => {
  return {
    isLogin: stores.appState.isLogin,
  }
})(observer(PrivateRoute)))

PrivateRoute.propTypes = {
  isLogin: PropTypes.boolean,
  component: PropTypes.element.isRequired,
}

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="first" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={TopicDetailAsync} key="detail" />,
  <Route path="/user/login" component={LoginAsync} key="login" />,
  <Route path="/user/register" component={Register} key="register" />,
  <InjectPrivateRoute path="/user/info" component={Info} key="info" />,
  <InjectPrivateRoute path="/createtopic" component={CreateTopic} key="createtopic" />,
  <Route path="/test" component={TestApi} key="test" />,
]

