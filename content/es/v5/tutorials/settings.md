---
title: 'settings'
---

## Qué vas a crear

Un interruptor “Show greeting” editable desde los ajustes del mod y código C++ que lee sus cambios.

## Declara el ajuste

Añade `settings` a tu `mod.json` existente y conserva tus propios ID, nombre, versión y plataformas.

```json [mod.json]
{
  "geode": "5.10.1",
  "id": "yourname.settings-demo",
  "name": "Settings Demo",
  "version": "1.0.0",
  "settings": {
    "show-greeting": {
      "type": "bool",
      "name": "Show greeting",
      "description": "Write a greeting when the mod loads",
      "default": true
    }
  }
}
```

## Lee el valor y sus cambios

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/loader/SettingV3.hpp>

using namespace geode::prelude;

$on_mod(Loaded) {
    auto enabled = Mod::get()->getSettingValue<bool>("show-greeting");
    log::info("Show greeting: {}", enabled);

    listenForSettingChanges<bool>("show-greeting", [](bool value) {
        log::info("Show greeting changed to {}", value);
    });
}
```

## Comprobación y errores

Compila, abre los ajustes del mod y cambia el interruptor. El callback solo se ejecuta cuando cambia el valor; por eso el valor inicial se lee aparte. El tipo C++ debe coincidir: `bool` para `bool`, `int64_t` para `int` y `double` para `float`.

[Referencia de ajustes](https://docs.geode-sdk.org/mods/settings/) · [SettingV3.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/loader/SettingV3.hpp)
