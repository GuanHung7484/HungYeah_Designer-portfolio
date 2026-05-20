# Designer Portfolio 網站

依據 Stitch 設計稿建構的多頁式作品集，採用 Tailwind CDN + 共用設計 token。
**已整合 Decap CMS 後台**，可在 Netlify 部署後用 `/admin` 編輯所有內容。

👉 **要部署到網路上、開啟後台？請看 [DEPLOY.md](DEPLOY.md)**

## 檔案結構

```
作品集網站/
├─ index.html         首頁（Hero / 精選作品 / 服務 / CTA）
├─ portfolio.html     作品集（篩選、卡片網格、PDF 專區）
├─ about.html         關於（個人介紹、能力光譜、經歷紀事）
├─ contact.html       聯絡（資訊卡、表單、FAQ）
└─ assets/
   ├─ tailwind-config.js    共用 Tailwind 主題（顏色 / 間距 / 字體 / 字級）
   ├─ styles.css            自訂樣式、佔位圖、捲動動畫、表單欄位
   └─ main.js               捲動顯示、Nav 行為、篩選器、行動選單、表單
```

## 本機預覽

直接在瀏覽器開啟 `index.html` 即可。

若要使用更接近上線環境的預覽（避免某些瀏覽器對本機檔案的限制），可在資料夾下啟動簡易 server：

```powershell
# 任一個都可以
python -m http.server 8080
# 或
npx serve .
```

## 替換圖片（已自動化）

`images/` 資料夾已建立。把您的圖片用以下檔名丟進去，網頁重整後會自動取代灰底佔位圖：

| 頁面 | 檔名 | 用途 | 建議比例 |
| --- | --- | --- | --- |
| index.html | `hero.jpg` | 主視覺背景 | 16:9 |
| index.html | `work-ui.jpg` | 精選作品 1（UI/UX） | 16:10 |
| index.html | `work-photo.jpg` | 精選作品 2（商品攝影） | 3:4 |
| portfolio.html | `project-ui.jpg` | UI 卡片大圖 | 16:9 |
| portfolio.html | `project-architecture.jpg` | 建築攝影 | 3:4 |
| portfolio.html | `project-brand.jpg` | 品牌識別 | 3:4 |
| portfolio.html | `pdf-1.jpg` ~ `pdf-4.jpg` | PDF 縮圖 ×4 | 3:4 |
| about.html | `portrait.jpg` | 肖像 | 4:5 |

機制：每個佔位圖都帶 `data-src="images/xxx.jpg"`，`main.js` 會嘗試載入，成功就自動替換為 `<img>`，失敗就保留佔位圖，不會出現破圖。

詳細說明見 [images/README.txt](images/README.txt)。

## 聯絡信箱

主要信箱已設為 **vkopkimo@gmail.com**（contact.html 與首頁 CTA 都已更新）。

社群連結（LinkedIn / Behance / Instagram / Dribbble）目前是 `href="#"`，請開啟各頁 footer 與 `contact.html` 側欄補上自己的網址。

## 聯絡表單

`contact.html` 的表單已接好 **mailto: 寄信機制**：訪客填完按「送出訊息」後，會自動開啟他電腦上的郵件程式（Outlook / Mail / Gmail 網頁版），收件人預填 vkopkimo@gmail.com，主旨與內文也已格式化好，訪客只要按送出即可。

優點：**完全不需後端、零月費、立即可用。**
缺點：訪客必須有設定好的郵件程式。

若想改成「訪客按送出就直接收到信，不用打開郵件程式」，可以再升級為：
- [Formspree](https://formspree.io/)（每月 50 封免費）：註冊取得 endpoint，把 `<form>` 加上 `action="https://formspree.io/f/你的id" method="POST"`，並移除 `main.js` 內 `contactForm.addEventListener('submit', …)` 整段。
- [Netlify Forms](https://docs.netlify.com/forms/setup/)：部署於 Netlify 時 `<form>` 加 `netlify` 屬性即可。

## 設計 token 出處

`assets/tailwind-config.js` 內的色票與字級完全來自原始 Stitch 設計稿（Material 3 衍生）。要全站調整視覺，只改這一個檔即可。
