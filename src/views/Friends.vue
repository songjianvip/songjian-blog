<template>
  <div class="friends">
    <div class="container">
      <div class="page-head">
        <h1 class="page-title serif">友链</h1>
        <p class="muted">结交同好，互相学习 · 有意交换友链请在留言板留言</p>
      </div>

      <div class="filter">
        <el-radio-group v-model="activeCategory" size="small">
          <el-radio-button v-for="c in categories" :key="c" :value="c">
            {{ c }}
          </el-radio-button>
        </el-radio-group>
      </div>

      <el-skeleton v-if="loading" :rows="8" animated />
      <div v-else class="friends-grid">
        <a
          v-for="f in filteredList"
          :key="f.id"
          :href="f.url"
          target="_blank"
          rel="noopener"
          class="friend-card"
        >
          <span class="friend-avatar" :style="{ background: avatarColor(f.name) }">
            {{ f.name.slice(0, 1) }}
          </span>
          <div class="friend-info">
            <div class="friend-name">{{ f.name }}</div>
            <p class="friend-desc">{{ f.desc }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchFriends } from '@/api'

const loading = ref(true)
const list = ref([])
const categories = ref(['全部'])
const activeCategory = ref('全部')

const filteredList = computed(() =>
  activeCategory.value === '全部'
    ? list.value
    : list.value.filter((f) => f.category === activeCategory.value)
)

const palette = ['#4a6cf7', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

function avatarColor(name) {
  let sum = 0
  for (const ch of name) sum += ch.charCodeAt(0)
  return palette[sum % palette.length]
}

onMounted(async () => {
  try {
    const res = await fetchFriends()
    list.value = res.list
    categories.value = res.categories
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.friends {
  padding-top: 40px;
}

.page-head {
  margin-bottom: 28px;
}

.page-title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 8px;
}

.filter {
  margin-bottom: 24px;
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
}

.friend-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  transition: var(--transition);
}

.friend-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.friend-avatar {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-family: var(--font-serif);
}

.friend-info {
  min-width: 0;
}

.friend-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
  transition: var(--transition);
}

.friend-card:hover .friend-name {
  color: var(--color-primary);
}

.friend-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
