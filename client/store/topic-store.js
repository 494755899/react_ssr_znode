import {
  observable,
  action,
  computed,
  toJS,
  extendObservable,
} from 'mobx'

import { topicSchema, replySchema } from '../util/variable-defined'
import { get, post } from '../util/http'

const createTopic = (topic) => {
  return Object.assign({}, topicSchema, topic)
}
const createReply = (reply) => {
  return Object.assign({}, replySchema, reply)
}
class Topic {
  constructor(data) {
    extendObservable(this, data)
  }
  @observable syncing = false
  @observable createdReplies = []
  @action doReply(content) {
    return new Promise((resolve, reject) => {
      post(`/topic/${this.id}/replies`, {
        needAccessToken: true,
        age: false,
      }, { content })
        .then((result) => {
          if (result.success) {
            this.createdReplies.push(createReply({
              id: result.reply_id,
              content,
              created_at: Date.now(),
            }))
            resolve()
          } else {
            reject(result)
          }
        }).catch(reject)
    })
  }
}

class TopicStore {
  @observable topics
  @observable syncing
  @observable details
  @observable tab
  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail
      return result
    }, {})
  }

  constructor({ syncing = false, topics = [], tab = null, details = [] } = {}) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(detail => new Topic(createTopic(detail)))
    this.tab = tab
    this.createdTopics = []
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @action fetchTopics(tab) {
    if (this.tab === tab && this.topics.length > 0) {
      return
    }
    this.tab = tab
    this.syncing = true
    this.topics = []
    return new Promise((resolve, reject) => {
      get('/topics', {
        mdrender: false,
        tab,
      }).then((result) => {
        if (result.success) {
          this.topics = result.data.map((topic) => {
            return new Topic(createTopic(topic))
          })
          resolve()
        } else {
          reject()
        }
        this.syncing = false
      }).catch((err) => {
        reject(err)
        this.syncing = false
      })
    })
  }

  @action getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      if (this.detailMap[id]) {
        resolve(this.detailMap[id])
      } else {
        get(`/topic/${id}`, {
          mdrender: false,
        }).then((resp) => {
          if (resp.success) {
            const topic = new Topic(createTopic(resp.data))
            this.details.push(topic)
            resolve(topic)
          } else {
            reject()
          }
        }).catch(reject)
      }
    })
  }

  // needAccessToken: true 后面要加
  @action createNewTopic(title, tab, content) {
    return new Promise((resolve, reject) => {
      post('topics/createTopic', { }, { title, tab, content }).then((result) => {
        if (result.success) {
          const topic = new Topic(createTopic({
            title,
            tab,
            content,
            id: result.topic_id,
            created_at: Date.now(),
          }))
          this.createdTopics.push(topic)
          resolve()
        } else {
          reject()
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }

  toJson() {
    return {
      topics: toJS(this.topics),
      syncing: this.syncing,
      tab: this.tab,
      details: toJS(this.details),
    }
  }
}

export default TopicStore
