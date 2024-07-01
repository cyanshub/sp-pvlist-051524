# PVList
- PVList 是一個用於查詢已登記再生能源憑證的太陽光電案場的網站, 使用者可查看不同案場的再生能源憑證數量, 也可以收藏熱門案場或追蹤其他活躍的使用者。

- 本專案旨在練習 Sequelize 資料庫的基本操作（Create、Read、Update、Delete）, 以及實作使用者登入與驗證機制。本專案以MVC架構的模式整理程式碼, 將路由包裝進routes資料夾, 並由每條路由呼叫對應的controller。另外，本專案同時存在 web API的形式, 作為後端開發的練習, 以 passport-jwt 執行本地登入策略, 以 jsonwebtoken 簽發使用者驗證憑證。

## 專案描述
此專案包含以下功能：
- 創建、讀取、更新和刪除太陽光電案場資料
- 使用者登入與驗證
- 基於 Sequelize 的資料庫操作
- 使用 Handlebars 作為模板引擎
- 實作動態式頁碼器

## 目錄結構
```markdown
.
├── app.js
├── config
├── controllers
├── models
├── public
├── routes
├── seeders
├── tests
├── views
└── README.md
```

## 安裝
1. 確保已安裝 Node.js（版本 ^14.x）。
2. 克隆此專案到本地端：
   ```sh
   git clone https://github.com/your-username/pvlist.git

3. 進入專案目錄並安裝相依套件：
   ```sh
   cd pvlist
   npm install

4. 配置環境變數：在專案根目錄建立 .env 文件, 並設置必要的環境變數, 例如：
   - DB_HOST=localhost
   - DB_USER=root
   - DB_PASS=password
   - DB_NAME=pvlist
   - SESSION_SECRET=your_secret_key

## 主要相依套件
- **express: ^4.17.1**
  : 快速、輕量級的 Node.js 網絡應用框架, 提供強大的功能來建立各種 Web 和移動應用程式。

- **sequelize: ^6.6.5**
  : 基於 Promise 的 Node.js ORM（物件關聯映射）, 支援多種資料庫, 如 MySQL、PostgreSQL、SQLite 和 MSSQL。

- **mysql2: ^2.3.0**
  : 高效的 MySQL 客戶端, 支援 Node.js, 提供更快的查詢執行和更好的性能。

- **bcryptjs: ^2.4.3**
  : 基於 JavaScript 的密碼散列函式, 主要用於加密和驗證使用者密碼。

- **passport: ^0.4.1**
  :  Node.js 認證中介軟體, 用於處理使用者身份驗證, 支援多種驗證策略。

- **jsonwebtoken: ^8.5.1**
  : 用於生成和驗證 JSON Web Tokens (JWT), 常用於 API 認證和授權。

- **dotenv: ^10.0.0**
  : 零依賴的模組, 能將環境變數從 `.env` 文件載入 `process.env` 中, 方便配置應用程式的設定。

- **mocha: ^9.1.1**
  : 功能強大且靈活的 JavaScript 測試框架, 支援瀏覽器和 Node.js 環境。

- **chai: ^4.3.4**
  : 與 Mocha 一起使用的斷言庫, 提供多種斷言風格（如 BDD 和 TDD）, 使測試更具可讀性。

## 開發工具
- **nodemon: ^2.0.12**  : 用於開發 Node.js 應用程式的工具, 能在檔案變更時自動重新啟動伺服器, 提升開發效率。

- **eslint: ^7.32.0**  :  JavaScript 靜態程式碼分析工具, 用於檢查程式碼中的問題, 並提供修復建議, 確保程式碼品質。

- **sequelize-mock: ^0.10.2**  : 用於模擬 Sequelize 模型和方法的測試工具, 使得在單元測試中不依賴真實資料庫。

- **sinon: ^11.1.2**  : 提供獨立的測試替身（stubs）、模擬（mocks）和間諜（spies）功能, 用於驗證程式碼行為的測試工具。

- **supertest: ^6.1.6**  : 超級代理（super-agent）驅動的函式庫, 用於測試 Node.js HTTP 伺服器, 提供高階的 HTTP 斷言功能。

- **passport-jwt: ^4.0.0**  : 一個 Passport.js 的策略 (strategy)，用於基於 JWT 進行身份驗證。Passport 是一個在 Node.js 中用於認證的中間件，支持多種認證策略。。

- **jsonwebtoken: ^8.5.1**  : 用來生成、簽發和驗證 JSON Web Token 的套件。JWT 是一種緊湊且獨立的方式，用於在各方之間作為 JSON 對象安全地傳輸信息。
