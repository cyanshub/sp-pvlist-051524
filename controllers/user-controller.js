// 載入所需 npm 套件
const bcrypt = require('bcryptjs')

// 載入所需 model
const { User, Field, Favorite, Followship } = require('../models')

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
  },
  getTopUsers: (req, res, next) => {
    const limit = 10 // 只取出5名用戶
    return User.findAll({
      limit,
      attributes: { exclude: ['password'] }, // 避免密碼外洩
      order: [['followerCounts', 'DESC'], ['id', 'ASC']], // 依追蹤數排序
      include: [{ model: User, as: 'Followers', attributes: { exclude: ['password'] } }] // 取出追蹤此user的人
    })
      .then(users => {
        const result = users
          .map(user => ({ // 傳入的 map 函式記得用小括號包住
            ...user.toJSON(), // 使用展開運算子倒入 map 函式傳入的 user 屬性
            isFollowed: req.user.Followings.some(f => f.id === user.id)
            // 判斷目前登入的使用者帳戶的追蹤者名單是否包含傳入的使用者
          }))
        return res.render('top-users', { users: result })
      })
      .catch(err => next(err))
  },
  addFollowing: (req, res, next) => {
    const followingId = req.params.userId
    const followerId = req.user.id
    return Promise.all([
      User.findByPk(followingId),
      Followship.findOne({
        where: {
          followingId,
          followerId
        }
      })
    ])
      .then(([user, followship]) => {
        if (!user) throw new Error('要追蹤的使用者不存在!')
        if (followship) throw new Error('已追蹤過該名使用者!')
        user.update({
          // 新增收藏時, 追蹤數 + 1
          followerCounts: user.followerCounts + 1
        })
        return Followship.create({ followingId, followerId })
      })
      .then(newFollowShip => {
        res.redirect('back')
        return { followship: newFollowShip }
      })
      .catch(err => next(err))
  },
  removeFollowing: (req, res, next) => {
    const followingId = req.params.userId
    const followerId = req.user.id
    return Promise.all([
      User.findByPk(followingId),
      Followship.findOne({
        where: {
          followingId,
          followerId
        }
      })
    ])
      .then(([user, followship]) => {
        if (!user) throw new Error('要追蹤的使用者不存在!')
        if (!followship) throw new Error('尚未追蹤過該名使用者!')
        user.update({
          // 新增收藏時, 追蹤數 + 1
          followerCounts: user.followerCounts < 1 ? user.followerCounts = 0 : user.followerCounts - 1
        })
        return followship.destroy()
      })
      .then(deletedFollowship => {
        res.redirect('back')
        return { followship: deletedFollowship }
      })
      .catch(err => next(err))
  }
}
module.exports = userController
