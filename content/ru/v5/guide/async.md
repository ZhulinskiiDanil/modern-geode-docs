---
title: 'async'
---

## Только v5: futures вместо Tasks

Geode v5 использует асинхронную среду Arc. Примеры legacy Task относятся к старой документации. Не смешивайте `EventListener<WebTask>` и API v5, возвращающие Future.

## Что создадим

Запрос при инициализации главного меню, выводящий HTTP status. Это демонстрация сети, а не рекомендация выполнять запрос при каждом открытии меню в релизном моде.

## Знания и время жизни

Нужны hooks и fields. TaskHolder хранится в изменённом объекте и отменяет запрос при уничтожении. Временная локальная переменная завершила бы его слишком рано.

## Полный пример

Замените src/main.cpp:

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/utils/async.hpp>
#include <Geode/utils/web.hpp>
using namespace geode::prelude;

class $modify(NetworkMenu, MenuLayer) {
    struct Fields {
        async::TaskHolder<web::WebResponse> request;
    };
    bool init() {
        if (!MenuLayer::init()) return false;
        m_fields->request.spawn(
            web::WebRequest().get("https://example.org"),
            [](web::WebResponse response) {
                log::info("HTTP status: {}", response.code());
            }
        );
        return true;
    }
};
```

Callback получает ответ по значению и не захватывает указатель на меню. Адрес демонстрационный, это не сервис Geode.

## Ожидаемый результат

Соберите, установите и откройте меню. При работающей сети в логе появится HTTP status. Сам код ответа не подтверждает корректность данных: обрабатывайте неуспешные ответы до парсинга.

## Ошибки и отмена

Проверьте offline-режим и уход с экрана до завершения. Не обращайтесь к уничтоженному UI из callback. Не блокируйте игровой поток ожиданием. Coroutine приостанавливается через co_await, но владение и отмену всё равно нужно продумать.

## Дальше

Изучите async::TaskHolder и Arc futures до реализации повторов, парсинга и загрузки изображений.

[Async](https://docs.geode-sdk.org/tutorials/async/) · [Миграция v5](https://docs.geode-sdk.org/tutorials/migrate-v5/) · [Заголовок v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/utils/async.hpp)
