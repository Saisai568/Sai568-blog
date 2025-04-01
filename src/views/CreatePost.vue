<template>
  <div class="create-post">
    <h1>撰寫新文章</h1>
    
    <form @submit.prevent="handleSubmit" class="post-form">
      <div class="form-group">
        <label for="title">標題</label>
        <input 
          type="text" 
          id="title" 
          v-model="title" 
          required
          placeholder="請輸入文章標題"
        >
      </div>
      
      <div class="form-group">
        <label for="content">內容</label>
        <textarea 
          id="content" 
          v-model="content" 
          required
          rows="15"
          placeholder="請輸入文章內容（支援 Markdown 格式）"
        ></textarea>
      </div>
      
      <div class="form-actions">
        <button type="submit" :disabled="loading">
          {{ loading ? '發布中...' : '發布文章' }}
        </button>
        <router-link to="/" class="cancel-btn">取消</router-link>
      </div>
      
      <div v-if="error" class="error">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'

const router = useRouter()
const blogStore = useBlogStore()

const title = ref('')
const content = ref('')
const loading = ref(false)
const error = ref(null)

const handleSubmit = async () => {
  loading.value = true
  error.value = null
  
  try {
    await blogStore.createPost({
      title: title.value,
      content: content.value
    })
    router.push('/')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.create-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
  color: #2d3748;
}

.post-form {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
}

input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #2d3748;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  background: #667eea;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background: #5a67d8;
}

button:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

.cancel-btn {
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s;
}

.cancel-btn:hover {
  background: #cbd5e0;
}

.error {
  margin-top: 1rem;
  color: #e53e3e;
  font-size: 0.875rem;
}
</style> 