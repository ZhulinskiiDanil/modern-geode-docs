---
title: 'popup'
---

## Что получится

Собственный Popup размером 300 × 200 с текстом и закрытием. Пример целиком включает небольшую кнопку для проверки открытия окна.

## Подготовка

Нужен отдельный проект мода с SDK 5.10.1 и работающей сборкой. Другие уроки проходить не требуется. Замените src/main.cpp полным примером ниже; не объединяйте его с другими учебными hooks. Дополнительные зависимости в mod.json не нужны.

## Полный пример

Весь код для этого урока находится в одном файле src/main.cpp.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/ui/Popup.hpp>
using namespace geode::prelude;

class TutorialPopup : public Popup {
protected:
    bool init() {
        if (!Popup::init(300.f, 200.f)) return false;
        setTitle("My popup");
        auto message = CCLabelBMFont::create("Hello, modder!", "bigFont.fnt");
        message->setScale(0.5f);
        message->setPosition({150.f, 100.f});
        m_mainLayer->addChild(message);
        return true;
    }
public:
    static TutorialPopup* create() {
        auto result = new TutorialPopup();
        if (result->init()) {
            result->autorelease();
            return result;
        }
        delete result;
        return nullptr;
    }
};

class $modify(PopupTutorialMenu, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        auto size = CCDirector::sharedDirector()->getWinSize();
        auto menu = CCMenu::create();
        menu->setPosition({35.f, size.height - 45.f});
        this->addChild(menu, 10);
        auto icon = CCSprite::createWithSpriteFrameName("GJ_likeBtn_001.png");
        auto button = CCMenuItemSpriteExtra::create(
            icon, this, menu_selector(PopupTutorialMenu::onTutorial));
        button->setID("tutorial-button"_spr);
        menu->addChild(button);
        return true;
    }
    void onTutorial(CCObject*) {
        if (auto popup = TutorialPopup::create()) {
            popup->show();
        }
    }
};
```

## Как это работает

Popup::init создаёт окно; содержимое добавляется в m_mainLayer в локальных координатах. create проверяет init, вызывает autorelease при успехе и удаляет объект при ошибке. Полный MenuLayer hook ниже класса создаёт кнопку запуска: обработчик вызывает create и show. В SDK 5.10.1 Popup не имеет шаблонных аргументов.

## Проверьте результат

Соберите мод командой geode build и откройте главное меню игры. Нажмите иконку лайка слева сверху. Проверьте заголовок, текст, крестик и повторное открытие. Проверьте Escape/Back и другой размер окна игры.

## Если не работает

Окно не показывается: нужен show после create. Ошибки Popup<> или initAnchored означают смешение разных API. Используйте координаты m_mainLayer для содержимого. Не удаляйте autoreleased объект вручную.

Код сверён с API SDK 5.10.1, но здесь не компилировался и не запускался в игре.

[Geode SDK source](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Popup.hpp)
