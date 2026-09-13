import { describe, it, expect } from 'vitest'
import { projectTree } from '../../app/utils/project-tree'
import { articles } from '../../app/data/manifest'
describe('project documentation navigation', () => {
  it('nests the main source under src and links both to real articles', () => {
    const tree = projectTree(articles, 'v5')
    const src = tree.find((n) => n.path === 'src/')
    expect(src?.slug).toBe('structure/src')
    expect(src?.children.map((n) => [n.name, n.slug])).toEqual([
      ['main.cpp', 'structure/src/main-cpp'],
    ])
    expect(tree.find((n) => n.path === 'mod.json')?.slug).toBe('structure/mod-json')
    expect(tree.every((n) => n.slug && articles.some((a) => a.slug === n.slug))).toBe(true)
  })
  it('does not create fictitious project files for the archive', () =>
    expect(projectTree(articles, 'v4')).toEqual([]))
})
