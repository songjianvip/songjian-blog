<template>
  <router-link :to="`/article/${article.id}`" class="article-card">
    <div class="card-meta">
      <span class="category">{{ article.category }}</span>
      <span class="muted">{{ article.readingTime }} 分钟阅读</span>
    </div>
    <h3 class="card-title serif">{{ article.title }}</h3>
    <p class="card-summary">{{ article.summary }}</p>
    <div class="card-footer">
      <div class="tags">
        <span v-for="tag in article.tags" :key="tag" class="tag"># {{ tag }}</span>
      </div>
      <div class="stats muted">
        <span><el-icon><View /></el-icon>{{ article.views }}</span>
        <span><el-icon><Star /></el-icon>{{ article.likes }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.article-card {
  display: block;
  padding: 26px 28px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: var(--transition);
}

.article-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.category {
  font-size: 12px;
  color: var(--color-primary);
  background: var(--color-hover);
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 500;
}

.card-title {
  font-size: 21px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.4;
  margin-bottom: 10px;
  transition: var(--transition);
}

.article-card:hover .card-title {
  color: var(--color-primary);
}

.card-summary {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 18px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  font-size: 13px;
  color: var(--color-text-muted);
}

.stats {
  display: flex;
  gap: 16px;
}

.stats span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
