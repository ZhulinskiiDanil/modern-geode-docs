---
title: 'scroll-layer'
---

## Что получится

ScrollLayer с двадцатью строками прямо в главном меню: область просмотра 140 × 100, содержимое выше видимой области.

## Подготовка

Нужен отдельный проект мода с SDK 5.10.1 и работающей сборкой. Другие уроки проходить не требуется. Замените src/main.cpp полным примером ниже; не объединяйте его с другими учебными hooks. Дополнительные зависимости в mod.json не нужны.

## Полный пример

Весь код для этого урока находится в одном файле src/main.cpp.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/ui/ScrollLayer.hpp>
#include <string>
using namespace geode::prelude;

class $modify(ScrollTutorialMenu, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        auto size = CCDirector::sharedDirector()->getWinSize();
        auto list = ScrollLayer::create(CCSize{140.f, 100.f});
        list->setPosition({size.width - 150.f, size.height - 130.f});
        list->setID("tutorial-list"_spr);
        this->addChild(list, 10);

        constexpr int count = 20;
        constexpr float rowHeight = 24.f;
        constexpr float contentHeight = count * rowHeight;
        list->m_contentLayer->setContentSize({140.f, contentHeight});
        for (int i = 0; i < count; ++i) {
            auto text = std::string("Row ") + std::to_string(i + 1);
            auto label = CCLabelBMFont::create(text.c_str(), "bigFont.fnt");
            label->setScale(0.4f);
            label->setPosition({70.f, contentHeight - (i + 0.5f) * rowHeight});
            list->m_contentLayer->addChild(label);
        }
        list->scrollToTop();
        return true;
    }
};
```

## Как это работает

ScrollLayer добавляется непосредственно в MenuLayer. Его размер 140 × 100 — область просмотра; высота m_contentLayer равна 20 × 24 = 480. Строки принадлежат m_contentLayer и двигаются вместе с ним. scrollToTop вызывается после настройки содержимого. Координаты рассчитаны от правого верхнего угла окна игры; это демонстрационная позиция, которую нужно адаптировать под свой интерфейс.

## Проверьте результат

Соберите мод командой geode build и откройте главное меню игры. Список появится справа сверху без дополнительных действий. Проверьте Row 1, прокрутите колесом или перетаскиванием до Row 20. Текст за границей списка должен обрезаться. Выйдите из меню и вернитесь: список снова начинается сверху. На целевом мобильном устройстве проверьте жесты.

## Если не работает

Нет прокрутки: высота m_contentLayer должна превышать высоту ScrollLayer. Строки стоят на месте: добавляйте их в m_contentLayer. Начало скрыто: вызывайте scrollToTop после настройки размера и строк. Список перекрывает игровые элементы: измените позицию и размер; для рабочего интерфейса выделите отдельную свободную область.

Код сверён с API SDK 5.10.1, но здесь не компилировался и не запускался в игре.

[Geode SDK source](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/ScrollLayer.hpp)
