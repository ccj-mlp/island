const Router = require('koa-router')
const {
  success
} = require('../../lib/helper')
const {
  TokenValidator
} = require('../../validators/validator')
const {
  LoginType
} = require('../../lib/enum')
const {
  User
} = require('../../model/user')

const router = new Router({
  prefix: '/v1/token'
})

router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx)
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case LoginType.USER_MINI_PROGRAM:
      break
    case LoginType.ADMIN_EMAIL:
      break
    default:
      throw new global.errs.ParameterException('没有相应的处理函数')
  }
})

const emailLogin = async (account, secret) => {
  const user = await User.verifyEmailPassword(account, secret)
}

module.exports = router