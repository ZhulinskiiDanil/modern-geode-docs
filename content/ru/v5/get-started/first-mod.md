---
title: 'first-mod'
---

## Что мы создадим

Новую кнопку главного меню Geometry Dash. При нажатии появится окно **You built your first mod.** Это учебный мод, а не готовый продукт для каталога. Цель: Geode v5.10.1 и Geometry Dash 2.2081, как в проверенном шаблоне.

## Что нужно заранее

Завершите настройку окружения. Нужны загрузчик в игре, SDK, CLI и компилятор C++. Сохраните в mod.json зависимость шаблона `geode.node-ids` с версией `>=v1.23.3`: она предоставляет ID `bottom-menu`.

## Как это работает

Geode подключает наш код к `MenuLayer::init`. Сначала вызываем оригинал, чтобы меню игры уже существовало. Затем находим нижнее меню, добавляем кнопку и обновляем layout. Имя класса `HelloMenu` нужно для ссылки на callback.

## 1. Создайте проект

Откройте терминал в родительской папке:

```bash
geode new
```

Укажите собственные ID (например `yourname.hello-geode`), название и автора. Откройте созданную папку. Сохраните CMakeLists.txt шаблона: в нём уже подключены SDK и упаковка мода.

## 2. Добавьте полный код

Замените содержимое `src/main.cpp`:

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>

using namespace geode::prelude;

class $modify(HelloMenu, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        auto menu = this->getChildByID("bottom-menu");
        if (!menu) return true;

        auto button = CCMenuItemSpriteExtra::create(
            CCSprite::createWithSpriteFrameName("GJ_likeBtn_001.png"),
            this,
            menu_selector(HelloMenu::onHello)
        );
        button->setID("hello-button"_spr);
        menu->addChild(button);
        menu->updateLayout();
        return true;
    }

    void onHello(CCObject*) {
        FLAlertLayer::create(
            "Hello, Geode!", "You built your first mod.", "OK"
        )->show();
    }
};
```

Проверка на null предотвращает падение, если меню не найдено. `_spr` добавляет ID мода к ID кнопки, уменьшая вероятность конфликтов. `updateLayout()` располагает новый элемент рядом с существующими, без жёстко заданных координат. Callback принимает `CCObject*`, как требует menu item.

## 3. Соберите и установите

В папке с mod.json выполните:

```bash
geode build
```

Если в Geode CLI настроен профиль игры, сборка может автоматически установить пакет. Иначе найдите `.geode` в каталоге build и установите через Geode. Проверьте целевые версии SDK и GD в mod.json; не указывайте платформы, которые не проверяли.

## Ожидаемый результат

Перезапустите Geometry Dash. В нижнем ряду главного меню появится дополнительная кнопка с поднятым большим пальцем. Нажмите: откроется окно. Закройте его кнопкой OK. Снова войдите в меню и убедитесь, что для каждого экземпляра меню создаётся одна кнопка.

## Частые ошибки

- Нет заголовка MenuLayer: нужен modify header, одного Geode.hpp недостаточно.
- Неверная сигнатура: именно `bool init()`, не void.
- Кнопка не появилась: проверьте включение мода и зависимость node-ids.
- Пакет не загружается: прочитайте ошибку Geode и сверьте SDK, игру и платформу.
- Пропущен оригинальный init: интерфейс может отсутствовать или быть некорректным.

## Что изучить дальше

Откройте дерево проекта, затем материалы о hooks и layouts. Измените текст окна и пересоберите мод, чтобы проверить весь цикл изменения, сборки и установки.

[Официальный пример для проверки API](https://github.com/geode-sdk/example-mod/blob/main/src/main.cpp) · [Инструкция сборки](https://github.com/geode-sdk/docs/blob/main/getting-started/create-mod.md)
