import { defineStore } from 'pinia'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [],
    currentPost: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchPosts() {
      this.loading = true
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        this.posts = await response.json()
      } catch (error) {
        console.error('獲取文章列表失敗:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchPost(id) {
      this.loading = true
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        this.currentPost = await response.json()
      } catch (error) {
        console.error('獲取文章詳情失敗:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createPost(post) {
      this.loading = true
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('未登入')
        }

        const response = await fetch(`${API_BASE_URL}/api/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(post)
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const newPost = await response.json()
        this.posts.unshift(newPost)
        return newPost
      } catch (error) {
        console.error('創建文章失敗:', error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 