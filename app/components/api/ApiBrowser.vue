<script setup lang="ts">
import { apiAdapter } from '~/data/api'
import { isDeprecated } from '~/utils/docs'
const ready = useReady()
const { t } = useI18n()
const { lang, version } = useDocs()
const route = useRoute()
const query = ref(''),
  kind = ref(''),
  detailed = ref(true),
  selected = ref(route.hash.slice(1) || 'mod')
const symbols = computed(() =>
  apiAdapter
    .getSymbols(version.value)
    .filter(
      (s) =>
        (s.name + ' ' + s.namespace).toLowerCase().includes(query.value.toLowerCase()) &&
        (!kind.value || s.kind === kind.value),
    ),
)
const symbol = computed(
  () => symbols.value.find((s) => s.id === selected.value) || symbols.value[0],
)
watch(
  () => route.hash,
  (hash) => {
    if (hash) selected.value = hash.slice(1)
  },
)
function select(id: string) {
  selected.value = id
  navigateTo({ hash: '#' + id })
}
</script>
<template>
  <div class="api-browser">
    <DocsCallout
      >{{ t('curated') }}
      <a href="https://docs.geode-sdk.org/classes/geode/Mod/" target="_blank" rel="noopener"
        >{{ t('viewSource') }} ↗</a
      ></DocsCallout
    >
    <div class="filter-bar">
      <label class="grow"
        >{{ t('symbols')
        }}<input v-model="query" :disabled="!ready" :placeholder="t('symbols')" /></label
      ><label
        >{{ t('type')
        }}<select v-model="kind" :disabled="!ready">
          <option value="">{{ t('all') }}</option>
          <option value="class">class</option>
          <option value="function">function</option>
        </select></label
      >
    </div>
    <div class="api-workspace">
      <nav class="symbol-list" aria-label="API symbols">
        <button
          v-for="s in symbols"
          :key="s.id"
          :class="{ active: symbol?.id === s.id }"
          @click="select(s.id)"
        >
          <span>{{ s.kind === 'class' ? 'C' : 'ƒ' }}</span
          >{{ s.name }}
        </button>
      </nav>
      <section v-if="symbol" class="symbol-detail">
        <div class="section-heading">
          <span class="mono subtle">{{ symbol.namespace }}</span
          ><label class="detail-toggle"
            ><input v-model="detailed" :disabled="!ready" type="checkbox" />{{
              t('details')
            }}</label
          >
        </div>
        <h2 :id="symbol.id">{{ symbol.name }}</h2>
        <p>{{ symbol.description[lang] }}</p>
        <VersionBadge /><span v-if="isDeprecated(symbol, version)" class="badge warning">{{
          t('deprecated')
        }}</span
        ><ApiSignature :signature="symbol.signature" /><template v-if="detailed"
          ><h3>{{ t('parameters') }}</h3>
          <p class="mono">{{ symbol.parameters }}</p>
          <h3>{{ t('returns') }}</h3>
          <p class="mono">{{ symbol.returns }}</p>
          <h3>{{ t('availability') }}</h3>
          <div class="badges">
            <PlatformBadge v-for="p in symbol.platforms" :key="p" :platform="p" />
          </div>
          <h3>C++</h3>
          <CodeBlock :code="symbol.example" filename="src/main.cpp" /></template
        ><a :href="symbol.source" target="_blank" rel="noopener">{{ t('viewSource') }} ↗</a>
      </section>
      <p v-else class="empty-state">{{ t('empty') }}</p>
    </div>
  </div>
</template>
