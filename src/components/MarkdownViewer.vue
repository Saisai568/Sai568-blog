<script setup>
import { marked } from 'marked';

const props = defineProps({
  content: {
    type: String,
    required: true
  }
});

const renderMarkdown = (content) => {
  return marked(content);
};
</script>

<template>
  <div class="markdown-content" v-html="renderMarkdown(content)"></div>
</template>

<style scoped>
.markdown-content {
  line-height: 1.8;
}

.markdown-content :deep(h1) {
  font-size: 2em;
  margin-bottom: 0.5em;
  color: var(--text-color);
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  margin: 1em 0 0.5em;
  color: var(--text-color);
}

.markdown-content :deep(h3) {
  font-size: 1.25em;
  margin: 1em 0 0.5em;
  color: var(--text-color);
}

.markdown-content :deep(p) {
  margin-bottom: 1em;
}

.markdown-content :deep(code) {
  background-color: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Courier New', Courier, monospace;
}

.markdown-content :deep(pre) {
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1em 0;
}

.markdown-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  color: inherit;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid var(--primary-color);
  padding-left: 1em;
  margin: 1em 0;
  color: #666;
}

.markdown-content :deep(ul), .markdown-content :deep(ol) {
  margin: 1em 0;
  padding-left: 2em;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5em;
}

.markdown-content :deep(a) {
  color: var(--primary-color);
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1em 0;
  border-radius: 4px;
}
</style> 