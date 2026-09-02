<template>
  <div class="microblog">
    <div class="container microblog-inner">
      <div class="page-head">
        <h1 class="page-title serif">微博</h1>
        <p class="muted">碎片化的记录与分享，共 {{ list.length }} 条动态</p>
      </div>

      <div class="publish-box">
        <el-input
          v-model="newPost"
          type="textarea"
          :rows="3"
          maxlength="200"
          show-word-limit
          resize="none"
          placeholder="分享此刻的想法…"
        />
        <div class="publish-footer">
          <span class="muted">公开 · 仅展示</span>
          <el-button type="primary" :disabled="!newPost.trim()" @click="publish">
            发布
          </el-button>
        </div>
      </div>

      <el-skeleton v-if="loading" :rows="8" animated />
      <div v-else class="feed">
        <div v-for="item in list" :key="item.id" class="feed-item">
          <div class="avatar">宋</div>
          <div class="feed-main">
            <div class="feed-head">
              <span class="nickname">宋健</span>
              <span class="muted">{{ item.createdAt }}</span>
            </div>
            <p class="feed-content">{{ item.content }}</p>

            <div v-if="item.images.length" class="feed-images">
              <img
                v-for="(img, i) in item.images"
                :key="i"
                :src="img"
                :alt="`配图${i + 1}`"
              />
            </div>

            <div class="feed-actions">
              <span
                class="action-item"
                :class="{ active: item.liked }"
                @click="toggleLike(item)"
              >
                <el-icon><Star /></el-icon>{{ item.likes }}
              </span>
              <span class="action-item" @click="item.showComments = !item.showComments">
                <el-icon><ChatDotRound /></el-icon>{{ item.comments.length }}
              </span>
            </div>

            <div v-if="item.showComments" class="feed-comments">
              <div v-for="(c, i) in item.comments" :key="i" class="fb-item">
                <span class="fb-name">{{ c.name }}：</span>
                <span>{{ c.content }}</span>
              </div>
              <div v-if="!item.comments.length" class="muted">暂无评论</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import { fetchMicroblogs } from '@/api'

const loading = ref(true)
const list = ref([])
const newPost = ref('')

onMounted(async () => {
  try {
    list.value = await fetchMicroblogs()
  } finally {
    loading.value = false
  }
})

function toggleLike(item) {
  item.liked = !item.liked
  item.likes += item.liked ? 1 : -1
}

function publish() {
  list.value.unshift({
    id: Date.now(),
    content: newPost.value.trim(),
    images: [],
    createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
    likes: 0,
    comments: [],
    showComments: false
  })
  newPost.value = ''
  ElMessage.success('发布成功')
}
</script>

<style lang="scss" scoped>
.microblog {
  padding-top: 40px;
}

.microblog-inner {
  max-width: 640px;
}

.page-head {
  margin-bottom: 24px;
}

.page-title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 8px;
}

.publish-box {
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 18px;
  margin-bottom: 28px;
}

.publish-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
}

.feed {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feed-item {
  display: flex;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  transition: var(--transition);
}

.feed-item:hover {
  box-shadow: var(--shadow-sm);
}

.avatar {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.feed-main {
  flex: 1;
  min-width: 0;
}

.feed-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.nickname {
  font-weight: 600;
  font-size: 14.5px;
}

.feed-content {
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 12px;
  white-space: pre-wrap;
}

.feed-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.feed-images img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
}

.feed-actions {
  display: flex;
  gap: 24px;
  padding-top: 10px;
  border-top: 1px solid var(--color-border);
}

.action-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: var(--transition);
}

.action-item:hover,
.action-item.active {
  color: var(--color-primary);
}

.feed-comments {
  margin-top: 12px;
  padding: 12px;
  background: var(--color-bg-muted);
  border-radius: 8px;
  font-size: 13.5px;
}

.fb-item {
  margin-bottom: 6px;
}

.fb-item:last-child {
  margin-bottom: 0;
}

.fb-name {
  color: var(--color-primary);
  font-weight: 500;
}
</style>
