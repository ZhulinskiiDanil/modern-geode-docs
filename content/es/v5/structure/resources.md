---
title: 'resources/'
---

## Propósito

Guarda aquí imágenes, fuentes y otros recursos propios. Es una carpeta de origen: el cargador utiliza recursos extraídos del paquete compilado.

## Cómo encaja en el proyecto

resources es una convención del proyecto. Añadir una imagen a una carpeta no garantiza su inclusión: declara los recursos en mod.json según el esquema oficial.

## Ejemplo

```text [resources/]
hello-geode/
├── resources/
│   └── banner.png
└── mod.json
```

## Qué debes tener en cuenta

Distingue entre un archivo propio y un sprite existente del juego. El primer tutorial utiliza un sprite frame del juego; una imagen propia debe incluirse en el paquete.

## Verifica el resultado

Compila y prueba una instalación limpia sin archivos de versiones anteriores. Si falta una imagen, comprueba nombre, mayúsculas y declaración del recurso.

[Plantilla oficial](https://github.com/geode-sdk/example-mod) · [Vista del proyecto](/es/v5/structure/project)
