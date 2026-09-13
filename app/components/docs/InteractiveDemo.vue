<script setup lang="ts">
import { tr } from '~/data/manifest'
const { lang } = useDocs()
const current = ref(0)
const stages = [
  tr('Source', 'Исходники', 'Código'),
  tr('CMake', 'CMake', 'CMake'),
  tr('Compile', 'Компиляция', 'Compilar'),
  tr('Package', 'Упаковка', 'Empaquetar'),
  tr('Install', 'Установка', 'Instalar'),
  tr('Load', 'Загрузка', 'Cargar'),
  tr('Run', 'Выполнение', 'Ejecutar'),
]
const descriptions = [
  tr(
    'Write behavior in src/main.cpp.',
    'Напишите код в src/main.cpp.',
    'Escribe el comportamiento en src/main.cpp.',
  ),
  tr(
    'Configure the compiler and SDK paths.',
    'Настройте компилятор и пути SDK.',
    'Configura el compilador y las rutas del SDK.',
  ),
  tr(
    'Translate C++ into a platform binary.',
    'Преобразуйте C++ в платформенный бинарник.',
    'Traduce C++ a un binario de plataforma.',
  ),
  tr(
    'Bundle the binary, metadata, and resources into .geode.',
    'Объедините бинарник, metadata и ресурсы в .geode.',
    'Agrupa binario, metadatos y recursos en .geode.',
  ),
  tr(
    'Install the package in your game.',
    'Установите пакет в игру.',
    'Instala el paquete en el juego.',
  ),
  tr(
    'Geode checks compatibility and dependencies.',
    'Geode проверяет совместимость и зависимости.',
    'Geode comprueba compatibilidad y dependencias.',
  ),
  tr(
    'Your hook runs when the game calls the function.',
    'Hook выполняется при вызове функции игрой.',
    'El hook se ejecuta al llamar el juego a la función.',
  ),
]
</script>
<template>
  <div class="pipeline">
    <div>
      <button
        v-for="(s, i) in stages"
        :key="i"
        :class="{ active: current === i }"
        :aria-pressed="current === i"
        @click="current = i"
      >
        <span>0{{ i + 1 }}</span
        >{{ s[lang] }}<Icon v-if="i < 6" name="arrow" :size="12" />
      </button>
    </div>
    <p aria-live="polite">{{ descriptions[current]?.[lang] }}</p>
  </div>
</template>
