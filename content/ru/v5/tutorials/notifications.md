---
title: 'notifications'
---

## Что получится

Уведомление об успехе, которое появляется при открытии главного меню и скрывается через две секунды.

## Полный пример

Замените `src/main.cpp` этим файлом. Другие туториалы и зависимость `geode.node-ids` не нужны.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/ui/Notification.hpp>

using namespace geode::prelude;

class $modify(NotificationTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        Notification::create(
            "The mod is ready!",
            NotificationIcon::Success,
            2.f
        )->show();

        return true;
    }
};
```

## Как это работает

`Notification::create` получает текст, иконку и время показа. Затем обязательно вызывается `show()`. Используйте `0.f` только если сохраните указатель и позднее вызовете `hide()` или `cancel()`.

## Проверка и ошибки

Соберите мод через `geode build`, откройте главное меню и убедитесь, что сообщение исчезает само. Если его нет, проверьте загрузку мода и вызов оригинального `MenuLayer::init()`. Не создавайте уведомления каждый кадр или в часто вызываемом callback.

[Notification.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Notification.hpp)
