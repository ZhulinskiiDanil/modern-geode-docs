import withNuxt from './.nuxt/eslint.config.mjs'
export default withNuxt(
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/no-multiple-template-root': 'off',
    },
  },
  { files: ['app/components/docs/CodeBlock.vue'], rules: { 'vue/no-v-html': 'off' } },
) // HTML here is produced exclusively by Shiki, which escapes source code.
