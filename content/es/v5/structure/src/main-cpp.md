---
title: 'src/main.cpp'
---

## Propósito

Este archivo inicia el comportamiento del mod. El juego crea el menú principal y nuestro hook escribe un mensaje en el registro.

## Cómo encaja en el proyecto

Coloca el ejemplo completo en src/main.cpp de un proyecto generado. Geode.hpp aporta tipos del SDK; la cabecera modify permite modificar esta clase del juego.

## Ejemplo

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
using namespace geode::prelude;

class $modify(MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        log::info("The menu is ready");
        return true;
    }
};
```

## Qué debes tener en cuenta

Conserva la firma bool init() y llama al original antes de usar el menú. El hook actúa cuando el juego llama a init(), no simplemente al cargar la biblioteca.

## Verifica el resultado

Compila, instala y reinicia. Busca “The menu is ready” en el registro de Geode. Continúa con el tutorial del primer mod para añadir un botón visible.

[Plantilla oficial](https://github.com/geode-sdk/example-mod) · [Vista del proyecto](/es/v5/structure/project)
