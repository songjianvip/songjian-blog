<template>
  <aside class="sidebar">
    <el-skeleton :loading="store.sidebarLoading" animated>
      <template #template>
        <div class="widget">
          <div class="widget-title">分类</div>
          <el-skeleton-item variant="text" style="width: 60%" />
        </div>
        <div class="widget">
          <div class="widget-title">标签</div>
          <el-skeleton-item variant="text" style="width: 80%" />
        </div>
      </template>

      <template #default>
        <div class="widget">
          <div class="widget-title">文章分类</div>
          <div class="category-list">
            <router-link
              v-for="c in store.categories"
              :key="c.name"
              :to="{ path: '/', query: { category: c.name } }"
              class="category-item"
              :class="{ active: activeCategory === c.name }"
            >
              <span>{{ c.name }}</span>
              <span class="count">{{ c.count }}</span>
            </router-link>
          </div>
        </div>

        <div class="widget">
          <div class="widget-title">热门标签</div>
          <div class="tag-cloud">
            <router-link
              v-for="t in store.tags.slice(0, 12)"
              :key="t.name"
              :to="{ path: '/', query: { tag: t.name } }"
              class="tag-item"
              :class="{ active: activeTag === t.name }"
            >
              {{ t.name }}
            </router-link>
          </div>
        </div>

        <div class="widget">
          <div class="widget-title">近期文章</div>
          <div class="recent-list">
            <router-link
              v-for="a in store.recentArticles"
              :key="a.id"
              :to="`/article/${a.id}`"
              class="recent-item"
            >
              <span class="recent-title">{{ a.title }}</span>
              <span class="muted">{{ a.createdAt }}</span>
            </router-link>
          </div>
        </div>
      </template>
    </el-skeleton>
  </aside>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBlogStore } from '@/stores/blog'

defineProps({
  activeCategory: {
    type: String,
    default: ''
  },
  activeTag: {
    type: String,
    default: ''
  }
})

const store = useBlogStore()

onMounted(() => {
  store.loadSidebar()
})
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.widget {
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 18px 20px;
}

.widget-title {
  font-family: var(--font-serif);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 14px;
  position: relative;
  padding-left: 12px;
}

.widget-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 3px;
  border-radius: 2px;
  background: var(--color-primary);
}

.category-list {
  display: flex;
  flex-direction: column;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 8px;
  border-radius: 6px;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.category-item:hover,
.category-item.active {
  color: var(--color-primary);
  background: var(--color-hover);
}

.count {
  font-size: 12px;
  color: var(--color-text-muted);
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.tag-item:hover,
.tag-item.active {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background: var(--color-hover);
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.recent-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 8px;
  border-radius: 6px;
  color: var(--color-text-secondary);
}

.recent-item:hover {
  color: var(--color-primary);
  background: var(--color-hover);
}

.recent-title {
  font-size: 14px;
  line-height: 1.5;
}

.recent-item .muted {
  font-size: 12px;
}
</style>
