const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      // user为实例，化成他的json格式
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      // 如果有人注册了就catch到error
      res.status(400).send({
        error: 'this email has been used'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The login information is not correct.'
        })
      }

      const isPasswordValid = user.comparePassword(password)

      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'T1he login information is not correct.'
        })
      }

      const userJson = user.toJSON()
      // user为实例，化成他的json格式
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      // 如果有其他服务器错误
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}
