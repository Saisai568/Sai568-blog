<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MarkdownViewer from './MarkdownViewer.vue'

const router = useRouter()
const title = ref('')
const content = ref('')
const isPreview = ref(false)

const handleSubmit = async () => {
  // 這裡添加保存文章的邏輯
  const post = {
    title: title.value,
    content: content.value,
    createdAt: new Date().toISOString()
  }
  
  // 模擬 API 調用
  console.log('保存文章:', post)
  router.push('/blog')
}
</script>

<template>
  <div class="editor-container">
    <div class="editor-header">
      <input
        v-model="title"
        type="text"
        placeholder="文章標題"
        class="title-input"
      />
      <div class="editor-actions">
        <button @click="isPreview = !isPreview" class="preview-btn">
          {{ isPreview ? '編輯' : '預覽' }}
        </button>
        <button @click="handleSubmit" class="submit-btn">發布</button>
      </div>
    </div>

    <div class="editor-content">
      <textarea
        v-if="!isPreview"
        v-model="content"
        placeholder="使用 Markdown 格式撰寫文章內容..."
        class="content-editor"
      ></textarea>
      <div v-else class="content-preview">
        <MarkdownViewer :content="content" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title-input {
  font-size: 1.5rem;
  padding: 0.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  width: 60%;
}

.editor-actions {
  display: flex;
  gap: 1rem;
}

.preview-btn, .submit-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.preview-btn {
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;
}

.submit-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.preview-btn:hover {
  background-color: #cbd5e0;
}

.submit-btn:hover {
  background-color: var(--secondary-color);
}

.editor-content {
  min-height: 500px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.content-editor {
  width: 100%;
  height: 500px;
  padding: 1rem;
  border: none;
  resize: none;
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.6;
  font-size: 1rem;
}

.content-preview {
  padding: 1rem;
  height: 500px;
  overflow-y: auto;
}
</style> 