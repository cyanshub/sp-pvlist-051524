const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userController = {
  signUpPage: (req, res, next) => {
    return res.render('signup')
  },
  signUp: (req, res, next) => {
    const { name, email, password } = req.body
    const Salt = 10
    return bcrypt.hash(password, Salt)
      .then(hash => {
        User.create({
          name,
          email,
          password: hash,
          is_admin: false
        })
      })
      .then(() => res.redirect('/signin'))
      .catch(err => next(err))
  }
}
module.exports = userController
