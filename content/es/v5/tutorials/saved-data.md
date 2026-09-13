---
title: 'saved-data'
---

## Qué vas a crear

Un contador de aperturas del menú principal que persiste al reiniciar el juego.

## Ejemplo completo

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>

using namespace geode::prelude;

class $modify(SavedDataTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        auto mod = Mod::get();

        auto visits = mod->getSavedValue<int64_t>("menu-visits", 0);
        visits += 1;

        mod->setSavedValue("menu-visits", visits);

        log::info("Main menu visits: {}", visits);

        return true;
    }
};
```

## Cómo funciona

Los valores guardados no se declaran en `mod.json`. El segundo argumento de `getSavedValue` es el valor inicial. `setSavedValue` actualiza el contenedor que Geode escribe en disco.

## Comprobación y errores

Abre el menú principal, sal y vuelve: el número debe aumentar. Reinicia el juego y comprueba que continúa. Mantén estables la clave y el tipo. Si el usuario debe editar el valor, usa los ajustes del mod.

[Referencia de datos guardados](https://docs.geode-sdk.org/mods/savedata/) · [Mod.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/loader/Mod.hpp)
