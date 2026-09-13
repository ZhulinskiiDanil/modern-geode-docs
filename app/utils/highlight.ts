import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
let highlighter: ReturnType<typeof createHighlighterCore> | undefined
export async function highlight(code: string, language: string, lines: number[] = []) {
  highlighter ??= createHighlighterCore({
    themes: [import('shiki/themes/github-dark.mjs')],
    langs: [
      import('shiki/langs/cpp.mjs'),
      import('shiki/langs/json.mjs'),
      import('shiki/langs/bash.mjs'),
      import('shiki/langs/cmake.mjs'),
      import('shiki/langs/markdown.mjs'),
    ],
    engine: createJavaScriptRegexEngine(),
  })
  const instance = await highlighter
  return instance.codeToHtml(code, {
    lang: ['cpp', 'json', 'bash', 'cmake', 'markdown'].includes(language) ? language : 'text',
    theme: 'github-dark',
    transformers: [
      {
        line(node, line) {
          if (lines.includes(line)) this.addClassToHast(node, 'highlight')
        },
      },
    ],
  })
}
