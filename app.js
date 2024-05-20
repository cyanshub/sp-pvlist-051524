// 載入環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const handlebars = require('express-handlebars')

const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport.js')
const { getUser } = require('./helpers/auth-helpers.js')

const routes = require('./routes')
const handlebarsHelpers = require('./helpers/handlebars-helpers.js')

const app = express()
const port = process.env.PORT || 3000

// 註冊與設定使用 handlebars 樣板引擎
app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')

// 設計 middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // 啟用 req.body

// middleware: 啟用 Flash Message
app.use(flash())
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))

// middleware: 設定 passport
app.use(passport.initialize()) // 令 passport 初始化
app.use(passport.session()) // 啟動 passport 的 session 功能; 必須放在原本的session之後

// middleware: 設定所有路由都會經過的 middleware
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = getUser(req)
  next()
})

app.use(routes)

app.listen(port, () => {
  console.info(`Pvlist application listening on port: http://localhost:${port}`)
})
