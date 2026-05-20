# 部署指南：把網站搬上 Netlify + 啟用後台

照著做完，您就會擁有：
- 一個公開網址（`你的名稱.netlify.app`）
- 一個後台網址（`你的名稱.netlify.app/admin`）可以用滑鼠編輯所有文字、上傳圖片與 PDF
- 每次後台按「發布」，網站約 1-2 分鐘後自動更新

---

## Step 1：把資料夾推到 GitHub

### 1-1. 安裝 GitHub Desktop
1. 開 https://desktop.github.com 下載並安裝
2. 第一次開啟會要您用 GitHub 帳號登入，照做即可

### 1-2. 建立新的 Repo
1. GitHub Desktop 左上角 `File` → `New repository...`
2. 填寫：
   - **Name**: `designer-portfolio`（或任何您喜歡的英文名）
   - **Local Path**: 選 `C:\Users\231489`（注意不要進到 `作品集網站` 裡，選它的「上一層」）
   - **Initialize this repository with a README**: ❌ 不要勾
3. 按 `Create repository`
4. 它會在 `C:\Users\231489\designer-portfolio` 建立空的 Repo

### 1-3. 把作品集網站搬進 Repo
1. 開檔案總管，把 `C:\Users\231489\作品集網站` 裡的**所有檔案**（不是資料夾本身）剪下
2. 貼到 `C:\Users\231489\designer-portfolio` 裡
3. 回到 GitHub Desktop，左側會看到所有檔案的變更清單
4. 左下角填寫：
   - **Summary**: `Initial commit`
5. 按 `Commit to main`
6. 上方 `Publish repository` 按鈕 → 取消勾選「Keep this code private」（除非您想付費保持私密；免費的 Netlify 需要公開 Repo）→ 按 `Publish repository`

> 完成後 Repo 已經上 GitHub，網址會是 `https://github.com/你的帳號/designer-portfolio`

---

## Step 2：在 Netlify 部署網站

### 2-1. 註冊 Netlify
1. 開 https://app.netlify.com/signup
2. 按 `GitHub` 圖示用 GitHub 帳號登入授權

### 2-2. 連接 Repo
1. 進到 Netlify 後，按上方 `Add new site` → `Import an existing project`
2. 選 `Deploy with GitHub`
3. 授權 Netlify 存取您的 GitHub
4. 從清單選 `designer-portfolio`
5. 接下來會問建置設定，**直接全部留空**，按 `Deploy site`
6. 等大約 30 秒，畫面上方會出現您的網站網址（例如 `random-name-12345.netlify.app`）

### 2-3. 改個好看的網址（可選）
1. Netlify 站台首頁 → `Site configuration` → `Change site name`
2. 改成您喜歡的名字（例如 `vkopkimo-portfolio` → 網址變成 `vkopkimo-portfolio.netlify.app`）

> 此時公開網站已經能用了。試著開 `https://你的名稱.netlify.app` 看看。

---

## Step 3：啟用後台（Netlify Identity + Git Gateway）

這一步是讓 `/admin` 後台能登入並真正寫入 GitHub。

### 3-1. 啟用 Identity
1. Netlify 站台首頁 → 上方分頁 `Integrations` → 找到 `Netlify Identity`
2. 按 `Enable Identity`

### 3-2. 設定註冊方式（避免外人亂註冊）
1. 進到 `Identity` 分頁（上方）
2. 右側 `Settings and usage` → `Registration preferences`
3. 把預設的 `Open` 改為 **`Invite only`**
4. 按 `Save`

### 3-3. 啟用 Git Gateway
1. 還在 `Identity` 分頁的 `Settings and usage`
2. 往下捲找到 `Services` → `Git Gateway`
3. 按 `Enable Git Gateway`

### 3-4. 邀請自己當管理員
1. 回到 Identity 分頁主畫面
2. 右上 `Invite users` → 輸入 `vkopkimo@gmail.com` → `Send`
3. 您的信箱會收到一封 Netlify 寄來的邀請信
4. 打開信件按 `Accept the invite`
5. 它會帶您到 `你的網址/admin/#invite_token=...`
6. 設定密碼 → 登入

---

## Step 4：第一次登入後台

1. 開 `https://你的網址.netlify.app/admin/`
2. 用剛才設定的密碼登入
3. 進到後台後您會看到：
   - 左側選單：**整站設定** → **全站內容**
   - 點開後是 5 個摺疊區塊：共用、首頁、作品集、關於、聯絡
4. 試著編輯任何一個欄位 → 右上角 `Publish` → `Publish now`
5. 約 1-2 分鐘後刷新公開網站，應該看到變化

---

## 之後怎麼用

### 換信箱
後台 → 共用 → 「聯絡信箱」改成新的 → Publish。表單 mailto 與聯絡頁的 Email 卡片都會自動跟著換。

### 換作品圖
後台 → 任何作品欄位 → 點「圖片」上傳 → Publish。

### 新增作品
後台 → 作品集頁 → 作品清單 → 右下「Add 作品清單」 → 填欄位 → Publish。

### 新增 PDF
後台 → 作品集頁 → PDF 清單 → 上傳檔案、填大小 → Publish。

### 加社群連結
> 我目前沒有把社群連結放進 CMS（您之前說過要拿掉 footer 的社群圖示）。如果之後想加回來，傳訊息給我，10 秒鐘的事。

---

## 如果遇到問題

| 症狀 | 原因 / 處置 |
| --- | --- |
| `/admin` 進去白白一片 | Netlify Identity 還沒啟用，回到 Step 3-1 |
| 登入後按 Publish 沒反應 | Git Gateway 沒啟用，回到 Step 3-3 |
| 改了東西但網站沒變 | Netlify 還在重新部署，等 1-2 分鐘；或瀏覽器強制重整 Ctrl+F5 |
| 圖片上傳後沒顯示 | 圖片會存到 `images/uploads/` 自動沒問題；如果路徑有空白名請改成英文名重傳 |
| 後台看不到「關於頁」「首頁」的編輯效果 | **這是預期的**。我目前只把聯絡頁完整接上 CMS（Phase 1 完成）。確認部署能用後，告訴我，我就把另外 3 頁也接上（Phase 2） |

---

## 目前 Phase 1 已完成

- [x] 全站內容抽到 `content.json`
- [x] 後台介面（`/admin`）完整設定，所有欄位都可編輯
- [x] **聯絡頁** 已接 CMS：編輯後立即反映
- [x] Netlify 部署設定檔
- [x] 4 個 HTML 頁面都載入 content.js
- [x] 信箱集中管理：CMS 改一處，全站 mailto 都換

## Phase 2（部署成功後再做）

- [ ] 首頁綁定 CMS（Hero、精選作品、服務、CTA）
- [ ] 作品集頁綁定 CMS（作品清單、PDF 清單）
- [ ] 關於頁綁定 CMS（個人介紹、能力、經歷、工具、領域）

部署成功後跟我說一聲，我就接著做 Phase 2。
