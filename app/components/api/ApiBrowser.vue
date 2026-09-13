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
    )
    .sort((a, b) => a.name.localeCompare(b.name)),
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
function apiEntries(value: string) {
  return value.split('; ').filter(Boolean)
}
function apiTokens(value: string) {
  return value.split(/([A-Za-z_][\w:<>*&]*|\d+(?:\.\d+)?|[()[\]{}=,.:])/g).filter(Boolean)
}
function tokenClass(token: string) {
  if (/^[A-Z_a-z][\w:]*$/.test(token) || token.includes('::')) return 'api-token-name'
  if (/^\d/.test(token)) return 'api-token-number'
  if (/^[()[\]{}=,.:]$/.test(token)) return 'api-token-punctuation'
  return 'api-token-type'
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
          ><h3>C++</h3>
          <CodeBlock :code="symbol.example" filename="src/main.cpp" />
          <h3>{{ t('parameters') }}</h3>
          <div class="api-members">
            <code v-for="parameter in symbol.parameters.split(' · ')" :key="parameter">
              <span
                v-for="(token, index) in apiTokens(parameter)"
                :key="`${parameter}-${index}`"
                :class="tokenClass(token)"
                >{{ token }}</span
              >
            </code>
          </div>
          <template v-if="symbol.properties">
            <h3>{{ t('properties') }}</h3>
            <div class="api-members">
              <code v-for="property in apiEntries(symbol.properties)" :key="property">
                <span
                  v-for="(token, index) in apiTokens(property)"
                  :key="`${property}-${index}`"
                  :class="tokenClass(token)"
                  >{{ token }}</span
                >
              </code>
            </div>
          </template>
          <template v-if="symbol.methods">
            <h3>{{ t('methods') }}</h3>
            <div class="api-members">
              <code v-for="method in apiEntries(symbol.methods)" :key="method">
                <span
                  v-for="(token, index) in apiTokens(method)"
                  :key="`${method}-${index}`"
                  :class="tokenClass(token)"
                  >{{ token }}</span
                >
              </code>
            </div>
          </template>
          <h3>{{ t('returns') }}</h3>
          <div class="api-members">
            <code>
              <span
                v-for="(token, index) in apiTokens(symbol.returns)"
                :key="`${symbol.id}-return-${index}`"
                :class="tokenClass(token)"
                >{{ token }}</span
              >
            </code>
          </div>
          <h3>{{ t('availability') }}</h3>
          <div class="badges">
            <PlatformBadge v-for="p in symbol.platforms" :key="p" :platform="p" />
          </div> </template
        ><a :href="symbol.source" target="_blank" rel="noopener">{{ t('viewSource') }} ↗</a>
      </section>
      <p v-else class="empty-state">{{ t('empty') }}</p>
    </div>
  </div>
</template>
