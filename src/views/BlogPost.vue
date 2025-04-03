<template>
  <div class="blog-post">
    <div v-if="loading" class="loading">
      載入中...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <article v-else-if="post" class="post">
      <h1>{{ post.title }}</h1>
      <p class="date">{{ new Date(post.created_at).toLocaleDateString() }}</p>
      <MarkdownViewer :content="post.content" />
    </article>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import { storeToRefs } from 'pinia'
import MarkdownViewer from '../components/MarkdownViewer.vue'

const route = useRoute()
const blogStore = useBlogStore()
const { currentPost: post, loading, error } = storeToRefs(blogStore)

onMounted(() => {
  blogStore.fetchPost(route.params.id)
})
</script>

<style scoped>
.blog-post {
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
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post h1 {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  font-size: 2.5rem;
}

.date {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}
</style> 