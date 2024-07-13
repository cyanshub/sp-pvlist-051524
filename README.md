# Pvlist
![導覽圖片](public/readme/introduce.png)

## 介紹
+ 這是一個查詢已登記再生能源憑證的太陽光電案場的網站
+ 使用者可查看不同案場的再生能源憑證數量
+ 也可以收藏熱門案場或追蹤其他活躍的使用者
+ 本專案亦具備 web API 的形式, 經取得 token 後可進行操作

### 功能
+ 具有使用者驗證管理系統, 實作登入、登出功能
+ 為簡化註冊流程, 提升安全性, 亦提供 Google、Facebook 等第三方 OAuth 登入功能
+ 可針對太陽光電案場資料, 進行建立、查看、編輯、刪除等資料操作
+ 提供搜尋功能、動態頁碼、案場收藏功能、使用者追蹤功能、案場評論功能、分類功能
+ 可上傳圖片, 包括使用者頭像、案場封面照片

### 頁面介紹
+ **首頁:** 可以瀏覽所有登錄在本網站的太陽光電案場、收藏案場或移除收藏
+ **單一案場頁面:** 包括案場基本資訊、所有評論, 並可留下評論; 可進一步點選 dashboard, 查看有關案場的統計資訊
+ **個人頁面:** 可查看個人基本資訊、評論過的案場、訂閱使用者、粉絲帳戶; 可進一步修改使用者資訊(含移除頭像)
+ **最新動態頁面:** 顯示最新的10筆案場與評論
+ **收藏案場頁面:** 顯示使用者收藏的全部案場
+ **人氣案場頁面:** 分別依收藏數及留言數顯示前10名案場
+ **綠電憑證先鋒頁面:** 分別依慮電憑證累積總量、交易總量、庫存總量顯示前10名案場
+ **光電達人頁面:** 依追蹤人數由高至低顯示本站使用者, 並可追蹤使用者
+ **具 Admin 權限者:** 可從後台頁面管理所有案場、使用者、案場類別



## 開始使用
+ 請在本機安裝 Node.js 與 npm 套件管理系統
+ 本專案採用 Node.js v14.16.0 進行開發, 請確認版本的一致性
+ 複製專案到本機: Bash 指令 git clone https://github.com/your-username/sp-pvlist-051524.git
+ 進入專案資料夾: Bash 指令 cd sp-pvlist-051524
+ 安裝套件: Bash 指令 npm install
+ 確認套件齊全(可參考下方開發工具)
+ 建立.env檔案並填入相關資料(可參考.env example檔案)
+ 設定MySQL資料庫: username、password、database 與專案 config/config.json 中的 development 相同
+ 建立資料庫資料表: Bash 指令 npx sequelize db:migrate
+ 建立種子資料: Bash 指令 npx sequelize db:seed:all
+ 啟動專案: Bash 指令 npm run start; 或使用 nodemon 進行開發, Bash 指令 npm run dev
+ 看到以下訊息，可至瀏覽器輸入下列網址開啟 Pvlist application listening on port: http://localhost:3001


## Web APIs 路由設計
本專案同時以 Web APIs 提供服務, 依循 RESTful API 理念設計路由。 將 email、password 發送到本站的 signin 路由, 即可得到 Auth Type 為 Bearer Token 的憑證, 夾帶憑證即可使用本站 Web APIs, 路由對應功能簡述如下

### 與 User 有關的路由
+ POST /api/signup 註冊
+ POST /api/signin 登入
+ POST /api/favorite/:fieldId 收藏指定案場
+ DEL /api/favorite/:fieldId 移除收藏指定案場
+ GET /api/users/top 瀏覽複數使用者之追蹤數較高者頁面
+ POST /api/following/:userId 追蹤指定使用者
+ DEL /api/following/:userId 移除追蹤指定使用者
+ GET /api/users/:id 瀏覽指定使用者頁面
+ GET /api/users/:id/edit 瀏覽指定使用者編輯頁面
+ PUT /api/users/:id 編輯指定使用者
+ PUT /api/avatars/:userId 移除指定使用者頭像

### 與 Field 有關的路由
+ GET /api/fields 瀏覽複數案場頁面
+ GET /api/fields/feeds 瀏覽複數案場之最新動態頁面(最新案場、最新評論各10筆)
+ GET /api/fields/favorites 瀏覽複數案場之使用者收藏頁面
+ GET /api/fields/top 瀏覽複數案場之人氣前10名頁面(分別依收藏數、評論數各10筆)
+ GET /api/fields/trecs 瀏覽複數案場之憑證前10名頁面(分別依累積量、交易量、庫存量各10筆)
+ GET /api/fields/:id 瀏覽指定案場頁面
+ GET /api/fields/:id/dashboard 瀏覽指定案場之儀表板頁面


### 與 Comment 有關的路由
+ POST /api/comments 新增評論
+ DEL  /api/comments/:id 移除指定評論

### 與 Admin 有關的路由
+ GET /api/admin/fields 在後台瀏覽複數案場頁面
+ POST /api/admin/fields 在後台新增案場
+ GET /api/admin/fields/:id 在後台瀏覽指定案場頁面
+ PUT /api/admin/fields/:id 在後台編輯指定案場
+ DEL /api/admin/fields/:id 在後台移除指定案場
+ GET /api/admin/users 在後台瀏覽複數使用者頁面
+ PATCH /api/admin/users 在後台修改使定使用者
+ GET /api/admin/categories 在後台瀏覽複數類別頁面
+ POST /api/admin/categories 在後台新增類別
+ PUT /api/admin/categories/:id 在後台編輯指定類別
+ DEL /api/admin/categories/:id 在後台移除指定類別


## 主要技術
- [Nodemailer](https://nodemailer.com/)
- [Facebook OAuth 2.0](https://developers.facebook.com/)
- [Google OAuth 2.0](https://developers.google.com/?hl=zh-tw)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Handlebars](https://handlebarsjs.com/)
- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/)



## 開發工具
+ axios: 1.7.2
+ bcryptjs: 2.4.3
+ connect-flash: 0.1.1
+ dayjs: 1.10.6
+ dotenv: 10.0.0
+ express: 4.17.1
+ express-handlebars: 5.3.3
+ express-session: 1.17.2
+ faker: 5.5.3
+ jsonwebtoken: 8.5.1
+ method-override: 3.0.0
+ multer: 1.4.3
+ mysql2: 2.3.0
+ passport: 0.4.1
+ passport-facebook: 3.0.0
+ passport-google-oauth20: 2.0.0
+ passport-jwt: 4.0.0
+ passport-local: 1.0.0
+ sequelize: 6.6.5
+ sequelize-cli: 6.2.0