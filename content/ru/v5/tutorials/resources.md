---
title: 'resources'
---

## Что получится

PNG, упакованный в `.geode` и отображаемый в главном меню игры.

## Добавьте файл и manifest

Сохраните PNG высокого разрешения как `resources/tutorial-logo.png`, затем добавьте блок в существующий `mod.json`.

```json [mod.json]
{
  "resources": {
    "sprites": ["resources/tutorial-logo.png"]
  }
}
```

## Полный пример C++

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>

using namespace geode::prelude;

class $modify(ResourceTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        auto size = CCDirector::sharedDirector()->getWinSize();
        auto sprite = CCSprite::create("tutorial-logo.png"_spr);

        if (!sprite) {
            log::error("tutorial-logo.png could not be loaded");
            return true;
        }

        sprite->setPosition({size.width - 40.f, 40.f});
        sprite->setScale(0.5f);

        this->addChild(sprite, 10);

        return true;
    }
};
```

## Как это работает

Сборка создаёт версии для низкого качества и кладёт ресурсы в пакет. `_spr` превращает имя в namespaced-имя вашего мода. Для spritesheet используйте `spritesheets` в `mod.json` и `createWithSpriteFrameName` в C++.

## Проверка и ошибки

Пересобирайте мод после изменения `mod.json` или PNG. При ошибке проверьте регистр букв и наличие файла в собранном пакете. Добавляйте только исходник высокого разрешения: остальные варианты создаёт Geode.

[Документация ресурсов](https://docs.geode-sdk.org/mods/resources/)
