import React from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import List from 'antd/lib/list'
import Avatar from 'antd/lib/avatar'
import Card from 'antd/lib/card'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'
import UserWrapper from './userWrapper'

@inject((stores) => {
  return {
    appState: stores.appState,
  }
}) @observer
class Info extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  componentDidMount() {
    this.props.appState.getUserDetail()
    this.props.appState.getUserCollection()
  }
  asyncBootstrap() {
    return this.props.appState.getUserDetail().then(() => {
      return this.props.appState.getUserCollection()
    }).then(() => {
      return true
    })
  }

  lists = (topics) => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={topics}
        renderItem={item => (
          <List.Item onClick={() => { this.context.router.history.push(`/detail/${item.id}`) }}>
            <List.Item.Meta
              avatar={<Avatar src={item.author.avatar_url} />}
              title={item.title}
              description={`最新回复${item.last_reply_at}`}
            />
          </List.Item>
        )}
      />
    )
  }

  render() {
    const { recentTopics, recentReplies, collections } = this.props.appState
    return (
      <UserWrapper>
        <div className="gutter-example">
          <Helmet>
            <title>明教帮派众弟子</title>
            <meta name="description" content="混元霹雳手znode高仿社区" />
          </Helmet>
          <Row gutter={16}>
            <Col className="gutter-row" lg={{ span: 8 }} xs={24}>
              <div className="gutter-box">
                <Card title="最近发布的话题" style={{ margin: '15px 0px' }} >
                  {this.lists(recentTopics)}
                </Card>
              </div>

            </Col>
            <Col className="gutter-row" lg={{ span: 8 }} xs={24}>
              <div className="gutter-box">
                <Card title="最近回复的话题" style={{ margin: '15px 0px' }}>
                  {this.lists(recentReplies)}
                </Card>
              </div>
            </Col>
            <Col className="gutter-row" lg={{ span: 8 }} xs={24}>
              <div className="gutter-box">
                <Card title="最近回藏的话题" style={{ margin: '15px 0px' }}>
                  {this.lists(collections)}
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </UserWrapper>
    )
  }
}

Info.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}

export default Info
