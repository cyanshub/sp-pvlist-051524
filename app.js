const express = require('express')
const handlebars = require('express-handlebars')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3000

// 註冊與設定使用 handlebars 樣板引擎
app.engine('hbs', handlebars({ extname: '.hbs' }))
app.set('view engine', 'hbs')

// 設計 middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // 啟用 req.body
app.use(routes)

app.listen(port, () => {
  console.info(`Pvlist application listening on port: http://localhost:${port}`)
})
