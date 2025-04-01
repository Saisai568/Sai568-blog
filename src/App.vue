<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="app">
    <nav class="navbar">
      <router-link to="/" class="logo">我的技術部落格</router-link>
      <div class="nav-links">
        <router-link to="/">首頁</router-link>
        <router-link to="/blog">文章列表</router-link>
        <router-link to="/create" class="create-btn">寫文章</router-link>
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
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
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

.nav-links a.router-link-active {
  color: var(--primary-color);
}

.create-btn {
  background: var(--primary-color);
  color: white !important;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s !important;
}

.create-btn:hover {
  background: var(--secondary-color);
  color: white !important;
}

main {
  flex: 1;
  padding: 2rem 0;
}

footer {
  background: white;
  padding: 2rem;
  text-align: center;
  color: #718096;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}
</style>
