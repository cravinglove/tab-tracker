const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        // 密码8到32位，并且限定大小写字母数字
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'YOU MUST PROVIDE A VALID EMAIL ADDRESS'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'YOU MUST PROVIDE A VALID PASSWORD'
          })
          break
        default:
          res.status(400).send({
            error: 'INVALID INFORMATION'
          })
      }
    } else {
      next()
    }
  }
}
