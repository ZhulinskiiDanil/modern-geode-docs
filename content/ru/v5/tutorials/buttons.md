---
title: 'buttons'
---

## Что получится

Кнопка Button в нижнем меню Geometry Dash. Нажатие открывает сообщение.

## Подготовка

Используйте проект из урока «Первый мод» с SDK 5.10.1 и настроенной сборкой. Для поиска bottom-menu нужна зависимость geode.node-ids из этого проекта. Примеры ниже заменяют учебный код, а не добавляются рядом с другим определением TutorialMenu.

[First mod](/ru/v5/get-started/first-mod) · [Button](/ru/v5/tutorials/buttons)

## Полный пример

Поместите весь пример в src/main.cpp.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
using namespace geode::prelude;

class $modify(TutorialMenu, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        auto menu = this->getChildByID("bottom-menu");
        if (!menu) {
            log::warn("bottom-menu was not found");
            return true;
        }
        auto icon = CCSprite::createWithSpriteFrameName("GJ_likeBtn_001.png");
        auto button = CCMenuItemSpriteExtra::create(
            icon, this, menu_selector(TutorialMenu::onTutorial));
        button->setID("tutorial-button"_spr);
        menu->addChild(button);
        menu->updateLayout();
        return true;
    }
    void onTutorial(CCObject*) {
        FLAlertLayer::create("Tutorial", "The button works!", "OK")->show();
    }
};
```

## Как это работает

CCSprite рисует иконку, CCMenuItemSpriteExtra обрабатывает нажатие, а menu_selector связывает его с методом onTutorial. Обработчик принимает CCObject*. Добавляем кнопку в существующее меню и пересчитываем его layout. Суффикс _spr добавляет ID вашего мода к ID узла.

## Проверьте результат

Соберите мод привычной командой geode build, запустите игру с установленным модом и откройте главное меню. Найдите иконку лайка: одно нажатие должно открыть The button works!. Закройте сообщение и повторите.

## Если не работает

Нет кнопки: проверьте лог bottom-menu was not found и зависимость node-ids. Иконка есть, но не нажимается: CCMenuItem должен быть внутри CCMenu. Неверный callback: проверьте имя класса и сигнатуру void onTutorial(CCObject*).

Сигнатуры сверены с исходниками SDK 5.10.1. Эти примеры не компилировались и не запускались в Geometry Dash в данной среде.

## Дальше

[Button](/ru/v5/tutorials/buttons) · [Popup](/ru/v5/tutorials/popup) · [ScrollLayer](/ru/v5/tutorials/scroll-layer)

[Geode example mod](https://github.com/geode-sdk/example-mod) · [Popup.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Popup.hpp) · [ScrollLayer.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/ScrollLayer.hpp)
