---
title: 'logging'
---

## Qué vas a crear

Un pequeño hook de diagnóstico con niveles y valores formateados correctamente.

## Ejemplo completo

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>

using namespace geode::prelude;

$on_mod(Loaded) {
    log::info("Tutorial mod loaded: {}", Mod::get()->getVersion());
}

class $modify(LoggingTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) {
            log::error("MenuLayer initialization failed");
            return false;
        }

        log::debug(
            "Menu size: {}, children: {}",
            this->getContentSize(),
            this->getChildrenCount()
        );

        return true;
    }
};
```

## Elige un nivel

Usa `error` si la función no puede continuar, `warn` si recuperas el fallo, `info` para eventos importantes y `debug` para detalles. Debug está oculto por defecto hasta activarlo en los filtros de Geode.

## Comprobación y errores

Abre la consola o el archivo más reciente de `geode/logs`. Comprueba la carga, activa debug y vuelve a abrir el menú. No escribas cada fotograma ni expongas tokens, contraseñas o datos privados.

[Referencia de logging](https://docs.geode-sdk.org/tutorials/logging/)
