import React from 'react'
import Marked from 'marked'
import PropTypes from 'prop-types'
// import Helmet from 'react-helmet'
import { toJS } from 'mobx'
import Card from 'antd/lib/card'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import {
  observer,
  inject,
} from 'mobx-react'
import Reply from './reply'

const { TextArea } = Input;
// import {TopicStore} from "../../store/store";


@inject((stores) => {
  return {
    topicStore: stores.topicStore,
    appState: stores.appState,
  }
}) @observer
export default class TopicDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.state = {
      newReply: '',
      details: '',
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.topicStore.getTopicDetail(id).then(() => {
      const topic = this.props.topicStore.detailMap[id]
      this.details.innerHTML = Marked(topic.content)
    })
    // do something here
  }

  getTopicId() {
    return this.props.match.params.id
  }
  doReply = () => {
    const id = this.getTopicId()
    const topic = this.props.topicStore.detailMap[id]
    topic.doReply(this.state.newReply).then(() => {
      this.setState({
        newReply: '',
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  asyncBootstrap() {
    const id = this.props.match.params.id
    return this.props.topicStore.getTopicDetail(id).then(() => {
      return true
    })
  }

  goLogin = () => {
    this.context.router.history.push('/user/login')
  }

  handleNewReplyChange = (e) => {
    this.setState({
      newReply: e.target.value,
    })
  }

  render() {
    const id = this.props.match.params.id
    const topic = this.props.topicStore.detailMap[id]
    const { isLogin, info } = this.props.appState
    return (
      <div className="topic_detail">
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          {topic ? (
            <div>
              <Card title={topic.title} style={{}}>
                <p
                  ref={(innerHtml) => { this.details = innerHtml }}
                  dangerouslySetInnerHTML={{ __html: Marked(topic.content) }}
                />
              </Card>
              {topic.createdReplies && topic.createdReplies.length > 0 ?
                <div>
                  <Card title={`我的最新回复${topic.createdReplies.length}条`} style={{ margin: '15px 0px' }}>
                    <Reply reply={topic.createdReplies.map(v => Object.assign({}, v, {
                      author: {
                        avatar_url: info.avatar_url,
                        loginname: info.loginname,
                      },
                    }))}
                    />
                  </Card>
                </div> : null
              }
              {isLogin ? <div>
                <Card title="编写回复" style={{ margin: '15px 0px' }}>
                  <TextArea
                    rows={4}
                    onChange={this.handleNewReplyChange}
                    value={this.state.newReply}
                    placeholder="...写内容"
                  />
                  <Button type="primary" onClick={this.doReply}>评伦</Button>
                </Card>
              </div> : null}
              <Card title={`${topic.replies.length}回复`} style={{ marginTop: 15 }}>
                {isLogin ? null : <Button type="primary" onClick={this.goLogin}>登录评伦</Button>}
                <Reply reply={toJS(topic.replies)} />
              </Card>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
}
