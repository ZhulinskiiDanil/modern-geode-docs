---
title: 'src/'
---

## Propósito

Aquí vive el código C++ del mod. Empieza con un archivo y separa las funciones del mod a medida que crece.

## Cómo encaja en el proyecto

La plantilla oficial encuentra src/*.cpp recursivamente con CMake. Las cabeceras contienen declaraciones y los .cpp implementaciones. Guarda los archivos generados fuera de esta carpeta.

## Ejemplo

```text [src/]
hello-geode/
└── src/
    └── main.cpp
```

## Qué debes tener en cuenta

Abre main.cpp en el árbol para entender el hook. Ese nombre no significa que el mod sea un ejecutable con una función main().

## Verifica el resultado

Tras añadir un archivo ejecuta geode build desde la raíz. Si falta el código en el binario, revisa la selección de fuentes en CMakeLists.txt.

[Plantilla oficial](https://github.com/geode-sdk/example-mod) · [Vista del proyecto](/es/v5/structure/project)
