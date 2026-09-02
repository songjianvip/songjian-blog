<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand serif">宋健的博客</div>
      <p class="footer-desc">记录技术、生活与思考 · 持续学习，持续输出</p>
      <div class="footer-links">
        <a v-for="l in links" :key="l.name" :href="l.url" target="_blank" rel="noopener">
          {{ l.name }}
        </a>
      </div>
      <p class="footer-copy muted">
        © {{ year }} 宋健 · Powered by Vue 3 & Element Plus
      </p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()

const links = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'RSS', url: '/' },
  { name: 'Email', url: 'mailto:songjian@example.com' }
]
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 60px;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-soft);
}

.footer-inner {
  max-width: var(--container-wide);
  margin: 0 auto;
  padding: 40px 24px 32px;
  text-align: center;
}

.footer-brand {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.footer-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 16px;
}

.footer-links a {
  font-size: 14px;
  color: var(--color-text-muted);
}

.footer-links a:hover {
  color: var(--color-primary);
}
</style>
