// ============ 模拟文章数据 ============
// 生产环境可替换为真实后端 API，字段保持一致即可

export const categories = ['前端', '后端', '架构', '随笔']

export const articles = [
  {
    id: 1,
    title: '从零搭建 Vue 3 个人博客：工程化实践记录',
    summary:
      '记录使用 Vite + Vue 3 + Element Plus 搭建个人博客的完整过程，包括工程目录设计、路由懒加载、Pinia 状态管理以及构建优化的一些思考。',
    content: `
# 从零搭建 Vue 3 个人博客：工程化实践记录

最近一直在琢磨如何搭建一个属于自己的个人博客，一方面是记录技术沉淀，另一方面也想借此机会完整地走一遍 Vue 3 的工程化流程。这篇文章记录下我的实践过程与思考。

## 为什么选择 Vue 3

- **Composition API** 让逻辑组织更清晰，尤其是复杂页面
- **\<script setup\>** 语法糖让组件代码更加简洁
- **Vite** 的开发体验极佳，热更新几乎无感

## 工程目录设计

一个清晰的项目结构是长期维护的基础。我采用了按功能模块划分的方式：

\`\`\`text
src/
├── api/          # 接口封装层
├── components/   # 通用组件
├── router/       # 路由配置
├── stores/       # 状态管理
├── styles/       # 全局样式
└── views/        # 页面组件
\`\`\`

## 路由懒加载

使用动态导入配合 \`defineAsyncComponent\`，让首屏只加载必要代码，其余页面按需加载：

\`\`\`js
{
  path: '/archive',
  component: () => import('@/views/Archive.vue')
}
\`\`\`

## 小结

搭建一个博客的过程，本质上也是一次自我梳理的过程。从项目结构到代码规范，每一步选择都会影响后续的开发体验。希望这篇记录能给你一些参考。
    `.trim(),
    category: '前端',
    tags: ['Vue3', 'Vite', '工程化'],
    createdAt: '2026-08-20',
    views: 1286,
    likes: 86,
    commentCount: 12,
    readingTime: 6,
    featured: true
  },
  {
    id: 2,
    title: '深入理解 Vue 3 响应式原理',
    summary:
      '从 Proxy 出发，剖析 Vue 3 响应式系统如何追踪依赖、触发更新，并对比 Vue 2 的 Object.defineProperty 实现差异。',
    content: `
# 深入理解 Vue 3 响应式原理

Vue 3 的响应式系统是其核心之一，本文从源码层面带你理解 \`reactive\`、\`ref\`、\`effect\` 是如何协作的。

## Proxy vs Object.defineProperty

Vue 2 使用 \`Object.defineProperty\` 只能拦截属性的**读写**，无法感知新增属性与数组索引的变化。Vue 3 改用 \`Proxy\` 后：

- 可以拦截**任意操作**，包括属性新增、删除、in 判断等
- 不需要提前遍历对象递归劫持，而是**惰性代理**
- 天然支持 Map、Set 等集合类型

## 依赖收集与触发

响应式数据在被读取时会通过 \`track\` 收集当前活跃的 effect 作为依赖；数据变更时通过 \`trigger\` 通知所有依赖执行更新。

\`\`\`js
let activeEffect

function track(target, key) {
  if (activeEffect) {
    const deps = getDep(target, key)
    deps.add(activeEffect)
  }
}

function trigger(target, key) {
  getDep(target, key).forEach(effect => effect())
}
\`\`\`

## ref 与 reactive 的区别

- \`reactive\` 返回对象本身的响应式代理
- \`ref\` 会包装一个 \`.value\`，在模板中自动解包

## 总结

理解响应式原理对排查"数据更新了但视图没变"这类问题非常有帮助。关键在于理解**副作用**与**依赖**的关系。
    `.trim(),
    category: '前端',
    tags: ['Vue3', '源码', '响应式'],
    createdAt: '2026-08-10',
    views: 2340,
    likes: 152,
    commentCount: 24,
    readingTime: 8,
    featured: true
  },
  {
    id: 3,
    title: 'Node.js 中的事件循环与异步 I/O',
    summary:
      '理解 Node.js 单线程模型下的事件循环机制，掌握 setImmediate、process.nextTick、Promise 的执行顺序。',
    content: `
# Node.js 中的事件循环与异步 I/O

Node.js 之所以能以单线程支撑高并发，核心就在于它的**事件循环（Event Loop）** 与异步非阻塞 I/O 模型。

## 事件循环的六个阶段

事件循环按固定顺序循环执行以下阶段：

1. **timers**：执行 \`setTimeout\` / \`setInterval\` 回调
2. **pending callbacks**：执行推迟到下一轮的 I/O 回调
3. **idle / prepare**：内部使用
4. **poll**：检索新的 I/O 事件，执行 I/O 回调
5. **check**：执行 \`setImmediate\` 回调
6. **close callbacks**：执行 close 事件回调

## process.nextTick 的优先级

\`process.nextTick\` 的回调会在**当前操作结束、下一阶段开始前**立即执行，因此它的优先级高于微任务中的 Promise。

\`\`\`js
setImmediate(() => console.log('immediate'))
setTimeout(() => console.log('timeout'))
process.nextTick(() => console.log('nextTick'))

// 输出顺序：nextTick -> timeout/immediate（两者顺序不定）
\`\`\`

## 为什么单线程能高并发

Node.js 把耗时操作（文件读取、网络请求）交给底层线程池处理，主线程只负责调度，从而用极少资源支撑大量并发连接。

## 结语

事件循环是 Node.js 的"心脏"，理解它的调度顺序能帮你写出性能更优、行为更可预测的代码。
    `.trim(),
    category: '后端',
    tags: ['Node.js', '事件循环', '异步'],
    createdAt: '2026-07-28',
    views: 1768,
    likes: 98,
    commentCount: 15,
    readingTime: 7
  },
  {
    id: 4,
    title: '如何设计高可用的微服务架构',
    summary:
      '从服务拆分、容错降级、链路追踪、配置中心等维度，总结微服务架构设计与落地中的关键要点。',
    content: `
# 如何设计高可用的微服务架构

微服务化带来的不仅是灵活性，还有分布式环境下的诸多挑战。本文梳理架构设计中的几个核心问题。

## 服务拆分的粒度

拆分的目的是**独立部署与独立伸缩**，而不是"拆得越细越好"。建议按**业务领域边界**拆分，遵循高内聚、低耦合原则。

## 容错与降级

- 超时控制：避免请求无限阻塞
- 熔断器：快速失败，防止雪崩
- 限流：保护下游系统
- 舱壁隔离：故障域隔离

## 链路追踪

一次请求会横跨多个服务，需要统一的 **traceId** 贯穿全链路，配合日志聚合才能快速定位问题。

## 配置中心与注册中心

配置集中管理、动态刷新；服务通过注册中心实现服务发现与负载均衡，减少运维成本。

## 落地建议

> 先保证监控与可观测性，再谈架构演进。

没有完善的监控体系，微服务架构会变成一个"黑盒"，出问题难以定位。
    `.trim(),
    category: '架构',
    tags: ['微服务', '高可用', '分布式'],
    createdAt: '2026-07-05',
    views: 2105,
    likes: 130,
    commentCount: 19,
    readingTime: 9
  },
  {
    id: 5,
    title: 'ESLint + Prettier 打造统一的前端代码规范',
    summary:
      '在团队中推行代码规范的最佳实践，从配置、接入 Git 钩子到 CI 强制检查的完整链路。',
    content: `
# ESLint + Prettier 打造统一的前端代码规范

代码规范的价值在于**降低协作成本**。本文分享如何用 ESLint + Prettier 构建一套可落地的规范体系。

## 两者的职责分工

- **ESLint**：检查代码质量问题（未使用变量、潜在 bug、最佳实践）
- **Prettier**：统一代码格式（缩进、引号、分号、换行）

> 规则简单清晰：ESLint 管"对不对"，Prettier 管"好不好看"。

## 配置示例

\`\`\`js
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none"
}
\`\`\`

## 接入 Git 钩子

使用 \`lint-staged\` 配合 \`husky\`，在提交前只检查暂存区的文件，既保证质量又不拖慢速度。

## CI 强制检查

在流水线中执行 \`eslint . --max-warnings 0\`，让不符合规范的代码无法合并到主干，形成硬性约束。

## 结语

规范的价值在于**减少"这行代码为什么这么写"的争论**，把精力留给真正有价值的问题。
    `.trim(),
    category: '前端',
    tags: ['ESLint', 'Prettier', '工程化'],
    createdAt: '2026-06-18',
    views: 934,
    likes: 47,
    commentCount: 8,
    readingTime: 5
  },
  {
    id: 6,
    title: '一次线上 OOM 排查的完整复盘',
    summary:
      '从监控告警到堆转储分析，完整还原一次 Java 服务内存溢出问题的定位与解决过程，以及复盘后的改进措施。',
    content: `
# 一次线上 OOM 排查的完整复盘

某个周三凌晨，监控系统发来告警：**某服务的堆内存使用率持续超过 95%**。这篇复盘记录整个排查过程。

## 现象与初步判断

- 接口 P99 延迟从 80ms 飙升至 3s
- GC 日志显示频繁发生 Full GC
- 老年代持续增长且无法回收

初步判断是内存泄漏或对象堆积导致。

## 堆转储分析

使用 \`jmap\` 导出堆快照，配合 MAT 分析：

1. 发现一个业务缓存 Map 的 Entry 数量异常巨大
2. 缓存 key 使用了**无界的集合**作为组成部分
3. 缓存没有设置过期与淘汰策略

## 根因定位

问题出在缓存 key 设计不当：高基数场景下 key 不断膨胀，导致缓存无限增长，最终内存溢出。

## 修复与改进

- 缓存增加**容量上限与淘汰策略**
- key 改为规范化、低基数的结构
- 增加缓存命中率监控，提前发现异常

## 复盘总结

> 凡是"会增长的东西"，都要考虑它的上限。

这次事故让我养成了几个习惯：上线前审查缓存设计、为关键服务配置内存告警、定期做压测验证容量模型。
    `.trim(),
    category: '随笔',
    tags: ['JVM', '排查', '复盘'],
    createdAt: '2026-05-22',
    views: 1589,
    likes: 112,
    commentCount: 17,
    readingTime: 10
  },
  {
    id: 7,
    title: 'TypeScript 类型体操入门：从工具类型到条件类型',
    summary:
      '通过大量示例掌握 TypeScript 的高级类型能力，理解 infer、条件类型、映射类型在真实项目中的应用。',
    content: `
# TypeScript 类型体操入门

TypeScript 的类型系统强大到可以进行"类型计算"，掌握这些能力能显著提升代码的健壮性与可维护性。

## 常用工具类型

\`\`\`ts
// 部分属性可选
Partial<T>
// 必选属性
Required<T>
// 只读
Readonly<T>
// 挑选属性
Pick<T, K extends keyof T>
// 排除属性
Omit<T, K extends keyof T>
\`\`\`

## 条件类型与 infer

\`\`\`ts
type Unwrap<T> = T extends Promise<infer U> ? U : T

type A = Unwrap<Promise<string>> // string
\`\`\`

## 映射类型

\`\`\`ts
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
}
\`\`\`

## 实战建议

类型体操虽有趣，但**可读性优先**。复杂的类型表达式建议拆解并添加注释，避免成为团队理解的负担。

## 总结

类型系统是文档，也是约束。合理运用高级类型，可以让接口契约在编译期就被校验，减少运行时错误。
    `.trim(),
    category: '前端',
    tags: ['TypeScript', '类型', '进阶'],
    createdAt: '2026-04-30',
    views: 1210,
    likes: 75,
    commentCount: 11,
    readingTime: 8
  },
  {
    id: 8,
    title: '2026 年上半年的读书与生活随想',
    summary:
      '记录上半年读过的几本书与一些生活感悟，关于专注、关于慢下来，也关于持续学习的意义。',
    content: `
# 2026 年上半年的读书与生活随想

敲代码的日子久了，偶尔也想想代码之外的事。这篇不是什么技术文章，只是一些零散的记录。

## 关于专注

这个时代最稀缺的资源，或许不是时间，而是**专注**。手机不断打断我们，让深度工作变得奢侈。上半年我开始刻意练习：每次只做一件事，把手机放远，用整块时间处理最重要的工作。

## 关于慢下来

技术的浪潮一波接一波，焦虑常常来源于"怕错过"。后来我想通了：**比起追新，更重要的是把基础打扎实**。底层能力不会过时，它会成为你理解一切新技术的根基。

## 上半年读的书

- 《纳瓦尔宝典》—— 关于财富与幸福的底层逻辑
- 《代码整洁之道》—— 每次重读都有新的体会
- 《置身事内》—— 理解中国经济发展的一个视角

## 写在最后

写博客这件事本身，就是一种"慢下来"。把思考沉淀成文字，既是对自己的复盘，也可能在某个时刻帮助到另一个人。

> 人生没有白走的路，每一步都算数。
    `.trim(),
    category: '随笔',
    tags: ['读书', '生活', '随想'],
    createdAt: '2026-03-14',
    views: 689,
    likes: 64,
    commentCount: 9,
    readingTime: 4
  },
  {
    id: 9,
    title: 'RESTful API 设计规范与最佳实践',
    summary:
      '资源命名、状态码、版本管理、错误处理，一份面向团队落地的 RESTful API 设计清单。',
    content: `
# RESTful API 设计规范与最佳实践

一份好的 API 设计，能让前后端协作顺畅无比。本文整理一份可落地的设计清单。

## 资源命名

- 使用名词复数：\`/users\`、\`/articles\`
- 使用小写与连字符，避免大写
- 用层级表达从属关系：\`/users/:id/posts\`

## HTTP 方法语义

| 方法 | 语义 | 幂等 |
| ---- | ---- | ---- |
| GET  | 查询 | 是 |
| POST | 创建 | 否 |
| PUT  | 全量更新 | 是 |
| PATCH | 部分更新 | 是 |
| DELETE | 删除 | 是 |

## 错误处理

统一错误结构，让客户端可以程序化处理：

\`\`\`json
{
  "code": 40400,
  "message": "文章不存在",
  "details": {}
}
\`\`\`

## 版本管理

推荐使用 URL 版本号 \`/api/v1\`，简单直观，便于服务端控制兼容性。

## 分页约定

\`/articles?page=1&page_size=20\`，响应中返回总数与页码信息，方便前端渲染分页组件。

## 结语

**一致性**是 API 设计最重要的原则。无论采用何种约定，只要全团队遵循同一套规则，协作效率就会大幅提升。
    `.trim(),
    category: '后端',
    tags: ['RESTful', 'API', '规范'],
    createdAt: '2026-02-08',
    views: 1456,
    likes: 88,
    commentCount: 13,
    readingTime: 6
  },
  {
    id: 10,
    title: 'CSS 布局进化史：从浮动到 Grid 再到 Subgrid',
    summary:
      '梳理 CSS 布局方案的发展脉络，理解 Flexbox、Grid 与 Subgrid 的适用场景与选择依据。',
    content: `
# CSS 布局进化史

布局是 CSS 的核心议题，从 Table 布局到浮动布局，再到 Flexbox 与 Grid，每一次进化都让前端工程师更从容。

## 浮动布局时代

Float 最初用于文字环绕，却被用于整页布局，需要各种 hack 来清除浮动。时代虽远去，但 \`float\` 仍在一些场景发挥作用。

## Flexbox：一维布局

Flexbox 擅长**一维**排列，适合导航栏、按钮组、卡片内元素对齐：

\`\`\`css
.flex-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
\`\`\`

## Grid：二维布局

Grid 面向**二维**网格，天生适合页面整体骨架与复杂区域划分：

\`\`\`css
.grid-main {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
}
\`\`\`

## Subgrid：嵌套网格对齐

Subgrid 让子网格继承父网格的轨道定义，实现复杂页面中**跨层级的对齐**，解决了嵌套网格对不齐的痛点。

## 如何选择

- 单行/单列内排布 → **Flexbox**
- 二维区域划分 → **Grid**
- 需要与父网格精确对齐 → **Subgrid**

## 结语

工具没有好坏，只有合适与否。理解每种布局方案的适用边界，才能写出简洁、健壮的样式。
    `.trim(),
    category: '前端',
    tags: ['CSS', '布局', 'Grid'],
    createdAt: '2026-01-12',
    views: 1087,
    likes: 71,
    commentCount: 10,
    readingTime: 7
  }
]

export function getArticleById(id) {
  return articles.find((a) => String(a.id) === String(id)) || null
}
