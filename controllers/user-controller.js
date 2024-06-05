// 載入所需 npm 套件
const bcrypt = require('bcryptjs')

// 載入所需 model
const { User, Field, Favorite } = require('../models')

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
          isAdmin: false
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
    const userId = req.user.id
    const fieldId = req.params.fieldId
    return Promise.all([
      Field.findByPk(fieldId, {
      // 取出關聯 model, 更新收藏數
        include: [{ model: User, as: 'FavoritedUsers', attributes: { exclude: ['password'] } }]
      }),
      Favorite.findOne({
        where: {
          userId,
          fieldId
        }
      })
    ])
      .then(([field, favorite]) => {
        if (!field) throw new Error('該案場不存在!')
        if (favorite) throw new Error('已收藏過此案場!') // 檢查若能在join table 找到對應關係代表已經收藏過
        field.update({
        // 新增收藏時, 追蹤數 + 1
          favoriteCounts: field.FavoritedUsers.length + 1
        })
        return Favorite.create({
          userId,
          fieldId
        })
      })
      .then(newFavrite => {
        res.redirect('back')
        return { favorite: newFavrite }
      })
      .catch(err => next(err))
  },
  removeFavorite: (req, res, next) => {
    const userId = req.user.id
    const fieldId = req.params.fieldId
    return Promise.all([
      Field.findByPk(fieldId, {
      // 取出關聯 model, 更新收藏數
        include: [{ model: User, as: 'FavoritedUsers', attributes: { exclude: ['password'] } }]
      }),
      Favorite.findOne({
        where: {
          userId,
          fieldId
        }
      })
    ])
      .then(([field, favorite]) => {
        if (!field) throw new Error('該案場不存在!')
        if (!favorite) throw new Error('並未收藏此案場!')
        field.update({
        // 移除收藏時, 追蹤數 - 1
          favoriteCounts: field.FavoritedUsers.length < 1 ? 0 : field.FavoritedUsers.length - 1 // 防護機制
        })
        return favorite.destroy()
      })
      .then(deletedFavorite => {
        res.redirect('back')
        return { favorite: deletedFavorite }
      })
      .catch(err => next(err))
  }
}
module.exports = userController
