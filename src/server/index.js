import express from 'express'
import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import dotenv from 'dotenv'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// 啟用 CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// 資料庫連接
const db = new sqlite3.Database(path.join(__dirname, 'blog.db'))

// 初始化資料庫
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 添加測試文章
  db.get('SELECT COUNT(*) as count FROM posts', [], (err, row) => {
    if (err) {
      console.error('檢查文章數量時發生錯誤:', err)
      return
    }
    
    if (row.count === 0) {
      const testPosts = [
        {
          title: 'Vue 3 組合式 API 介紹',
          content: 'Vue 3 的組合式 API 是一個革命性的特性，它讓我們能夠更好地組織和重用邏輯代碼。\n\n在這篇文章中，我們將深入探討組合式 API 的優點和使用方法。\n\n## 為什麼需要組合式 API？\n\n在 Vue 2 中，我們使用選項式 API 來組織代碼。雖然這種方式直觀，但在處理複雜組件時可能會遇到一些限制。'
        },
        {
          title: '使用 Vite 建立現代化前端專案',
          content: 'Vite 是一個現代化的前端建構工具，它提供了極快的開發體驗。\n\n## Vite 的優點\n\n1. 快速的冷啟動\n2. 即時的模組熱更新\n3. 真正的按需加載\n\n讓我們來看看如何使用 Vite 建立一個新的專案。'
        },
        {
          title: 'Pinia 狀態管理指南',
          content: 'Pinia 是 Vue 的官方推薦狀態管理解決方案，它提供了比 Vuex 更簡單和更強大的功能。\n\n## 為什麼選擇 Pinia？\n\n- 完整的 TypeScript 支持\n- 極其輕量\n- 模組化設計\n\n在這篇文章中，我們將學習如何使用 Pinia 來管理應用程序的狀態。'
        }
      ]

      const stmt = db.prepare('INSERT INTO posts (title, content) VALUES (?, ?)')
      testPosts.forEach(post => {
        stmt.run(post.title, post.content)
      })
      stmt.finalize()
      console.log('已添加測試文章')
    }
  })
})

app.use(express.json())

// API 路由
app.get('/api/posts', (req, res) => {
  db.all('SELECT * FROM posts ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json(rows)
  })
})

app.get('/api/posts/:id', (req, res) => {
  db.get('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: '文章不存在' })
      return
    }
    res.json(row)
  })
})

// 創建新文章
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body
  
  if (!title || !content) {
    res.status(400).json({ error: '標題和內容都是必填的' })
    return
  }

  const stmt = db.prepare('INSERT INTO posts (title, content) VALUES (?, ?)')
  stmt.run(title, content, function(err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    
    // 獲取新創建的文章
    db.get('SELECT * FROM posts WHERE id = ?', [this.lastID], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      res.status(201).json(row)
    })
  })
  stmt.finalize()
})

app.listen(port, () => {
  console.log(`伺服器運行在 http://localhost:${port}`)
}) 