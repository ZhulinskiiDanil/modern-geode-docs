import type { Article, ProjectTreeNode, VersionId } from '../types/docs'

/** Folder hierarchy comes from the same article manifest as routes and search. */
export function projectTree(articles: Article[], version: VersionId): ProjectTreeNode[] {
  const roots: ProjectTreeNode[] = []
  for (const article of articles.filter((a) => a.projectPath && a.versions.includes(version))) {
    const parts = article.projectPath!.replace(/\/$/, '').split('/')
    let siblings = roots
    let path = ''
    parts.forEach((part, index) => {
      const directory = index < parts.length - 1 || article.projectPath!.endsWith('/')
      path += part + (directory ? '/' : '')
      let node = siblings.find((n) => n.path === path)
      if (!node) {
        node = { path, name: part + (directory ? '/' : ''), directory, children: [] }
        siblings.push(node)
      }
      if (index === parts.length - 1) node.slug = article.slug
      siblings = node.children
    })
  }
  return roots
}
