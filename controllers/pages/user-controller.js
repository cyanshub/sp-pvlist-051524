// 抽取共用的 services 層
const userServices = require('../../services/user-services')

const userController = {
  signUpPage: (req, res, next) => {
    return res.render('signup')
  },
  signUp: (req, res, next) => {
    return userServices.signUp(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '成功註冊帳號!')
      return res.redirect('/signin')
    })
  },
  signInPage: (req, res, next) => {
    return res.render('signin')
  },
  signIn: (req, res, next) => {
    req.flash('success_messages', '登入成功!')
    res.redirect('/fields')
  },
  logOut: (req, res, next) => {
    req.flash('success_messages', '登出成功!')
    req.logout()
    res.redirect('/signin')
  },
  addFavorite: (req, res, next) => {
    return userServices.addFavorite(req, (err, data) => {
      if (err) return next(err)
      req.session.addedData = data
      return res.redirect('back')
    })
  },
  removeFavorite: (req, res, next) => {
    return userServices.removeFavorite(req, (err, data) => {
      if (err) return next(err)
      req.session.removedData = data
      return res.redirect('back')
    })
  },
  getTopUsers: (req, res, next) => {
    return userServices.getTopUsers(req, (err, data) => err ? next(err) : res.render('top-users', data)
    )
  },
  addFollowing: (req, res, next) => {
    return userServices.addFollowing(req, (err, data) => {
      if (err) return next(err)
      req.session.addData = data
      return res.redirect('back')
    })
  },
  removeFollowing: (req, res, next) => {
    return userServices.removeFollowing(req, (err, data) => {
      if (err) return next(err)
      req.session.removedData = data
      return res.redirect('back')
    })
  },
  getUser: (req, res, next) => {
    return userServices.getUser(req, (err, data) => err ? next(err) : res.render('profile', data))
  },
  editUser: (req, res, next) => {
    return userServices.editUser(req, (err, data) => err ? next(err) : res.render('edit-user', data))
  },
  putUser: (req, res, next) => {
    return userServices.putUser(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '已變更成功!')
      req.session.editedData = data
      res.redirect(`/users/${data.user.id}`)
    })
  },
  putAvatar: (req, res, next) => {
    return userServices.putAvatar(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '成功移除頭像!')
      req.session.editedData = data
      return res.redirect('back')
    })
  }
}
module.exports = userController
