---
title: 'CMakeLists.txt'
---

## Propósito

Es la receta de compilación en la raíz. CMake selecciona fuentes, crea una biblioteca compartida, conecta el SDK y prepara el paquete.

## Cómo encaja en el proyecto

El fragmento explica cuatro líneas de la plantilla oficial. No sustituye el archivo completo: conserva la versión mínima de CMake, el estándar C++ y la configuración de plataformas.

## Ejemplo

```cmake [CMakeLists.txt]
file(GLOB_RECURSE SOURCES CONFIGURE_DEPENDS src/*.cpp)
add_library(${PROJECT_NAME} SHARED ${SOURCES})
add_subdirectory($ENV{GEODE_SDK} ${CMAKE_CURRENT_BINARY_DIR}/geode)
setup_geode_mod(${PROJECT_NAME})
```

## Qué debes tener en cuenta

SOURCES contiene los .cpp encontrados. PROJECT_NAME es el nombre del objetivo CMake. GEODE_SDK apunta al SDK, no a tu mod. setup_geode_mod conecta la integración de compilación de Geode.

## Verifica el resultado

Ejecuta geode build en la raíz. Si falta el SDK, comprueba GEODE_SDK en esa terminal. Ante errores de enlace, verifica los binarios de la versión y plataforma correctas.

[Plantilla oficial](https://github.com/geode-sdk/example-mod) · [Vista del proyecto](/es/v5/structure/project)
