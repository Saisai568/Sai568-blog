<template>
  <div class="blog-list">
    <h1>所有文章</h1>
    
    <div v-if="loading" class="loading">
      載入中...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else class="posts">
      <article v-for="post in posts" :key="post.id" class="post">
        <h2>{{ post.title }}</h2>
        <p class="date">{{ new Date(post.created_at).toLocaleDateString() }}</p>
        <p class="excerpt">{{ post.content.substring(0, 200) }}...</p>
        <router-link :to="`/blog/${post.id}`" class="read-more">
          閱讀更多
        </router-link>
      </article>
    </div>
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
.blog-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #e53e3e;
}

.post {
  background: white;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post h2 {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
}

.date {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.excerpt {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}
</style> 