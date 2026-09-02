import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/views/ArticleDetail.vue'),
    meta: { title: '文章详情' }
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('@/views/Archive.vue'),
    meta: { title: '归档' }
  },
  {
    path: '/microblog',
    name: 'microblog',
    component: () => import('@/views/Microblog.vue'),
    meta: { title: '微博' }
  },
  {
    path: '/friends',
    name: 'friends',
    component: () => import('@/views/Friends.vue'),
    meta: { title: '友链' }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/Message.vue'),
    meta: { title: '留言板' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const siteName = '宋健的博客'
  document.title = to.meta.title ? `${to.meta.title} · ${siteName}` : siteName
})

export default router
