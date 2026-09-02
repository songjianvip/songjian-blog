// ============ API 封装层 ============
// 当前使用本地 Mock 数据模拟异步请求，后续接入真实后端时，
// 只需将函数内部替换为 axios 请求并保持返回结构一致即可。

import { articles, getArticleById, categories } from '@/mock/articles'
import { microblogs } from '@/mock/microblogs'
import { friends, friendCategories } from '@/mock/friends'
import { messages } from '@/mock/messages'

const delay = (ms = 260) => new Promise((resolve) => setTimeout(resolve, ms))

/** 获取文章列表，支持分类、标签过滤与分页 */
export async function fetchArticles({ category = '', tag = '', page = 1, pageSize = 6 } = {}) {
  await delay()
  let list = [...articles]
  if (category && category !== '全部') {
    list = list.filter((a) => a.category === category)
  }
  if (tag) {
    list = list.filter((a) => a.tags.includes(tag))
  }
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  const total = list.length
  const start = (page - 1) * pageSize
  const pageData = list.slice(start, start + pageSize)
  return { list: pageData, total, page, pageSize }
}

/** 获取文章详情 */
export async function fetchArticleDetail(id) {
  await delay(320)
  const article = getArticleById(id)
  if (!article) {
    throw new Error('文章不存在或已删除')
  }
  return article
}

/** 获取侧边栏信息：分类、标签、近期文章 */
export async function fetchSidebarInfo() {
  await delay(120)
  const tagCountMap = {}
  articles.forEach((a) => {
    a.tags.forEach((t) => {
      tagCountMap[t] = (tagCountMap[t] || 0) + 1
    })
  })
  const tags = Object.entries(tagCountMap)
    .map(([name, count]) => ({ name, count }))
    .sort((x, y) => y.count - x.count)
  return {
    categories: categories.map((c) => ({
      name: c,
      count: articles.filter((a) => a.category === c).length
    })),
    tags,
    recentArticles: [...articles]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
  }
}

/** 归档：按年份分组的时间线 */
export async function fetchArchive() {
  await delay()
  const group = {}
  articles.forEach((a) => {
    const year = a.createdAt.slice(0, 4)
    if (!group[year]) group[year] = []
    group[year].push(a)
  })
  return Object.entries(group)
    .sort((x, y) => Number(y[0]) - Number(x[0]))
    .map(([year, list]) => ({
      year,
      list: list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }))
}

/** 微博动态列表 */
export async function fetchMicroblogs() {
  await delay()
  return [...microblogs]
}

/** 友链列表 */
export async function fetchFriends() {
  await delay()
  return { list: friends, categories: friendCategories }
}

/** 留言列表 */
export async function fetchMessages() {
  await delay()
  return [...messages]
}

/** 新增留言（本地 mock，刷新后恢复初始数据） */
export async function submitMessage(payload) {
  await delay(400)
  return { ok: true, data: payload }
}
