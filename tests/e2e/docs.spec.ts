import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('language → version → search → tutorial → copy', async ({ page }) => {
  await page.goto('/en/v5')
  await page.getByLabel('Language', { exact: true }).selectOption('ru')
  await expect(page).toHaveURL(/\/ru\/v5$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ваша новая идея')
  await page.getByLabel('Версия SDK', { exact: true }).selectOption('v4')
  await expect(page).toHaveURL(/\/ru\/v4$/)
  await expect(
    page.getByText('Вы читаете архив v4. Эти страницы больше не обновляются.').first(),
  ).toBeVisible()
  await page.getByLabel('Версия SDK', { exact: true }).selectOption('v5')
  await expect(page).toHaveURL(/\/ru\/v5$/)
  await expect(page.getByLabel('Язык', { exact: true })).toBeEnabled()
  await page.keyboard.press('Control+k')
  const search = page.getByRole('combobox', { name: 'Поиск документации' })
  await search.fill('Создайте первый мод')
  await expect(page.getByRole('dialog').getByRole('option')).toHaveCount(1)
  await search.press('Enter')
  await expect(page).toHaveURL(/\/ru\/v5\/get-started\/first-mod$/)
  await expect(
    page.getByRole('heading', { name: 'Ожидаемый результат', exact: true }),
  ).toBeVisible()
  const block = page.locator('.code-block').filter({ hasText: 'src/main.cpp' })
  await block.getByRole('button', { name: 'Копировать', exact: true }).click()
  await expect(block.getByRole('button', { name: 'Скопировано!' })).toBeVisible()
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain('class $modify(HelloMenu, MenuLayer)')
  await page.getByLabel('Язык', { exact: true }).selectOption('es')
  await expect(page).toHaveURL(/\/es\/v5\/get-started\/first-mod$/)
  await expect(page.getByRole('heading', { name: 'Qué vamos a crear', exact: true })).toBeVisible()
})
test('state, filters, API and project tree', async ({ page }) => {
  await page.goto('/en/v5/publishing/checklist')
  const box = page.getByRole('checkbox').first()
  await box.check()
  await page.reload()
  await expect(page.getByRole('checkbox').first()).toBeChecked()
  await page.getByRole('button', { name: 'Toggle color theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.goto('/en/v5/examples/library')
  await page.getByLabel('Difficulty', { exact: true }).selectOption('intermediate')
  await expect(page.locator('.example-card')).toHaveCount(1)
  await page.goto('/en/v5/api/classes')
  await page.getByRole('textbox', { name: 'Search symbols…', exact: true }).fill('getSavedValue')
  await expect(page.locator('.symbol-list button')).toHaveCount(1)
  await page.locator('.symbol-list').getByRole('button', { name: /Mod::getSavedValue/ }).click()
  await expect(page.locator('.symbol-detail h2')).toHaveText('Mod::getSavedValue')
  await expect(page).toHaveURL(/#mod-get-saved-value$/)
  await page.goto('/en/v5/structure/project')
  await page.locator('.file-tree button').filter({ hasText: 'mod.json' }).click()
  await expect(page.locator('.file-explanation')).toContainText('yourname.hello-geode')
})
test('mobile navigation, no overflow, and visual capture', async ({ page }) => {
  await page.goto('/en/v5')
  await expect(page.getByLabel('Language', { exact: true })).toBeEnabled()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.screenshot({ path: 'test-results/desktop.png', fullPage: true })
  await page.setViewportSize({ width: 390, height: 844 })
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
    .toBe(true)
  await page.getByRole('button', { name: 'Navigation menu', exact: true }).click()
  await page
    .locator('.sidebar')
    .getByRole('link', { name: 'Create your first mod', exact: true })
    .click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Create your first mod')
  await expect(page.locator('.sidebar')).not.toBeVisible()
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
    .toBe(true)
  await page.screenshot({ path: 'test-results/mobile.png', fullPage: false })
})
test('WCAG AA automated checks on dark and light home', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/en/v5')
  await expect(page.getByLabel('Language', { exact: true })).toBeEnabled()
  for (const theme of ['dark', 'light']) {
    if (theme === 'light') await page.getByRole('button', { name: 'Toggle color theme' }).click()
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(
      audit.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
      })),
    ).toEqual([])
  }
})
