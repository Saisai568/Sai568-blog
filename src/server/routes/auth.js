import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/user.js';

const router = express.Router();

// 註冊
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 檢查用戶是否已存在
    const existingUser = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser) {
      return res.status(400).json({ message: '用戶名已存在' });
    }

    // 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 創建新用戶
    await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    
    res.status(201).json({ message: '註冊成功' });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

// 登入
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 查找用戶
    const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) {
      return res.status(400).json({ message: '用戶名或密碼錯誤' });
    }

    // 驗證密碼
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: '用戶名或密碼錯誤' });
    }

    // 生成 JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

export default router; 