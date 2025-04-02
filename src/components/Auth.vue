<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>{{ isLogin ? '登入' : '註冊' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">用戶名</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="請輸入用戶名"
          />
        </div>
        <div class="form-group">
          <label for="password">密碼</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="請輸入密碼"
          />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? '處理中...' : (isLogin ? '登入' : '註冊') }}
        </button>
      </form>
      <p class="switch-mode">
        {{ isLogin ? '還沒有帳號？' : '已有帳號？' }}
        <a href="#" @click.prevent="toggleMode">
          {{ isLogin ? '立即註冊' : '立即登入' }}
        </a>
      </p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLogin = ref(true)
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const endpoint = isLogin.value ? '/api/auth/login' : '/api/auth/register'
    const response = await fetch(`http://localhost:3000${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || '發生錯誤')
    }

    if (isLogin.value) {
      // 儲存 token
      localStorage.setItem('token', data.token)
      // 重定向到寫文章頁面
      router.push('/create')
    } else {
      // 註冊成功後切換到登入模式
      isLogin.value = true
      error.value = '註冊成功，請登入'
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.auth-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.switch-mode {
  text-align: center;
  margin-top: 1rem;
}

.switch-mode a {
  color: #4CAF50;
  text-decoration: none;
}

.error {
  color: #f44336;
  text-align: center;
  margin-top: 1rem;
}
</style> 