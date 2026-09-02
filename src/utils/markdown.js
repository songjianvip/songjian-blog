import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

// 配置 marked：启用代码高亮与 GFM
marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    }
  })
)

marked.setOptions({
  gfm: true,
  breaks: false
})

/** 将 Markdown 字符串渲染为 HTML */
export function renderMarkdown(md = '') {
  return marked.parse(md)
}
