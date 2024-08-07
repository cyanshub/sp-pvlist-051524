// 抽取共用 services 層
const userServices = require('../../services/user-services')

// 載入所需工具
const jwt = require('jsonwebtoken')

const userController = {
  signUp: (req, res, next) => {
    return userServices.signUp(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  signIn: (req, res, next) => {
    // 利用 try catch 處理不是非同步語法的錯誤事件
    try {
      // 因為關閉了session功能, 因此要自己整理 user 的 sequelize 打包物件
      const userData = req.user.toJSON()

      // 不應該拿 user 的 password, 可使用 delete 方法把敏感資料拿掉
      delete userData.password

      // 利用 jwt 來發 token
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      return res.json({
        status: 'success',
        data: {
          token,
          user: userData
        }
      })
    } catch (err) {
      next(err)
    }
  },

  addFavorite: (req, res, next) => {
    return userServices.addFavorite(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  removeFavorite: (req, res, next) => {
    userServices.removeFavorite(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  getTopUsers: (req, res, next) => {
    return userServices.getTopUsers(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  addFollowing: (req, res, next) => {
    return userServices.addFollowing(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  removeFollowing: (req, res, next) => {
    return userServices.removeFollowing(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  getUser: (req, res, next) => {
    return userServices.getUser(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  editUser: (req, res, next) => {
    return userServices.editUser(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  putUser: (req, res, next) => {
    return userServices.putUser(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  putAvatar: (req, res, next) => {
    return userServices.putAvatar(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = userController
