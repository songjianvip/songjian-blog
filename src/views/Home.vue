<template>
  <div class="home">
    <section class="hero">
      <div class="container hero-inner">
        <p class="hero-greet">你好，我是宋健 👋</p>
        <h1 class="hero-title serif">在这里记录技术、生活与思考</h1>
        <p class="hero-sub">
          一个热爱前端与后端的前端工程师，相信持续输出是最好的学习方式。
        </p>
      </div>
    </section>

    <div class="container-wide home-body">
      <div class="main">
        <div class="filter-bar">
          <el-radio-group v-model="activeCategory" size="small" @change="onFilterChange">
            <el-radio-button value="全部">全部</el-radio-button>
            <el-radio-button v-for="c in categories" :key="c" :value="c">
              {{ c }}
            </el-radio-button>
          </el-radio-group>

          <div v-if="activeTag" class="tag-filter">
            标签：<span class="tag-label"># {{ activeTag }}</span>
            <el-button text size="small" @click="clearTag">清除</el-button>
          </div>
        </div>

        <div v-loading="loading" class="list-wrap" element-loading-text="文章加载中…">
          <template v-if="articles.length">
            <ArticleCard
              v-for="a in articles"
              :key="a.id"
              :article="a"
              class="list-item"
            />
          </template>
          <el-empty v-else-if="!loading" description="暂无相关文章" />
        </div>

        <div v-if="total > pageSize" class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :current-page="page"
            @current-change="onPageChange"
          />
        </div>
      </div>

      <BlogSidebar :active-category="activeCategory" :active-tag="activeTag" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArticleCard from '@/components/ArticleCard.vue'
import BlogSidebar from '@/components/BlogSidebar.vue'
import { fetchArticles } from '@/api'
import { categories as allCategories } from '@/mock/articles'

const route = useRoute()
const router = useRouter()

const articles = ref([])
const loading = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = 6
const categories = allCategories

const activeCategory = ref('全部')
const activeTag = ref('')

async function loadArticles() {
  loading.value = true
  try {
    const res = await fetchArticles({
      category: activeCategory.value,
      tag: activeTag.value,
      page: page.value,
      pageSize
    })
    articles.value = res.list
    total.value = res.total
  } finally {
    loading.value = false
  }
}

function syncFromQuery() {
  activeCategory.value = route.query.category || '全部'
  activeTag.value = route.query.tag || ''
  page.value = Number(route.query.page) || 1
  loadArticles()
}

function onFilterChange() {
  page.value = 1
  updateQuery()
  loadArticles()
}

function clearTag() {
  activeTag.value = ''
  onFilterChange()
}

function onPageChange(p) {
  page.value = p
  updateQuery()
  loadArticles()
}

function updateQuery() {
  const query = {}
  if (activeCategory.value !== '全部') query.category = activeCategory.value
  if (activeTag.value) query.tag = activeTag.value
  if (page.value > 1) query.page = page.value
  router.replace({ query })
}

watch(() => route.query, syncFromQuery)

onMounted(syncFromQuery)
</script>

<style lang="scss" scoped>
.hero {
  padding: 72px 0 56px;
  background: linear-gradient(
    180deg,
    var(--color-bg-soft) 0%,
    var(--color-bg) 100%
  );
  border-bottom: 1px solid var(--color-border);
}

.hero-inner {
  text-align: center;
}

.hero-greet {
  font-size: 15px;
  color: var(--color-primary);
  margin-bottom: 14px;
}

.hero-title {
  font-size: 34px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.hero-sub {
  font-size: 15px;
  color: var(--color-text-secondary);
  max-width: 520px;
  margin: 0 auto;
}

.home-body {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 32px;
  padding-top: 32px;
}

.main {
  min-width: 0;
}

.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 22px;
}

.tag-filter {
  font-size: 13px;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
}

.tag-label {
  color: var(--color-primary);
}

.list-wrap {
  min-height: 300px;
}

.list-item {
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 12px 0 8px;
}

@media (max-width: 900px) {
  .home-body {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 26px;
  }
}
</style>
