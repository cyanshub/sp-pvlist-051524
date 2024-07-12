// 載入所需 npm 套件
const bcrypt = require('bcryptjs')

// 載入所需 model
const { User, Field, Favorite, Followship, Comment } = require('../models')

// 載入所需工具
const { localAvatarHandler } = require('../helpers/file-helpers')
const { filterUnique } = require('../helpers/array-helpers')

const userController = {
  signUpPage: (req, cb) => {
    return cb(null)
  },
  signUp: (req, cb) => {
    const { name, email, password, passwordCheck } = req.body
    const Salt = 10
    if (password !== passwordCheck) throw new Error('請再次確認密碼是否輸入正確')
    return User.findOne({ where: { email } })
      .then(user => {
        if (user) throw new Error('使用者信箱已經存在')
        return bcrypt.hash(password, Salt)
      })
      .then(hash => {
        return User.create({
          name,
          email,
          password: hash,
          isAdmin: false
        })
      })
      .then(newUser => cb(null, { user: newUser }))
      .catch(err => cb(err))
  },
  signInPage: (req, cb) => {
    return cb(null)
  },
  signIn: (req, cb) => {
    return cb(null)
  },
  logOut: (req, cb) => {
    return cb(null)
  },
  facebookSignInPage: (req, cb) => {
    return cb(null)
  },
  facebookSignIn: (req, cb) => {
    return cb(null)
  },
  googleSignInPage: (req, cb) => {
    return cb(null)
  },
  googleSignIn: (req, cb) => {
    return cb(null)
  },
  addFavorite: (req, cb) => {
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
      .then(newFavrite => cb(null, { favorite: newFavrite }))
      .catch(err => cb(err))
  },
  removeFavorite: (req, cb) => {
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
      .then(deletedFavorite => cb(null, { favorite: deletedFavorite }))
      .catch(err => cb(err))
  },
  getTopUsers: (req, cb) => {
    const userAuthId = req.user.id
    const limit = 10 // 只取出5名用戶
    return Promise.all([
      User.findAll({
        limit,
        attributes: { exclude: ['password'] }, // 避免密碼外洩
        order: [['followerCounts', 'DESC'], ['id', 'ASC']], // 依追蹤數排序
        include: [{ model: User, as: 'Followers', attributes: { exclude: ['password'] } }] // 取出追蹤此user的人
      }),
      User.findByPk(userAuthId, {
        include: [
          // 撈出自己追蹤的人
          {
            model: User,
            as: 'Followings',
            order: [['createdAt', 'DESC']], // 指定按照 createdAt 字段降序排序
            attributes: { exclude: ['password'] } // 避免密碼外洩
          }
        ]
      })
    ])
      .then(([users, userAuth]) => {
        userAuth = userAuth.toJSON()
        const result = users
          .map(user => ({ // 傳入的 map 函式記得用小括號包住
            ...user.toJSON(), // 使用展開運算子倒入 map 函式傳入的 user 屬性
            isFollowed: userAuth.Followings.some(f => f.id === user.id)
            // 判斷目前登入的使用者帳戶的追蹤者名單是否包含傳入的使用者
          }))
        return cb(null, { users: result })
      })
      .catch(err => cb(err))
  },
  addFollowing: (req, cb) => {
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
      .then(newFollowShip => cb(null, { followship: newFollowShip }))
      .catch(err => cb(err))
  },
  removeFollowing: (req, cb) => {
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
      .then(deletedFollowship => cb(null, { followship: deletedFollowship }))
      .catch(err => cb(err))
  },
  getUser: (req, cb) => {
    const userAuthId = req.user.id
    return Promise.all([
      User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
        include: [
          { model: Comment, include: [Field] },
          { model: User, as: 'Followings', attributes: { exclude: ['password'] } }, // 訂閱別人
          { model: User, as: 'Followers', attributes: { exclude: ['password'] } } // 粉絲
        ]
      }),
      User.findByPk(userAuthId, {
        include: [
          // 撈出自己追蹤的人
          {
            model: User,
            as: 'Followings',
            order: [['createdAt', 'DESC']], // 指定按照 createdAt 字段降序排序
            attributes: { exclude: ['password'] } // 避免密碼外洩
          }
        ]
      })
    ])

      .then(([user, userAuth]) => {
        userAuth = userAuth.toJSON()
        if (!user) throw new Error('使用者不存在!')

        // 確認收藏數更新到正確數字
        user.update({
          followerCounts: user.Followers.length
        })

        console.log('追蹤自己的人數:', user.Followers.length, '人')

        // 整理 user 資料
        user = user.toJSON()

        // 判斷頁面的人是否自己追蹤過
        user.isFollowed = userAuth.Followings.some(f => f.id === user.id)

        // 使用重複值過濾演算法: 過濾掉重複的 comment.Field.id
        user.Comments = filterUnique(user.Comments, ['Field', 'id'])

        return cb(null, { user })
      })
      .catch(err => cb(err))
  },
  editUser: (req, cb) => {
    return User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      raw: true
    })
      .then(user => {
        if (!user) throw new Error('使用者不存在!')
        return cb(null, { user })
      })
      .catch(err => cb(err))
  },
  putUser: (req, cb) => {
    // 使用者只能編輯自己的資料: 比對傳入的id 與 passport的id
    if (Number(req.params.id) !== req.user.id) throw new Error('只能編輯自己的使用者資料!')
    const { name } = req.body
    if (!name.trim()) throw new Error('需要輸入使用者名稱!')
    const file = req.file // 根據之前修正的form content, 把檔案從req取出來
    return Promise.all([
      User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
      }),
      localAvatarHandler(file) // 將圖案寫入指定資料夾, 並回傳圖檔路徑
    ])
      .then(([user, filePath]) => {
        // 檢查使用者是否存在
        if (!user) throw new Error('使用者不存在!')
        return user.update({
          name,
          avatar: filePath || user.avatar
        })
      })
      .then(updatedUser => cb(null, { user: updatedUser }))
      .catch(err => cb(err))
  },
  putAvatar: (req, cb) => {
    const userId = req.params.userId
    return User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    })
      .then(user => {
        if (!user) throw new Error('使用者不存在!')
        return user.update({
          avatar: null
        })
      })
      .then(updatedUser => cb(null, { user: updatedUser }))
      .catch(err => cb(err))
  }
}
module.exports = userController
