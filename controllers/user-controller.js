const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userController = {
  signUpPage: (req, res, next) => {
    return res.render('signup')
  },
  signUp: (req, res, next) => {
    const { name, email, password, passwordCheck } = req.body
    const Salt = 10
    if (password !== passwordCheck) throw new Error('請再次確認密碼是否輸入正確')
    return User.findOne({ where: { email } })
      .then(user => {
        if (user) throw new Error('使用者信箱已經存在')
        return bcrypt.hash(password, Salt)
      })
      .then(hash => {
        User.create({
          name,
          email,
          password: hash,
          is_admin: false
        })
      })
      .then(() => {
        req.flash('success_messages', '成功註冊帳號!')
        return res.redirect('/signin')
      })
      .catch(err => next(err))
  },
  signInPage: (req, res, next) => {
    return res.render('signin')
  }
}
module.exports = userController
