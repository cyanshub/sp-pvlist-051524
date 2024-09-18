// 載入環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 載入所需工具
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')

const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport.js')
const { getUser } = require('./helpers/auth-helpers.js')

const { pages, apis } = require('./routes')
const handlebarsHelpers = require('./helpers/handlebars-helpers.js')
const scheduleKeepAliveReq = require('./helpers/req-helpers.js')

const app = express()
const port = process.env.PORT || 3001

// 註冊與設定使用 handlebars 樣板引擎
app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')

// 設計 middleware
app.use(express.static('public'))
app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.use(express.urlencoded({ extended: true })) // 啟用 req.body
app.use(methodOverride('_method')) // 遵循RESTful 精神撰寫路由
app.use(express.json()) // 撰寫 API 測試時, 使可識別 json 資料

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
  res.locals.userAuth = getUser(req)
  next()
})

// middleware: 路由匯整器
app.use('/api', apis)
app.use(pages)

// 掛載執行處理程序
scheduleKeepAliveReq() // 定時發送請求以維持入站流量

app.listen(port, () => {
  console.info(`Pvlist application listening on port: http://localhost:${port}`)
})
