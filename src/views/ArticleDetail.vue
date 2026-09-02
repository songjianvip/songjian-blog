<template>
  <div class="article-detail">
    <div class="container-wide detail-body">
      <div class="main">
        <el-skeleton v-if="loading" :rows="12" animated />
        <template v-else>
          <article class="article">
            <div class="article-header">
              <h1 class="article-title serif">{{ article.title }}</h1>
              <div class="article-meta">
                <span class="category">{{ article.category }}</span>
                <span><el-icon><Calendar /></el-icon>{{ article.createdAt }}</span>
                <span><el-icon><Clock /></el-icon>{{ article.readingTime }} 分钟</span>
                <span><el-icon><View /></el-icon>{{ article.views }} 阅读</span>
              </div>
            </div>

            <div class="article-content markdown-body" v-html="contentHtml"></div>

            <div class="article-tags">
              <router-link
                v-for="tag in article.tags"
                :key="tag"
                :to="{ path: '/', query: { tag } }"
                class="tag-link"
              >
                # {{ tag }}
              </router-link>
            </div>

            <div class="article-actions">
              <el-button
                :type="liked ? 'primary' : 'default'"
                round
                @click="toggleLike"
              >
                <el-icon class="mr4"><Star /></el-icon>
                {{ liked ? '已喜欢' : '喜欢' }} ({{ article.likes }})
              </el-button>
              <el-button round @click="scrollToComments">
                <el-icon class="mr4"><ChatDotRound /></el-icon>
                评论 ({{ comments.length }})
              </el-button>
            </div>
          </article>

          <section id="comments" class="comments">
            <h2 class="section-title">评论</h2>
            <div class="comment-form">
              <el-input
                v-model="commentContent"
                type="textarea"
                :rows="3"
                maxlength="300"
                show-word-limit
                placeholder="写下你的想法…"
              />
              <div class="comment-form-footer">
                <span class="muted">昵称：</span>
                <el-input v-model="commentName" class="name-input" size="small" placeholder="选填" />
                <el-button type="primary" size="small" :disabled="!commentContent.trim()" @click="submitComment">
                  发表评论
                </el-button>
              </div>
            </div>

            <el-empty v-if="!comments.length" description="还没有评论，来抢沙发吧" :image-size="80" />
            <div v-else class="comment-list">
              <div v-for="c in comments" :key="c.id" class="comment-item">
                <div class="avatar">{{ c.name.slice(0, 1) }}</div>
                <div class="comment-main">
                  <div class="comment-head">
                    <span class="name">{{ c.name }}</span>
                    <span class="muted">{{ c.createdAt }}</span>
                  </div>
                  <p class="comment-content">{{ c.content }}</p>
                </div>
              </div>
            </div>
          </section>
        </template>
      </div>

      <BlogSidebar />
    </div>

    <el-backtop :right="24" :bottom="48" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import BlogSidebar from '@/components/BlogSidebar.vue'
import { fetchArticleDetail } from '@/api'
import { renderMarkdown } from '@/utils/markdown'

const route = useRoute()
const router = useRouter()

const article = ref(null)
const loading = ref(true)
const liked = ref(false)
const comments = ref([])
const commentContent = ref('')
const commentName = ref('')

const contentHtml = computed(() =>
  article.value ? renderMarkdown(article.value.content) : ''
)

onMounted(async () => {
  try {
    article.value = await fetchArticleDetail(route.params.id)
    // 本地演示数据：评论数取文章 commentCount
    comments.value = Array.from({ length: Math.min(article.value.commentCount, 3) }, (_, i) => ({
      id: i + 1,
      name: ['阿哲', '小鹿', '大树'][i % 3],
      content: [
        '写得很清晰，收藏了，期待下一篇！',
        '正好在学这一块，帮助很大，感谢分享。',
        '有个小建议，可以补充一下实际业务场景的例子。'
      ][i % 3],
      createdAt: dayjs(article.value.createdAt)
        .add(i + 1, 'day')
        .format('YYYY-MM-DD HH:mm')
    }))
  } catch (e) {
    ElMessage.error(e.message || '文章加载失败')
    router.replace('/')
  } finally {
    loading.value = false
  }
})

function toggleLike() {
  liked.value = !liked.value
  article.value.likes += liked.value ? 1 : -1
  ElMessage.success(liked.value ? '感谢喜欢 ❤️' : '已取消喜欢')
}

function scrollToComments() {
  document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })
}

function submitComment() {
  comments.value.unshift({
    id: Date.now(),
    name: commentName.value.trim() || '匿名访客',
    content: commentContent.value.trim(),
    createdAt: dayjs().format('YYYY-MM-DD HH:mm')
  })
  commentContent.value = ''
  ElMessage.success('评论发表成功')
}
</script>

<style lang="scss" scoped>
.detail-body {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 32px;
  padding-top: 36px;
}

.main {
  min-width: 0;
}

.article {
  padding: 8px 0 12px;
}

.article-header {
  margin-bottom: 28px;
}

.article-title {
  font-size: 30px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 14px;
}

.article-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.article-meta span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.article-meta .category {
  color: var(--color-primary);
  background: var(--color-hover);
  padding: 2px 10px;
  border-radius: 12px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 32px 0;
  padding: 20px 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.tag-link {
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.tag-link:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.article-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 8px 0 20px;
}

.mr4 {
  margin-right: 4px;
}

.comments {
  margin-top: 36px;
}

.comment-form {
  margin-bottom: 24px;
}

.comment-form-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.name-input {
  width: 160px;
  margin-right: auto;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.comment-item {
  display: flex;
  gap: 14px;
  padding: 16px;
  background: var(--color-bg-soft);
  border-radius: var(--radius-md);
}

.avatar {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.comment-main {
  flex: 1;
}

.comment-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.name {
  font-weight: 500;
  font-size: 14px;
}

.comment-content {
  font-size: 14px;
  color: var(--color-text-secondary);
}

@media (max-width: 900px) {
  .detail-body {
    grid-template-columns: 1fr;
  }
  .article-title {
    font-size: 24px;
  }
}
</style>
