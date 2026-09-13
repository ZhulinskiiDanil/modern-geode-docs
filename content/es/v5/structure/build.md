---
title: 'build/'
---

## Propósito

Esta carpeta contiene resultados generados. Los archivos exactos dependen del compilador, generador CMake y plataforma. No es el código fuente del mod.

## Cómo encaja en el proyecto

CMake guarda configuración e intermediarios. El paquete .geode final es el archivo que instalas o publicas. Otros objetivos pueden utilizar carpetas como build-android64.

## Ejemplo

```text [build/]
hello-geode/
├── src/
├── mod.json
├── CMakeLists.txt
└── build/
    └── yourname.hello-geode.geode
```

## Qué debes tener en cuenta

No arregles el mod editando archivos generados: la próxima compilación puede reemplazarlos. Excluye build del control de versiones y conserva fuentes, metadatos y recursos.

## Verifica el resultado

Después de geode build, localiza el paquete recién generado e instálalo en un juego compatible. Si no ves el cambio, comprueba la ubicación del resultado y la versión instalada.

[Plantilla oficial](https://github.com/geode-sdk/example-mod) · [Vista del proyecto](/es/v5/structure/project)
