import React from 'react'
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import Spin from 'antd/lib/spin'
import {
  observer,
  inject,
} from 'mobx-react'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Lists from './list'
import { TopicStore } from '../../store/store'


@inject((store) => {
  return {
    topicStore: store.topicStore,
  }
}) @observer
export default class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.state = { }
  }

  componentDidMount() {
    const tab = this.getSearchTab()
    this.props.topicStore.fetchTopics(tab)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const tab = this.getSearchTab(nextProps.location.search)
      this.props.topicStore.fetchTopics(tab)
    }
  }

  asyncBootstrap() {
    const tab = this.getSearchTab()
    return this.props.topicStore.fetchTopics(tab || 'all').then(() => {
      return true
    })
  }

  getSearchTab = (search) => {
    const { location } = this.props
    search = search || location.search
    const query = queryString.parse(search)
    return query.tab || 'all'
  }

  listItemClick = (id) => {
    this.context.router.history.push(`/detail/${id}`)
  }

  handleClick = (e) => {
    this.context.router.history.push({
      pathname: '/list',
      search: `?tab=${e.key}`,
    })
  }

  render() {
    const { topicStore } = this.props
    const topics = topicStore.topics
    const tab = this.getSearchTab()
    return (
      <div className="topic-list">
        <Helmet>
          <title>混元霹雳手znode高仿社区</title>
          <meta name="description" content="混元霹雳手znode高仿社区" />
        </Helmet>
        <div className="spinning">
          <Spin size="large" wrapperClassName="spinning" spinning={topicStore.syncing} >
            <div className="menu">
              <Menu
                onClick={this.handleClick}
                selectedKeys={[tab]}
                mode="horizontal"
              >
                <Menu.Item key="all">
                  <Icon type="mail" />全部
                </Menu.Item>
                <Menu.Item key="share">
                  <Icon type="appstore" />分享
                </Menu.Item>
                <Menu.Item key="job">
                  <Icon type="Three" />工作
                </Menu.Item>
                <Menu.Item key="ask">
                  <Icon type="Four" />问题
                </Menu.Item>
                <Menu.Item key="good">
                  <Icon type="Four" />精品
                </Menu.Item>
                <Menu.Item key="dev">
                  <Icon type="Four" />测试
                </Menu.Item>
              </Menu>
              <Lists topics={topics} listItemClick={this.listItemClick} />
            </div>
          </Spin>
        </div>
      </div>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  topicStore: PropTypes.instanceOf(TopicStore),
}

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
}

