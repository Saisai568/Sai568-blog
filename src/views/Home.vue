<template>
  <div class="home">
    <header class="hero">
      <h1>歡迎來到Sai568的技術部落格</h1>
      <p>分享技術、學習和開發經驗</p>
    </header>
    
    <section class="featured-posts">
      <h2>最新文章</h2>
      <div v-if="loading" class="loading">載入中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="posts-grid">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content.substring(0, 150) }}...</p>
          <router-link :to="`/blog/${post.id}`" class="read-more">
            閱讀更多
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBlogStore } from '../stores/blog'
import { storeToRefs } from 'pinia'

const blogStore = useBlogStore()
const { posts, loading, error } = storeToRefs(blogStore)

onMounted(() => {
  blogStore.fetchPosts()
})
</script>

<style scoped>
.home {
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 1rem;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.featured-posts {
  margin-top: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #e53e3e;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.post-card {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px var(--shadow-color);
  transition: transform 0.2s;
}

.post-card:hover {
  transform: translateY(-5px);
}

.post-card h3 {
  color: var(--text-color);
  margin-bottom: 1rem;
}

.post-card p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.read-more {
  display: inline-block;
  margin-top: 1rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
  background-color: var(--primary-color);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  width: 100%;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.read-more:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style> 