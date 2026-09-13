import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('language → version → search → tutorial → copy', async ({ page }) => {
  await page.goto('/en/v5')
  await page.getByLabel('Language', { exact: true }).click()
  await page.getByRole('menuitemradio', { name: 'Русский' }).click()
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
  await page.getByLabel('Язык', { exact: true }).click()
  await page.getByRole('menuitemradio', { name: 'Español' }).click()
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
  await page
    .locator('.symbol-list')
    .getByRole('button', { name: /Mod::getSavedValue/ })
    .click()
  await expect(page.locator('.symbol-detail h2')).toHaveText('Mod::getSavedValue')
  await expect(page).toHaveURL(/#mod-get-saved-value$/)
  await page.goto('/en/v5/structure/project')
  await page
    .locator('.project-navigation')
    .getByRole('link', { name: 'mod.json', exact: true })
    .click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('mod.json')
  await expect(page.locator('.prose')).toContainText('yourname.hello-geode')
})
test('architecture tabs reveal linked project files and preserve article context', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/ru/v5')
  await page.locator('.top-nav').getByRole('link', { name: 'Архитектура', exact: true }).click()
  const tree = page.locator('.project-navigation')
  await expect(tree).toBeVisible()
  await expect(
    page.locator('.sidebar-overview, .sidebar-help, .sidebar-section-label, .project-nav-root'),
  ).toHaveCount(0)
  await expect(page.locator('.breadcrumbs, .reading-progress')).toHaveCount(0)
  await tree.getByRole('button', { name: 'Свернуть src/' }).click()
  await expect(tree.getByRole('link', { name: 'main.cpp', exact: true })).not.toBeVisible()
  await tree.getByRole('button', { name: 'Развернуть src/' }).click()
  await expect(page.locator('.sidebar')).not.toContainText('Понятно о hooks')
  await tree.getByRole('link', { name: 'main.cpp', exact: true }).click()
  await expect(page).toHaveURL(/\/ru\/v5\/structure\/src\/main-cpp$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('src/main.cpp')
  await expect(tree.getByRole('link', { name: 'main.cpp', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  )
  await page.reload()
  await expect(tree.getByRole('link', { name: 'main.cpp', exact: true })).toBeVisible()
  await page.getByLabel('Язык', { exact: true }).click()
  await page.getByRole('menuitemradio', { name: 'Español' }).click()
  await expect(page).toHaveURL(/\/es\/v5\/structure\/src\/main-cpp$/)
  await tree.getByRole('link', { name: 'CMakeLists.txt', exact: true }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('CMakeLists.txt')
  await page.screenshot({ path: 'test-results/architecture.png', fullPage: false })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Menú de navegación', exact: true }).click()
  await tree.getByRole('link', { name: 'mod.json', exact: true }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('mod.json')
  await expect(page.locator('.sidebar')).not.toBeVisible()
  await page.locator('.top-nav').getByRole('link', { name: 'Guía', exact: true }).click()
  await page.getByRole('button', { name: 'Menú de navegación', exact: true }).click()
  await expect(tree).toHaveCount(0)
  await expect(page.locator('.sidebar')).toContainText('Hooks sin misterios')
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

test('language menu supports keyboard, dismissal and themes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/ru/v5/examples/library')
  const trigger = page.getByRole('button', { name: 'Язык', exact: true })
  await expect(trigger).toBeEnabled()
  await trigger.focus()
  await trigger.press('ArrowDown')
  await expect(page.getByRole('menuitemradio', { name: 'Русский' })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitemradio', { name: 'Español' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(trigger).toBeFocused()
  await expect(page.getByRole('menu')).toHaveCount(0)
  await trigger.click()
  await page.screenshot({ path: 'test-results/language-dark.png' })
  await page.getByRole('heading', { level: 1 }).click()
  await expect(page.getByRole('menu')).toHaveCount(0)
  await page.locator('.header-actions > button').click()
  await trigger.click()
  await page.screenshot({ path: 'test-results/language-light.png' })
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
  expect(audit.violations).toEqual([])
  await page.setViewportSize({ width: 390, height: 844 })
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    .toBe(true)
  await page.getByRole('menuitemradio', { name: 'English' }).click()
  await expect(page).toHaveURL(/\/en\/v5\/examples\/library$/)
})
test('modding tutorials are discoverable in each language and keep version boundaries', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const locale of ['en', 'ru', 'es']) {
    await page.goto(`/${locale}/v5`)
    await expect(page.locator('.language-trigger')).toBeEnabled()
    await page.keyboard.press('Control+k')
    for (const [query, slug] of [
      ['Button', 'buttons'],
      ['ScrollLayer', 'scroll-layer'],
      ['Popup', 'popup'],
    ]) {
      await page.getByRole('dialog').getByRole('combobox').fill(query)
      await expect(
        page
          .getByRole('dialog')
          .getByRole('option')
          .filter({ hasText: slug === 'buttons' ? 'Button' : query })
          .first(),
      ).toBeVisible()
    }
    await page.keyboard.press('Escape')
    await page.goto(`/${locale}/v5/tutorials/scroll-layer`)
    await expect(page.locator('.section-navigation a')).toHaveCount(10)
    await expect(page.locator('.prose')).toContainText('m_contentLayer')
    await expect(page.locator('.prose')).not.toContainText('Popup')
    await expect(page.locator('.prose')).toContainText('ScrollTutorialMenu')
    await expect(page.locator('.prose')).toContainText('MenuLayer::init()')
  }
  await page.goto('/ru/v5')
  await expect(page.locator('.language-trigger')).toBeEnabled()
  await page.keyboard.press('Control+k')
  await page.getByRole('dialog').getByRole('combobox').fill('как сделать свой Popup')
  await page.getByRole('option').filter({ hasText: 'Как сделать свой Popup' }).click()
  await expect(page).toHaveURL(/\/ru\/v5\/tutorials\/popup$/)
  await page.screenshot({ path: 'test-results/tutorials.png' })
  await page.goto('/ru/v4/tutorials/popup')
  await expect(page.locator('.prose')).toHaveCount(0)
})

test('expanded tutorials are searchable and standalone', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/ru/v5/tutorials/notifications')

  for (const [query, title, slug, marker] of [
    ['уведомление', 'Notification', 'notifications', 'Notification::create'],
    ['настройки', 'Как добавить настройки', 'settings', 'listenForSettingChanges'],
    ['сохранить данные', 'Как сохранять данные', 'saved-data', 'setSavedValue'],
    ['ID узла', 'Как находить узлы по ID', 'node-ids', 'getChildByID'],
    ['RowLayout', 'Как использовать Layout', 'layouts', 'updateLayout'],
    ['свой спрайт', 'Как добавить свой спрайт', 'resources', 'tutorial-logo.png'],
    ['отладка логи', 'Как отлаживать через логи', 'logging', 'log::debug'],
  ]) {
    await page.keyboard.press('Control+k')
    await page.getByRole('dialog').getByRole('combobox').fill(query)
    await page.getByRole('option').filter({ hasText: title }).first().click()
    await expect(page).toHaveURL(new RegExp(`/ru/v5/tutorials/${slug}$`))
    await expect(page.locator('.prose')).toContainText(marker)
  }

  for (const slug of [
    'notifications',
    'settings',
    'saved-data',
    'node-ids',
    'layouts',
    'resources',
    'logging',
  ]) {
    await page.goto(`/ru/v5/tutorials/${slug}`)
    await expect(page.locator('.prose')).not.toContainText('/tutorials/')
  }
})
