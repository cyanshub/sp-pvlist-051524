const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt') // api 專用
const JWTStrategy = passportJWT.Strategy // api 專用
const ExtractJWT = passportJWT.ExtractJwt // api 專用
const bcrypt = require('bcryptjs')

// 載入 model
const { User, Field } = require('../models')

// 共用變數: 帶出登入使用者的關聯資料
const includeClause = [
  { // 收藏的案場
    model: Field,
    as: 'FavoritedFields',
    order: [['createdAt', 'DESC']] // 指定按照 createdAt 字段降序排序
  },
  { // 撈出追蹤自己的人
    model: User,
    as: 'Followers',
    order: [['createdAt', 'DESC']], // 指定按照 createdAt 字段降序排序
    attributes: { exclude: ['password'] } // 避免密碼外洩
  },
  { // 撈出自己追蹤的人
    model: User,
    as: 'Followings',
    order: [['createdAt', 'DESC']], // 指定按照 createdAt 字段降序排序
    attributes: { exclude: ['password'] } // 避免密碼外洩
  }]

// 設置本地的登入策略 Set up passport strategy
passport.use(new LocalStrategy({
  usernameField: 'email', // 加入客製化參數 customize user field, 預設是 username
  passwordField: 'password',
  passReqToCallback: true // 要求把 req 傳給 callback
},
// 驗證使用者 Authenticate user
(req, email, password, cb) => {
  User.findOne({ where: { email } })
    .then(user => {
      // 先驗證帳號是否輸入正確: 若否則回傳 cb(null, false, ...)
      if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤!'))

      // 驗證密碼是否正確輸入: 若否則回傳 cb(null, false, ...)
      return bcrypt.compare(password, user.password).then(res => {
        if (!res) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤!'))
        // 當帳號存在, 且密碼一致才可回傳登入成功
        return cb(null, user)
      })
    })
}))

// 在 passport 設定序列化
passport.serializeUser((user, cb) => cb(null, user.id))

// 在 passport 設定反序列化
passport.deserializeUser((id, cb) => {
  User.findByPk(id, {
    // 關聯 User Model 的多對多關係 Model, 並寫上多對多關係的名稱(對應model設定的名稱)
    attributes: { exclude: ['password'] }, // 避免密碼外洩
    include: includeClause
  })
    .then(user => cb(null, user.toJSON()))
    .catch(err => cb(err))
})

// 設計 jwt 的登入策略的 options
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

// 設置 jwt 登入策略
passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
  User.findByPk(jwtPayload.id, {
    attributes: { exclude: ['password'] }, // 避免密碼外洩
    include: includeClause
  })
    .then(user => cb(null, user))
    .catch(err => cb(err))
}))

module.exports = passport
