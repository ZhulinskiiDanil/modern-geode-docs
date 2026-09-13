<script setup lang="ts">
import { articles } from '~/data/manifest'
const emit = defineEmits<{ search: [] }>()
const { t } = useI18n()
const { lang, link } = useDocs()
const level = ref(0)
onMounted(() => (level.value = Number(localStorage.getItem('geode-level') || 0)))
function selectLevel(n: number) {
  level.value = n
  localStorage.setItem('geode-level', String(n))
}
const path = computed(() =>
  [
    level.value === 0
      ? ['get-started/introduction', 'get-started/installation', 'get-started/first-mod']
      : level.value === 1
        ? ['structure/project', 'guide/hooks', 'get-started/first-mod']
        : ['guide/migration', 'guide/async', 'api/classes'],
  ]
    .flat()
    .map((s) => articles.find((a) => a.slug === s)!),
)
const quick = articles.filter((a) =>
  ['structure/project', 'api/classes', 'publishing/checklist'].includes(a.slug),
)
const popular = articles.filter((a) => ['guide/hooks', 'guide/ui', 'guide/data'].includes(a.slug))
</script>
<template>
  <div class="home-content">
    <div class="eyebrow">
      <span class="tiny-diamond"></span> {{ t('developerDocs') }}
      <span class="badge">{{ t('latest') }} · v5.10.1</span>
    </div>
    <section id="overview" class="home-hero">
      <h1>{{ t('hero') }}</h1>
      <p class="hero-description">{{ t('intro') }}</p>
      <div class="hero-actions">
        <NuxtLink class="button primary" :to="link('get-started/first-mod')"
          ><Icon name="terminal" :size="17" />{{ t('firstMod')
          }}<Icon name="arrow" :size="17" /></NuxtLink
        ><NuxtLink class="button secondary" :to="link('api/classes')"
          >{{ t('explore') }}<Icon name="arrow" :size="16"
        /></NuxtLink>
      </div>
      <div class="hero-note">
        <span class="status-dot"></span>{{ t('powered') }}<span class="note-dot">/</span>
        {{ t('communityBuilt') }}<span class="note-dot">/</span> {{ t('openSource') }}
      </div>
    </section>
    <button class="home-search" @click="emit('search')">
      <Icon name="search" :size="20" /><span>{{ t('search') }}</span
      ><kbd>Ctrl K</kbd>
    </button>
    <section id="your-path" class="level-section">
      <div class="section-kicker">{{ t('startHere') }}</div>
      <h2>{{ t('pathTitle') }}</h2>
      <p class="section-description">{{ t('pathIntro') }}</p>
      <div class="level-grid">
        <button
          v-for="(item, i) in [
            { title: 'beginner', desc: 'beginnerDesc', icon: 'compass' },
            { title: 'cpp', desc: 'cppDesc', icon: 'code' },
            { title: 'experienced', desc: 'experiencedDesc', icon: 'blocks' },
          ]"
          :key="item.title"
          :class="['level-card', { selected: level === i }]"
          :aria-pressed="level === i"
          @click="selectLevel(i)"
        >
          <div class="level-card-top">
            <Icon :name="item.icon" :size="23" /><span class="radio-dot"
              ><Icon v-if="level === i" name="check" :size="10"
            /></span>
          </div>
          <strong>{{ t(item.title) }}</strong
          ><span>{{ t(item.desc) }}</span>
        </button>
      </div>
      <div class="learning-path">
        <div class="learning-path-label">
          <Icon name="workflow" :size="14" />{{ t('learning')
          }}<span>~{{ path.reduce((sum, a) => sum + a.minutes, 0) }} min</span>
        </div>
        <div class="path-steps">
          <NuxtLink v-for="(a, i) in path" :key="a.slug" :to="link(a.slug)"
            ><span class="step-number">0{{ i + 1 }}</span>
            <div>
              <strong>{{ a.title[lang] }}</strong
              ><span>{{ a.minutes }} {{ t('minutes') }}</span>
            </div>
            <Icon name="arrow" :size="15"
          /></NuxtLink>
        </div>
      </div>
    </section>
    <section id="quick-access" class="quick-section">
      <div class="section-heading">
        <div>
          <div class="section-kicker">{{ t('quick') }}</div>
          <h2>{{ t('tools') }}</h2>
        </div>
        <span class="subtle mono">/ {{ t('essentials') }}</span>
      </div>
      <div class="quick-grid">
        <NuxtLink v-for="a in quick" :key="a.slug" :to="link(a.slug)" class="quick-card"
          ><Icon :name="a.icon" :size="23" /><Icon class="card-arrow" name="external" :size="16" />
          <h3>{{ a.title[lang] }}</h3>
          <p>{{ a.description[lang] }}</p></NuxtLink
        >
      </div>
    </section>
    <section id="tutorials" class="popular-section">
      <div class="section-heading">
        <h2>{{ t('popular') }}</h2>
        <NuxtLink :to="link('examples/library')"
          >{{ t('allExamples') }}<Icon name="arrow" :size="14"
        /></NuxtLink>
      </div>
      <NuxtLink v-for="(a, i) in popular" :key="a.slug" :to="link(a.slug)" class="tutorial-row"
        ><span class="tutorial-index">0{{ i + 1 }}</span
        ><span class="tutorial-icon"><Icon :name="a.icon" :size="19" /></span>
        <div>
          <h3>{{ a.title[lang] }}</h3>
          <p>{{ a.description[lang] }}</p>
        </div>
        <span class="tutorial-time">{{ a.minutes }} min</span><Icon name="arrow" :size="16"
      /></NuxtLink>
    </section>
    <section id="latest" class="release-banner">
      <div class="release-icon"><Icon name="git" :size="22" /></div>
      <div>
        <h3>
          {{ t('release') }}<span class="badge">{{ t('latest') }}</span>
        </h3>
        <p>{{ t('releaseDesc') }}</p>
      </div>
      <a
        href="https://github.com/geode-sdk/geode/releases/tag/v5.10.1"
        target="_blank"
        rel="noopener"
        :aria-label="t('releaseNotes')"
        ><Icon name="external"
      /></a>
    </section>
    <div class="platform-strip">
      <span>{{ t('platforms') }}</span
      ><span>⊞ Windows</span><span>⌘ macOS</span><span>♙ Android</span><span>◈ iOS</span>
    </div>
    <footer class="page-footer">
      <span>{{ t('unofficial') }}</span
      ><a href="https://github.com/geode-sdk/docs">GitHub <Icon name="external" :size="12" /></a>
    </footer>
  </div>
</template>
