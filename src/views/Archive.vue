<template>
  <div class="archive">
    <div class="container">
      <div class="page-head">
        <h1 class="page-title serif">归档</h1>
        <p class="muted">共 {{ totalCount }} 篇文章，记录走过的每一步</p>
      </div>

      <el-skeleton v-if="loading" :rows="10" animated />
      <div v-else class="timeline">
        <div v-for="group in archive" :key="group.year" class="year-group">
          <div class="year-badge">
            <span class="year">{{ group.year }}</span>
            <span class="muted">{{ group.list.length }} 篇</span>
          </div>

          <div class="year-list">
            <div v-for="a in group.list" :key="a.id" class="article-row">
              <div class="row-line">
                <span class="dot" />
              </div>
              <router-link :to="`/article/${a.id}`" class="row-main">
                <span class="row-date muted">{{ a.createdAt }}</span>
                <span class="row-title">{{ a.title }}</span>
                <span class="row-category">{{ a.category }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchArchive } from '@/api'

const loading = ref(true)
const archive = ref([])

const totalCount = computed(() =>
  archive.value.reduce((sum, g) => sum + g.list.length, 0)
)

onMounted(async () => {
  try {
    archive.value = await fetchArchive()
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.archive {
  padding-top: 40px;
}

.page-head {
  margin-bottom: 36px;
}

.page-title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 8px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.year-group {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 24px;
}

.year-badge {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.year {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 700;
  color: var(--color-primary);
}

.year-list {
  position: relative;
  padding-left: 20px;
  border-left: 2px solid var(--color-border);
}

.article-row {
  position: relative;
  padding: 10px 0;
}

.dot {
  position: absolute;
  left: -27px;
  top: 18px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 2px solid var(--color-primary);
  transition: var(--transition);
}

.article-row:hover .dot {
  background: var(--color-primary);
}

.row-main {
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
  color: var(--color-text);
}

.row-date {
  font-size: 13px;
  flex-shrink: 0;
}

.row-title {
  font-size: 15.5px;
  font-weight: 500;
  transition: var(--transition);
}

.article-row:hover .row-title {
  color: var(--color-primary);
}

.row-category {
  font-size: 12px;
  color: var(--color-primary);
  background: var(--color-hover);
  padding: 1px 8px;
  border-radius: 10px;
}

@media (max-width: 560px) {
  .year-group {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .year-badge {
    flex-direction: row;
    align-items: baseline;
    gap: 8px;
  }
  .year {
    font-size: 22px;
  }
}
</style>
