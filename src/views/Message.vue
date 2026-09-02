<template>
  <div class="message">
    <div class="container message-inner">
      <div class="page-head">
        <h1 class="page-title serif">留言板</h1>
        <p class="muted">欢迎留下你的足迹 · 共 {{ list.length }} 条留言</p>
      </div>

      <div class="leave-form">
        <el-input
          v-model="form.nickname"
          size="large"
          maxlength="20"
          show-word-limit
          placeholder="昵称"
        />
        <el-input
          v-model="form.content"
          type="textarea"
          :rows="4"
          maxlength="300"
          show-word-limit
          placeholder="想说的话…"
        />
        <div class="form-footer">
          <el-button type="primary" :disabled="!canSubmit" @click="submit">发表留言</el-button>
        </div>
      </div>

      <el-skeleton v-if="loading" :rows="8" animated />
      <div v-else class="message-list">
        <div v-for="m in list" :key="m.id" class="message-item">
          <span
            class="avatar-text"
            :style="{ background: avatarColor(m.nickname) }"
          >
            {{ m.nickname.slice(0, 1) }}
          </span>
          <div class="message-main">
            <div class="message-head">
              <span class="nickname">{{ m.nickname }}</span>
              <span class="muted">{{ m.createdAt }}</span>
            </div>
            <p class="message-content">{{ m.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import { fetchMessages, submitMessage } from '@/api'

const loading = ref(true)
const list = ref([])
const form = reactive({ nickname: '', content: '' })

const canSubmit = computed(() => form.content.trim().length > 0)

const palette = ['#4a6cf7', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

function avatarColor(name) {
  let sum = 0
  for (const ch of name) sum += ch.charCodeAt(0)
  return palette[sum % palette.length]
}

onMounted(async () => {
  try {
    list.value = await fetchMessages()
  } finally {
    loading.value = false
  }
})

async function submit() {
  const payload = {
    nickname: form.nickname.trim() || '匿名访客',
    content: form.content.trim()
  }
  await submitMessage(payload)
  list.value.unshift({
    id: Date.now(),
    ...payload,
    createdAt: dayjs().format('YYYY-MM-DD HH:mm')
  })
  form.nickname = ''
  form.content = ''
  ElMessage.success('留言发表成功，感谢你的支持！')
}
</script>

<style lang="scss" scoped>
.message {
  padding-top: 40px;
}

.message-inner {
  max-width: 680px;
}

.page-head {
  margin-bottom: 24px;
}

.page-title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 8px;
}

.leave-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px;
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: 30px;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  transition: var(--transition);
}

.message-item:hover {
  box-shadow: var(--shadow-sm);
}

.avatar-text {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
}

.message-main {
  flex: 1;
}

.message-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.nickname {
  font-weight: 600;
  font-size: 14.5px;
}

.message-content {
  font-size: 14.5px;
  color: var(--color-text-secondary);
  white-space: pre-wrap;
}
</style>
