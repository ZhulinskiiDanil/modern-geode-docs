---
title: 'node-ids'
---

## Что получится

Hook, который находит `bottom-menu` по ID и добавляет туда подписанный узел без индексов дочерних элементов.

## Добавьте зависимость

Объедините этот блок с существующим `mod.json`.

```json [mod.json]
{
  "dependencies": {
    "geode.node-ids": ">=1.23.3"
  }
}
```

## Полный пример C++

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>

using namespace geode::prelude;

class $modify(NodeIdTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        auto menu = this->getChildByID("bottom-menu");

        if (!menu) {
            log::error("bottom-menu was not found");
            return true;
        }

        auto label = CCLabelBMFont::create("Node found", "bigFont.fnt");
        label->setScale(0.35f);
        label->setID("node-found-label"_spr);

        menu->addChild(label);
        menu->updateLayout();

        return true;
    }
};
```

## Проверка и ошибки

Откройте главное меню и найдите `Node found` в нижнем ряду. Всегда обрабатывайте отсутствие узла: другая версия игры или мод может изменить дерево. Суффикс `_spr` нужен для ID, создаваемых вашим модом; не добавляйте его к чужому `bottom-menu`.

[Документация Node IDs](https://docs.geode-sdk.org/tutorials/nodetree/)
