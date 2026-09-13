---
title: 'changelog.md'
---

## Propósito

Este Markdown opcional en la raíz contiene el historial de versiones. Ayuda al jugador a entender una actualización.

## Cómo encaja en el proyecto

Empieza con los cambios visibles. Explica correcciones, compatibilidad y acciones necesarias. Pon la versión más reciente primero y alinea su número con mod.json.

## Ejemplo

```markdown [changelog.md]
# Changelog

## v1.0.1

- Fix the menu button layout.

## v1.0.0

- Add the menu button.
```

## Qué debes tener en cuenta

Editar changelog no cambia la versión del paquete. Incrementa version en mod.json y publica un paquete nuevo; no sustituyas un archivo ya publicado.

## Verifica el resultado

Comprueba el changelog empaquetado en Geode, su número de versión y los enlaces. Mantén aparte las instrucciones de soporte que no describen un cambio.

[Plantilla oficial](https://github.com/geode-sdk/example-mod) · [Vista del proyecto](/es/v5/structure/project)
