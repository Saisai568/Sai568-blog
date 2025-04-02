<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const router = useRouter()
const route = useRoute()
const isAuthenticated = ref(false)

onMounted(() => {
  checkAuth()
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
</script>

<template>
  <div class="app">
    <nav class="navbar">
      <div class="nav-left">
        <img src="/avatar.png" alt="個人頭像" class="avatar" />
        <router-link to="/" class="logo">我的技術部落格</router-link>
      </div>
      <div class="nav-links">
        <router-link to="/">首頁</router-link>
        <router-link to="/blog">文章列表</router-link>
        <template v-if="isAuthenticated">
          <router-link to="/create" class="create-btn">寫文章</router-link>
          <button @click="handleLogout" class="logout-btn">登出</button>
        </template>
        <router-link v-else to="/auth" class="login-btn">登入</router-link>
      </div>
    </nav>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <p>&copy; {{ new Date().getFullYear() }} 我的技術部落格. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #2d3748;
  --bg-color: #f7fafc;
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
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

footer {
  background-color: white;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}
</style>
