import {
  observable,
  action,
  toJS,
} from 'mobx'
import { post, get } from '../util/http'

export default class AppState {
  @observable isLogin
  @observable info
  @observable recentReplies
  @observable recentTopics
  @observable collections
  constructor(
    { isLogin = false, info = {}, recentTopics = [], recentReplies = [], collections = [] } = {}) {
    this.isLogin = isLogin
    this.info = info
    this.recentReplies = recentReplies
    this.recentTopics = recentTopics
    this.collections = collections
  }

  @action login(userName, passWord) {
    return new Promise((resolve, reject) => {
      post('users/signIn', {}, {
        userName,
        passWord,
      }).then((resp) => {
        if (resp.success) {
          this.info = resp.data
          this.isLogin = true
          resolve(resp)
        } else {
          reject()
        }
      }).catch((error) => {
        if (error) {
          resolve(error)
        }
      })
    })
  }

  @action getUserDetail() {
    return new Promise((resolve, reject) => {
      get(`/user/${this.info.loginname}`).then((resp) => {
        if (resp.success) {
          this.recentTopics = resp.data.recent_topics
          this.recentReplies = resp.data.recent_replies
          resolve()
        } else {
          reject()
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }

  @action getUserCollection() {
    return new Promise((resolve, reject) => {
      get(`/topic_collect/${this.info.loginname}`).then((resp) => {
        if (resp.success) {
          this.collections = resp.data
          resolve()
        } else {
          reject()
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }

  toJson() {
    return {
      isLogin: this.isLogin,
      info: toJS(this.info),
      recentTopics: toJS(this.recentTopics),
      recentReplies: toJS(this.recentReplies),
      collections: toJS(this.collections),
    }
  }
}

