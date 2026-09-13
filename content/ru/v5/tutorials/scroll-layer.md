---
title: 'scroll-layer'
---

## Что получится

ScrollLayer с двадцатью строками внутри Popup: видимая область 260 × 150, содержимое выше области просмотра.

## Подготовка

Используйте проект из урока «Первый мод» с SDK 5.10.1 и настроенной сборкой. Для поиска bottom-menu нужна зависимость geode.node-ids из этого проекта. Примеры ниже заменяют учебный код, а не добавляются рядом с другим определением TutorialMenu.

[First mod](/ru/v5/get-started/first-mod) · [Button](/ru/v5/tutorials/buttons)

## Полный пример

Вставьте ListPopup перед TutorialMenu в src/main.cpp из урока про кнопку. Замените тело onTutorial кодом открытия ниже.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/ui/Popup.hpp>
#include <Geode/ui/ScrollLayer.hpp>
#include <string>
using namespace geode::prelude;

class ListPopup : public Popup {
protected:
    bool init() {
        if (!Popup::init(300.f, 240.f)) return false;
        setTitle("Scrollable list");
        auto list = ScrollLayer::create(CCSize{260.f, 150.f});
        list->setPosition({20.f, 35.f});
        m_mainLayer->addChild(list);
        constexpr int count = 20;
        constexpr float rowHeight = 28.f;
        constexpr float contentHeight = count * rowHeight;
        list->m_contentLayer->setContentSize({260.f, contentHeight});
        for (int i = 0; i < count; ++i) {
            auto text = std::string("Row ") + std::to_string(i + 1);
            auto label = CCLabelBMFont::create(text.c_str(), "bigFont.fnt");
            label->setScale(0.45f);
            label->setPosition({130.f, contentHeight - (i + 0.5f) * rowHeight});
            list->m_contentLayer->addChild(label);
        }
        list->scrollToTop();
        return true;
    }
public:
    static ListPopup* create() {
        auto result = new ListPopup();
        if (result->init()) {
            result->autorelease();
            return result;
        }
        delete result;
        return nullptr;
    }
};
```

## Как это работает

ScrollLayer задаёт область просмотра, m_contentLayer хранит прокручиваемые узлы. Высота содержимого равна 20 × 28 = 560, поэтому список может прокручиваться. Строки добавлены сверху вниз; scrollToTop вызывается после настройки размера. В этом примере строки — подписи, не интерактивные кнопки.

## Откройте окно

```cpp
void onTutorial(CCObject*) {
    if (auto popup = ListPopup::create()) {
        popup->show();
    }
}
```

## Проверьте результат

Откройте окно через кнопку. Вверху должна быть Row 1. Прокрутите колесом или перетаскиванием до Row 20; текст за пределами области должен обрезаться. Закройте окно, откройте снова и проверьте верх списка. На целевой мобильной платформе отдельно проверьте жесты.

## Если не работает

Нет прокрутки: проверьте высоту m_contentLayer — она должна превышать высоту viewport. Строки не двигаются: добавляйте их в m_contentLayer, а не m_mainLayer. Начало списка скрыто: вызывайте scrollToTop после размера и дочерних узлов. Для кликабельных строк понадобится CCMenu и проверка конфликтов нажатия с перетаскиванием.

Сигнатуры сверены с исходниками SDK 5.10.1. Эти примеры не компилировались и не запускались в Geometry Dash в данной среде.

## Дальше

[Button](/ru/v5/tutorials/buttons) · [Popup](/ru/v5/tutorials/popup) · [ScrollLayer](/ru/v5/tutorials/scroll-layer)

[Geode example mod](https://github.com/geode-sdk/example-mod) · [Popup.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Popup.hpp) · [ScrollLayer.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/ScrollLayer.hpp)
