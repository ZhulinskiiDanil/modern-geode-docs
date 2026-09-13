---
title: 'migration'
---

## Una frontera de compatibilidad

v4 se conserva como archivo. Las páginas v5 corresponden a 5.10.1. Cambiar la documentación no cambia el SDK instalado.

## Actualiza en una rama

Conserva una versión funcional y su código. Crea una rama, instala SDK y binarios correspondientes, actualiza metadatos y recompila. Lee los errores antes de cambiar el comportamiento.

## Async ha cambiado

geode::Task fue sustituido por Arc en v5. Las operaciones Future pueden esperarse o ejecutarse mediante spawn. TaskHolder controla la operación y cancela al destruirse. Migra la duración de los objetos, no solo los nombres.

## Cambios de UI

También cambió la construcción de Popup. Compara clases base e inicialización con la guía oficial. No copies una implementación v4 a v5 sin revisarla.

## Verificación

Prueba instalaciones nuevas, datos existentes, reapertura de menús, cancelación y otros mods. Compila cada plataforma. Publica una nueva versión inmutable y conserva los paquetes anteriores.

## Continúa en v5

Cambia la versión en el encabezado: se conservan artículo e idioma. Las búsquedas del archivo permanecen separadas.

[Guía oficial v4 → v5](https://docs.geode-sdk.org/tutorials/migrate-v5/)
