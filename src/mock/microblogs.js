// ============ 模拟微博（短动态）数据 ============

export const microblogs = [
  {
    id: 1,
    content:
      '今天把博客的响应式布局又调了一版，在手机上阅读文章终于舒服多了。细节决定体验，多花点时间值得。📱',
    images: [],
    createdAt: '2026-08-30 09:24',
    likes: 12,
    comments: [
      { name: '阿哲', content: '这个布局确实舒服，学习了！', createdAt: '2026-08-30 10:02' }
    ]
  },
  {
    id: 2,
    content:
      '分享一个调试小技巧：排查前端问题时，先看浏览器 Network 面板，再看 Console，最后才考虑加断点。多数"诡异 bug"其实在网络请求或数据格式上就有答案。',
    images: [],
    createdAt: '2026-08-26 22:10',
    likes: 34,
    comments: []
  },
  {
    id: 3,
    content: '整理书架时翻到三年前的笔记本，里面记录了一个当时觉得很"天才"的想法，现在看简直是灾难现场。时间真的是最好的老师。📚',
    images: [],
    createdAt: '2026-08-18 20:45',
    likes: 21,
    comments: [
      { name: '小鹿', content: '哈哈，谁还不是从黑历史走过来的', createdAt: '2026-08-18 21:30' },
      { name: '老周', content: '说明你在成长，好事', createdAt: '2026-08-19 08:12' }
    ]
  },
  {
    id: 4,
    content:
      '今天研究了 Subgrid 的兼容性，主流浏览器基本都支持了，在复杂表单布局里用起来真的很爽。推荐做后台的同学试试。',
    images: [],
    createdAt: '2026-08-12 14:33',
    likes: 18,
    comments: []
  },
  {
    id: 5,
    content: '跑步第五周，配速终于稳定在 6 分左右了。写代码是脑力的修行，跑步是体力的修行，两者都值得坚持。🏃',
    images: [],
    createdAt: '2026-08-05 19:50',
    likes: 45,
    comments: [
      { name: '大树', content: '配速可以啊，求带！', createdAt: '2026-08-05 20:11' }
    ]
  },
  {
    id: 6,
    content: '遇到一个很有意思的问题：同样的接口，在不同网络环境下表现差异很大。排查下来发现是第三方 SDK 内置了超时配置。生产环境一定要覆盖网络回退场景。',
    images: [],
    createdAt: '2026-07-29 11:20',
    likes: 27,
    comments: []
  }
]
