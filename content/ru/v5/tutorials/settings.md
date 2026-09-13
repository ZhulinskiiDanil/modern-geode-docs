---
title: 'settings'
---

## Что получится

Переключатель «Показывать приветствие», который пользователь меняет в настройках мода, и C++-код для чтения значения.

## Объявите настройку

Добавьте `settings` в существующий `mod.json`, сохранив собственные ID, название, версию и платформы.

```json [mod.json]
{
  "geode": "5.10.1",
  "id": "yourname.settings-demo",
  "name": "Settings Demo",
  "version": "1.0.0",
  "settings": {
    "show-greeting": {
      "type": "bool",
      "name": "Показывать приветствие",
      "description": "Записывать приветствие при загрузке мода",
      "default": true
    }
  }
}
```

## Прочитайте значение и изменения

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

## Проверка и ошибки

Соберите мод, откройте его настройки и измените переключатель. Callback вызывается только при изменении, поэтому начальное значение читается отдельно. Тип C++ должен совпадать с типом настройки: `bool` для `bool`, `int64_t` для `int`, `double` для `float`.

[Документация настроек](https://docs.geode-sdk.org/mods/settings/) · [SettingV3.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/loader/SettingV3.hpp)
