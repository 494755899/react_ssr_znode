const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'http://127.0.0.1:8000'

router.post('/login', function (req, res, next) {
  console.log(req.body.userName)
  axios.post(`${baseUrl}/users/signIn`, {}, {userName: req.body.userName})
    .then(resp => {
      if (resp.status === 200 && resp.data.success) {
        req.session.user = {
          accessToken: req.body.accessToken,
          loginname: resp.data.loginname,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url
        }
        res.json({
          success: true,
          data: resp.data
        })
      } else {
        res.json({
          success: false,
          data: resp.data
        })
      }
    })
    .catch(err => {
      if (err.response) {
        res.json({
          success: false,
          data: err.response.data
        })
      } else {
        next(err)
      }
    })
})

module.exports = router
