import React from 'react'
import PropTypes from 'prop-types'
import dateFormat from 'dateformat'
import List from 'antd/lib/list'
import Avatar from 'antd/lib/avatar'

const titleArea = (item) => {
  return (
    <span>
      <span>{item.author.loginname}</span>
      <span>{dateFormat(item.create_at)}</span>
    </span>
  )
}

const Reply = ({ reply }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={reply}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.author.avatar_url} />}
            title={titleArea(item)}
            description={item.content}
          />
        </List.Item>
      )}
    />
  )
}


Reply.propTypes = {
  reply: PropTypes.array.isRequired,
}


export default Reply
