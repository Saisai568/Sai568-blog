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
      <div class="content" v-html="formattedContent"></div>
    </article>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import { storeToRefs } from 'pinia'

const route = useRoute()
const blogStore = useBlogStore()
const { currentPost: post, loading, error } = storeToRefs(blogStore)

const formattedContent = computed(() => {
  if (!post.value?.content) return ''
  return post.value.content.replace(/\n/g, '<br>')
})

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

.content {
  color: #4a5568;
  line-height: 1.8;
  font-size: 1.1rem;
}

.content :deep(p) {
  margin-bottom: 1.5rem;
}

.content :deep(h2) {
  color: #2d3748;
  margin: 2rem 0 1rem 0;
  font-size: 1.8rem;
}

.content :deep(code) {
  background: #f7fafc;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: monospace;
}
</style> 