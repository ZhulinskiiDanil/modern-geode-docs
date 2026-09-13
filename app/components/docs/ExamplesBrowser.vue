<script setup lang="ts">
import { examples } from '~/data/manifest'
import { filterExamples } from '~/utils/docs'
const ready = useReady()
const { t } = useI18n()
const { lang, version, link } = useDocs()
const difficulty = ref(''),
  topic = ref(''),
  platform = ref('')
const results = computed(() =>
  filterExamples(examples, {
    difficulty: difficulty.value,
    topic: topic.value,
    platform: platform.value,
    version: version.value,
  }),
)
</script>
<template>
  <section class="examples-browser">
    <div class="filter-bar">
      <label
        >{{ t('difficulty')
        }}<select v-model="difficulty" :disabled="!ready" :aria-label="t('difficulty')">
          <option value="">{{ t('all') }}</option>
          <option value="beginner">{{ t('beginnerLevel') }}</option>
          <option value="intermediate">{{ t('intermediate') }}</option>
        </select></label
      ><label
        >{{ t('topic')
        }}<select v-model="topic" :disabled="!ready" :aria-label="t('topic')">
          <option value="">{{ t('all') }}</option>
          <option>UI</option>
          <option>Hooks</option>
          <option>Data</option>
          <option>Networking</option>
        </select></label
      ><label
        >{{ t('platform')
        }}<select v-model="platform" :disabled="!ready" :aria-label="t('platform')">
          <option value="">{{ t('all') }}</option>
          <option>Windows</option>
          <option>macOS</option>
          <option>Android</option>
          <option>iOS</option>
        </select></label
      >
    </div>
    <div class="example-grid">
      <NuxtLink v-for="e in results" :key="e.id" :to="link(e.slug)" class="example-card"
        ><div>
          <span class="badge">{{
            t(e.difficulty === 'beginner' ? 'beginnerLevel' : 'intermediate')
          }}</span
          ><span class="subtle">{{ e.topic }}</span>
        </div>
        <Icon name="code" :size="28" />
        <h3>{{ e.title[lang] }}</h3>
        <p>{{ e.description[lang] }}</p>
        <footer><span>v5.10.1</span><Icon name="arrow" /></footer
      ></NuxtLink>
    </div>
    <p v-if="!results.length" class="empty-state">{{ t('empty') }}</p>
  </section>
</template>
