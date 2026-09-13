---
title: 'logging'
---

## Что получится

Небольшой диагностический hook с правильными уровнями логов и форматированными значениями.

## Полный пример

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

## Выберите уровень

`error` — функция не может продолжить работу; `warn` — ошибка обработана; `info` — важное событие жизненного цикла; `debug` — подробности для диагностики. Debug скрыт по умолчанию и включается в фильтрах логов Geode.

## Проверка и ошибки

Откройте консоль платформы или свежий файл в `geode/logs`. Проверьте строку загрузки, включите debug и снова откройте меню. Не пишите в лог каждый кадр и не выводите токены, пароли или личные данные.

[Документация логов](https://docs.geode-sdk.org/tutorials/logging/)
