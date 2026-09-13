---
title: 'mod.json'
---

## Propósito

El cargador lee este archivo para identificar el mod y comprobar compatibilidad. Colócalo en la raíz junto a CMakeLists.txt.

## Cómo encaja en el proyecto

El ejemplo declara solo Windows. Añade otra plataforma después de compilarla y probarla con la versión correcta del juego. Sustituye el ID y el autor.

## Ejemplo

```json [mod.json]
{
  "geode": "5.10.1",
  "gd": {
    "win": "2.2081"
  },
  "id": "yourname.hello-geode",
  "name": "Hello Geode",
  "version": "1.0.0",
  "developer": "Your name",
  "description": "A small learning mod.",
  "dependencies": {
    "geode.node-ids": ">=v1.23.3"
  }
}
```

## Qué debes tener en cuenta

geode identifica el SDK, gd la compatibilidad del juego y version la versión de tu mod. Son valores diferentes. El tutorial del botón necesita node-ids.

## Verifica el resultado

JSON no admite comentarios ni comas finales. Mantén el ID entre actualizaciones: las dependencias y los datos lo utilizan. Compila y revisa los errores de carga para comprobar compatibilidad.

[Plantilla oficial](https://github.com/geode-sdk/example-mod) · [Vista del proyecto](/es/v5/structure/project)
