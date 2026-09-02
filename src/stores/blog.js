import { defineStore } from 'pinia'
import { fetchSidebarInfo } from '@/api'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    sidebar: null,
    sidebarLoading: false,
    searchKeyword: ''
  }),
  getters: {
    categories: (state) => state.sidebar?.categories || [],
    tags: (state) => state.sidebar?.tags || [],
    recentArticles: (state) => state.sidebar?.recentArticles || []
  },
  actions: {
    async loadSidebar() {
      if (this.sidebar || this.sidebarLoading) return
      this.sidebarLoading = true
      try {
        this.sidebar = await fetchSidebarInfo()
      } finally {
        this.sidebarLoading = false
      }
    },
    setSearchKeyword(keyword) {
      this.searchKeyword = keyword
    }
  }
})
