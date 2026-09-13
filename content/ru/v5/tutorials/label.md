---
title: 'label'
---

## Что получится

Unicode-совместимый `geode::Label` с ограничением ширины, цветными тегами и позицией в главном меню. Это современная замена `CCLabelBMFont` в Geode 5.9+.

## Полный пример

Замените `src/main.cpp` этим самостоятельным примером. Другие туториалы не нужны.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/ui/Label.hpp>
using namespace geode::prelude;

class $modify(LabelTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        auto size = CCDirector::sharedDirector()->getWinSize();
        auto label = geode::Label::createRich(
            "<cg>Geode</c> labels support Unicode: Привет!",
            "bigFont.fnt"
        );
        if (!label) return false;

        label->setAlignment(geode::Label::Alignment::Center);
        label->setMaxWidth(220.f);
        label->setPosition(size / 2.f);
        label->setID("tutorial-label"_spr);
        this->addChild(label, 10);
        return true;
    }
};
```

## Как это работает

`Label::createRich` получает строку и файл `.fnt`. Тег `<cg>...</c>` окрашивает фрагмент; для обычного текста используйте `Label::create`. `setMaxWidth` включает переносы, а `setAlignment` выравнивает строки. Для частого обновления обычного текста используйте `setText`, для текста с тегами — `setRichText`.

## Проверка и ошибки

Соберите мод через `geode build` и откройте главное меню. Сообщение должно быть по центру, переноситься в пределах 220 единиц и показывать кириллицу. Если символов не хватает, добавьте fallback через `registerFont`. После изменения текста с тегами устанавливайте rich text заново.

[Label.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Label.hpp) · [Changelog Geode: Label добавлен в v5.9](https://github.com/geode-sdk/geode/blob/main/CHANGELOG.md)
