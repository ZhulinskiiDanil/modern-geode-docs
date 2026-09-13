---
title: 'cpp-primer'
---

## Clases y herencia

Una clase reúne estado y comportamiento. MenuLayer es una clase del juego. Geode amplía su comportamiento mediante hooks; no sustituye cada instancia por una subclase C++ convencional.

## Punteros y referencias

Un puntero contiene una dirección y puede ser null. Una referencia identifica un objeto existente. Una búsqueda puede no encontrar el node: compruébalo antes de utilizar `->`. C++ no omite accesos inválidos como optional chaining de JavaScript.

## auto y const

`auto` deduce el tipo al compilar, no es tipado dinámico. `const` limita la modificación mediante esa variable. `auto const&` permite leer sin copiar.

## Propiedad y duración

cocos2d suele utilizar referencias contadas y autorelease. El padre retiene a sus hijos; retirarlos puede liberarlos. No uses std::unique_ptr ni delete con un node autoreleased. El modelo de propiedad debe coincidir.

## Primer ejemplo completo

Colócalo en src/main.cpp del proyecto generado:

```cpp
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

bool informa del resultado. El return temprano evita continuar si falla la inicialización original.

## Errores frecuentes

Capturar `this` en una lambda no mantiene vivo el objeto. Un cast no demuestra el tipo del node. Los templates operan al compilar. Comprende la propiedad antes de guardar punteros.

## Verificación

Compila, abre el menú y busca el mensaje en el registro de Geode. Continúa con el primer mod para crear un cambio visible.

[Recursos de C++](https://github.com/geode-sdk/docs/tree/main/cpp)
