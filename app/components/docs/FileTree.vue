<script setup lang="ts">
import { tr } from '~/data/manifest'
const ready = useReady()
const { lang } = useDocs()
const selected = ref(0)
const files = [
  {
    name: 'src/main.cpp',
    description: tr(
      'Your mod behavior. Hooks belong here or in other source files.',
      'Поведение мода. Hooks размещаются здесь или в других исходниках.',
      'El comportamiento del mod. Aquí se colocan los hooks.',
    ),
    code: '#include <Geode/Geode.hpp>\n#include <Geode/modify/MenuLayer.hpp>',
    language: 'cpp',
  },
  {
    name: 'resources/',
    description: tr(
      'Images, fonts and other assets declared by your mod.',
      'Изображения, шрифты и другие ресурсы мода.',
      'Imágenes, fuentes y otros recursos del mod.',
    ),
    code: 'resources/\n  icon.png\n  banner.png',
    language: 'text',
  },
  {
    name: 'mod.json',
    description: tr(
      'Identity, compatibility and dependencies. Change the sample identity before publishing.',
      'ID, совместимость и зависимости. Перед публикацией замените данные примера.',
      'Identidad, compatibilidad y dependencias. Cambia la identidad antes de publicar.',
    ),
    code: JSON.stringify(
      {
        geode: '5.10.1',
        gd: { win: '2.2081', mac: '2.2081', android: '2.2081', ios: '2.2081' },
        id: 'yourname.hello-geode',
        name: 'Hello Geode',
        version: '1.0.0',
        developer: 'Your name',
        dependencies: { 'geode.node-ids': '>=v1.23.3' },
      },
      null,
      2,
    ),
    language: 'json',
  },
  {
    name: 'CMakeLists.txt',
    description: tr(
      'The build recipe. Keep the generated template; this is a conceptual excerpt, not a replacement file.',
      'Рецепт сборки. Сохраните шаблон; это фрагмент, а не замена файла.',
      'La receta de compilación. Conserva la plantilla; este fragmento no sustituye el archivo.',
    ),
    code: 'project(HelloGeode VERSION 1.0.0)\n# Keep the SDK setup from the generated template\nsetup_geode_mod(${PROJECT_NAME})',
    language: 'cmake',
  },
  {
    name: 'about.md',
    description: tr(
      'The description players see in Geode. Explain your mod and its limitations.',
      'Описание для игроков в Geode. Объясните возможности и ограничения.',
      'La descripción para jugadores. Explica funciones y limitaciones.',
    ),
    code: '# Hello Geode\nA small learning project.',
    language: 'markdown',
  },
  {
    name: 'build/',
    description: tr(
      'Generated binaries and packages. Do not edit or commit this directory.',
      'Сгенерированные файлы и пакеты. Не редактируйте и не коммитьте.',
      'Binarios y paquetes generados. No edites ni incluyas en Git.',
    ),
    code: 'build/\n  yourname.hello-geode.geode',
    language: 'text',
  },
]
const file = computed(() => files[selected.value]!)
</script>
<template>
  <div class="file-explorer">
    <div class="file-tree">
      <div class="file-tree-root"><Icon name="folder" />hello-geode/</div>
      <button
        v-for="(f, i) in files"
        :key="f.name"
        :disabled="!ready"
        :class="{ active: selected === i }"
        @click="selected = i"
      >
        <Icon :name="f.name.endsWith('/') ? 'folder' : 'file'" :size="15" />{{ f.name }}
      </button>
    </div>
    <div class="file-explanation">
      <p>{{ file.description[lang] }}</p>
      <CodeBlock :code="file.code" :language="file.language" :filename="file.name" />
    </div>
  </div>
</template>
