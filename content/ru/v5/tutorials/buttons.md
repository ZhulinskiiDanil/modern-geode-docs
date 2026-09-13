---
title: 'buttons'
---

## Что получится

Кнопка в левом верхнем углу главного меню. Нажатие записывает Tutorial button clicked в лог Geode.

## Подготовка

Нужен отдельный проект мода с SDK 5.10.1 и работающей сборкой. Другие уроки проходить не требуется. Замените src/main.cpp полным примером ниже; не объединяйте его с другими учебными hooks. Дополнительные зависимости в mod.json не нужны.

## Полный пример

Весь код для этого урока находится в одном файле src/main.cpp.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
using namespace geode::prelude;

class $modify(ButtonTutorialMenu, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        auto size = CCDirector::sharedDirector()->getWinSize();
        auto menu = CCMenu::create();
        menu->setPosition({35.f, size.height - 45.f});
        this->addChild(menu, 10);
        auto icon = CCSprite::createWithSpriteFrameName("GJ_likeBtn_001.png");
        auto button = CCMenuItemSpriteExtra::create(
            icon, this, menu_selector(ButtonTutorialMenu::onTutorial));
        button->setID("tutorial-button"_spr);
        menu->addChild(button);
        return true;
    }
    void onTutorial(CCObject*) {
        log::info("Tutorial button clicked");
    }
};
```

## Как это работает

CCSprite рисует иконку, CCMenuItemSpriteExtra получает нажатие, menu_selector вызывает onTutorial. Собственный CCMenu добавлен в MenuLayer; координата кнопки внутри него — (0, 0). Обработчик принимает CCObject* и пишет в лог. Поиск узлов по ID не используется.

## Проверьте результат

Соберите мод командой geode build и запустите игру с установленным модом. Нажмите иконку лайка слева сверху и проверьте запись Tutorial button clicked в логе Geode. Повторите нажатие.

## Если не работает

Нет кнопки: проверьте загрузку мода и координаты меню. Нет записи в логе: проверьте сигнатуру void onTutorial(CCObject*) и доступность логов Geode. Sprite сам по себе не получает нажатия: нужен CCMenuItem внутри CCMenu.

Код сверён с API SDK 5.10.1, но здесь не компилировался и не запускался в игре.

[Geode SDK source](https://github.com/geode-sdk/example-mod)
