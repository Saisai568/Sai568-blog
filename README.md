# Sai568 部落格

這是一個使用 Vue 3 + Vite 開發的現代化部落格系統，具有前後端分離架構。

## 技術棧

- 前端框架：Vue 3
- 構建工具：Vite
- 狀態管理：Pinia
- 路由管理：Vue Router
- 後端框架：Express.js
- 資料庫：SQLite3
- 部署平台：GitHub Pages

## 功能特點

- 響應式設計
- 前後端分離架構
- 使用 Pinia 進行狀態管理
- RESTful API 設計
- 資料庫持久化存儲

## 安裝說明

1. 克隆專案

```bash
git clone https://github.com/yourusername/sai568-blog.git
cd sai568-blog
```

2. 安裝依賴

```bash
npm install
```

3. 配置環境變數

複製 `.env.example` 文件為 `.env`，並根據需要修改配置。

## 開發環境運行

```bash
# 同時啟動前端開發服務器和後端服務器
npm run start

# 僅啟動前端開發服務器
npm run dev

# 僅啟動後端服務器
npm run server
```

## 生產環境部署

```bash
# 構建專案
npm run build

# 預覽構建結果
npm run preview

# 部署到 GitHub Pages
npm run deploy
```

## 專案結構

```bash
sai568-blog/
├── src/                # 源代碼目錄
│   ├── components/     # Vue 組件
│   ├── views/         # 頁面視圖
│   ├── router/        # 路由配置
│   ├── stores/        # Pinia 狀態管理
│   └── server/        # 後端服務器代碼
├── public/            # 靜態資源
├── dist/              # 構建輸出目錄
└── package.json       # 專案配置文件
```

## 貢獻指南

歡迎提交 Issue 和 Pull Request 來幫助改進這個專案。

## 授權協議

本專案採用 MIT 授權協議 - 詳見 [LICENSE](LICENSE) 文件
