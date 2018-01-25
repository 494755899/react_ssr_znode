import React from 'react'
import Input from 'antd/lib/input'
import Card from 'antd/lib/card'
import Button from 'antd/lib/button'
import Radio from 'antd/lib/radio'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { tabs } from '../../util/variable-defined'

const RadioGroup = Radio.Group;
const { TextArea } = Input;

@inject((stores) => {
  return {
    topicStore: stores.topicStore,
  }
}) @observer
class CreateTopic extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.state = {
      topic: '',
      tab: 'dev',
      title: '',
    }
  }
  componentDidMount() {
    // did
  }

  createTopicHandler = () => {
    const { topic, tab, title } = this.state
    this.props.topicStore.createNewTopic(title, tab, topic).then(() => {
      this.context.router.history.replace(`/list?tab=${tab}`)
    })
  }

  handleNewTopicChange = (e) => {
    this.setState({
      topic: e.target.value,
    })
  }

  changeTitle = (e) => {
    this.setState({
      title: e.target.value,
    })
  }

  typeChange = (e) => {
    this.setState({
      tab: e.target.value,
    });
  }

  render() {
    return (
      <div className="topic_create">
        <Helmet>
          <title>围攻计划书</title>
          <meta name="description" content="混元霹雳手znode高仿社区" />
        </Helmet>
        <Card title="编写回复" style={{ margin: '15px 0px' }}>
          <Input placeholder="标题" style={{ marginBottom: 10 }} onChange={this.changeTitle} />
          <TextArea
            rows={15}
            onChange={this.handleNewTopicChange}
            value={this.state.topic}
            placeholder="...写内容"
          />
          <div>
            <RadioGroup onChange={this.typeChange} value={this.state.tab}>
              {Object.keys(tabs).map(v => (<Radio key={v} value={v} >{tabs[v]}</Radio>))}
            </RadioGroup>
            <Button type="primary" onClick={this.createTopicHandler}>发布话题</Button>
          </div>
        </Card>
      </div>
    )
  }
}

CreateTopic.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
}

export default CreateTopic
