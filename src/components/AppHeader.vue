<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/" class="brand">
        <span class="brand-logo serif">宋</span>
        <span class="brand-name serif">宋健的博客</span>
      </router-link>

      <nav class="nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
        >
          {{ item.name }}
        </router-link>
      </nav>

      <el-button class="menu-btn" text circle @click="drawer = true" aria-label="菜单">
        <el-icon :size="20"><Menu /></el-icon>
      </el-button>
    </div>

    <el-drawer
      v-model="drawer"
      direction="rtl"
      size="240px"
      :with-header="false"
      append-to-body
    >
      <div class="drawer-nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="drawer-item"
          :class="{ active: isActive(item.path) }"
          @click="drawer = false"
        >
          {{ item.name }}
        </router-link>
      </div>
    </el-drawer>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const drawer = ref(false)

const navItems = [
  { path: '/', name: '首页' },
  { path: '/archive', name: '归档' },
  { path: '/microblog', name: '微博' },
  { path: '/friends', name: '友链' },
  { path: '/message', name: '留言板' }
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.header-inner {
  max-width: var(--container-wide);
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text);
}

.brand-logo {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: #fff;
  font-size: 18px;
  border-radius: 8px;
}

.brand-name {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-item {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 15px;
  color: var(--color-text-secondary);
  transition: var(--transition);
}

.nav-item:hover {
  color: var(--color-primary);
  background: var(--color-hover);
}

.nav-item.active {
  color: var(--color-primary);
  background: var(--color-hover);
  font-weight: 500;
}

.menu-btn {
  display: none;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
}

.drawer-item {
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 16px;
  color: var(--color-text-secondary);
}

.drawer-item.active {
  color: var(--color-primary);
  background: var(--color-hover);
  font-weight: 500;
}

@media (max-width: 640px) {
  .nav {
    display: none;
  }
  .menu-btn {
    display: inline-flex;
  }
}
</style>
