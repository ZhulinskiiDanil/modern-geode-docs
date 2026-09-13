---
title: 'src/main.cpp'
---

## Назначение

Это отправная точка поведения мода. В примере игра создаёт главное меню, а наш hook записывает сообщение в лог.

## Место в проекте

Поместите полный пример ниже в src/main.cpp сгенерированного проекта. Geode.hpp предоставляет типы SDK, а modify header — поддержку изменения конкретного класса игры.

## Пример

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

## На что обратить внимание

Сохраните сигнатуру bool init() и вызов оригинала перед работой с меню. Hook выполняется при вызове init() игрой, а не просто во время загрузки библиотеки.

## Проверка результата

Соберите и установите пакет, перезапустите игру. Найдите “The menu is ready” в логе Geode. Для работающей кнопки перейдите к законченному tutorial первого мода.

[Официальный шаблон](https://github.com/geode-sdk/example-mod) · [Обзор проекта](/ru/v5/structure/project)
