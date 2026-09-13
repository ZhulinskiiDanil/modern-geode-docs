---
title: 'layouts'
---

## Что получится

Ряд из трёх иконок, выровненный `RowLayout` без отдельных X-координат.

## Полный пример

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/ui/Layout.hpp>

using namespace geode::prelude;

class $modify(LayoutTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        auto size = CCDirector::sharedDirector()->getWinSize();

        auto row = CCNode::create();
        row->setContentSize({150.f, 45.f});
        row->setPosition({size.width / 2.f, size.height - 55.f});
        row->setAnchorPoint({0.5f, 0.5f});
        row->setLayout(RowLayout::create()->setGap(12.f));

        this->addChild(row, 10);

        for (auto frame : {
            "GJ_likeBtn_001.png",
            "GJ_starBtn_001.png",
            "GJ_optionsBtn_001.png"
        }) {
            row->addChild(CCSprite::createWithSpriteFrameName(frame));
        }

        row->updateLayout();

        return true;
    }
};
```

## Как это работает

Размер родителя задаёт границы layout. `setLayout` назначает схему, а `updateLayout` применяет её после изменения дочерних узлов. Вызывайте его после добавления, удаления или изменения размера, но не каждый кадр.

## Проверка и ошибки

Откройте главное меню: расстояния между тремя иконками должны быть одинаковыми. Если они перекрываются или неожиданно уменьшаются, расширьте родителя либо измените gap и параметры масштабирования.

[Документация Layout](https://docs.geode-sdk.org/tutorials/layouts/) · [Layout.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Layout.hpp)
