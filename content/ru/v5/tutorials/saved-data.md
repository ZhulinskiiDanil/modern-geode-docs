---
title: 'saved-data'
---

## Что получится

Счётчик открытий главного меню, который сохраняется после перезапуска игры.

## Полный пример

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

## Как это работает

Saved values не объявляются в `mod.json`. Второй аргумент `getSavedValue` задаёт значение при первом обращении. `setSavedValue` обновляет контейнер мода, который Geode сохраняет на диск.

## Проверка и ошибки

Откройте главное меню, выйдите и вернитесь: число увеличится. Перезапустите игру и убедитесь, что счёт продолжается. Не меняйте ключ и тип после выпуска мода. Если значение должен редактировать пользователь, используйте настройки.

[Документация сохранений](https://docs.geode-sdk.org/mods/savedata/) · [Mod.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/loader/Mod.hpp)
