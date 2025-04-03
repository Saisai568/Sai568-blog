<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const router = useRouter()
const route = useRoute()
const isAuthenticated = ref(false)
const isDarkMode = ref(false)

onMounted(() => {
  checkAuth()
  // 從 localStorage 讀取主題設置
  const savedTheme = localStorage.getItem('theme')
  isDarkMode.value = savedTheme === 'dark'
  updateTheme()
})

// 監聽路由變化
watch(route, () => {
  checkAuth()
})

const checkAuth = () => {
  isAuthenticated.value = !!localStorage.getItem('token')
}

const handleLogout = () => {
  localStorage.removeItem('token')
  isAuthenticated.value = false
  router.push('/auth')
}

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  updateTheme()
}

const updateTheme = () => {
  document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
}
</script>

<template>
  <div class="app">
    <nav class="navbar">
      <div class="nav-left">
        <img src="/avatar.png" alt="個人頭像" class="avatar" />
        <router-link to="/" class="logo">Saisai568's Tech</router-link>
      </div>
      <div class="nav-links">
        <router-link to="/">首頁</router-link>
        <router-link to="/blog">文章列表</router-link>
        <template v-if="isAuthenticated">
          <router-link to="/create" class="create-btn">寫文章</router-link>
          <button @click="handleLogout" class="logout-btn">登出</button>
        </template>
        <router-link v-else to="/auth" class="login-btn">登入</router-link>
        <button class="theme-toggle" @click="toggleTheme">
          {{ isDarkMode ? '🌞' : '🌙' }}
        </button>
      </div>
    </nav>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <p>&copy; {{ new Date().getFullYear() }} Saisai568. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #2d3748;
  --text-secondary: #4a5568;
  --bg-color: #f7fafc;
  --nav-bg: white;
  --footer-bg: white;
  --card-bg: white;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --primary-color: #8b5cf6;
  --secondary-color: #6d28d9;
  --text-color: #e2e8f0;
  --text-secondary: #a0aec0;
  --bg-color: #1a202c;
  --nav-bg: #2d3748;
  --footer-bg: #2d3748;
  --card-bg: #2d3748;
  --shadow-color: rgba(0, 0, 0, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: var(--nav-bg);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px var(--shadow-color);
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary-color);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.create-btn, .login-btn {
  background-color: var(--primary-color);
  color: white !important;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.logout-btn {
  background-color: #e53e3e;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #c53030;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.theme-toggle:hover {
  background-color: var(--shadow-color);
}

main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

footer {
  background-color: var(--footer-bg);
  padding: 1rem;
  text-align: center;
  box-shadow: 0 -2px 4px var(--shadow-color);
}
</style>
