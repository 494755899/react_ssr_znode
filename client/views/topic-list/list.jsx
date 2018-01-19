import React from 'react'
import PropTypes from 'prop-types'
import List from 'antd/lib/list'
import Avatar from 'antd/lib/avatar'
import Button from 'antd/lib/button'
import { tabs } from '../../util/variable-defined'

const titleArea = (item) => {
  return (
    <div>
      <Button size="small" type="primary">{tabs[item.tab]}</Button>
      <a className="title" href="https://ant.design">{item.title}</a>
    </div>
  )
}

const description = (item) => {
  return (
    <div className="description">
      <span>{item.visit_count}</span>/
      <span>{item.reply_count}</span>
      <span>{item.last_reply_at}</span>
    </div>
  )
}

const Lists = ({ topics, listItemClick }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={topics}
      renderItem={item => (
        <List.Item onClick={() => listItemClick(item.id)}>
          <List.Item.Meta
            avatar={<Avatar src={item.author.avatar_url} />}
            title={titleArea(item)}
            description={description(item)}
          />
        </List.Item>
      )}
    />
  )
}

Lists.propTypes = {
  topics: PropTypes.object.isRequired,
  listItemClick: PropTypes.func.isRequired,
}

export default Lists
