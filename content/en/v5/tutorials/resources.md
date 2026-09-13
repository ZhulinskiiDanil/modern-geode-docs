---
title: 'resources'
---

## What you will build

A PNG bundled inside the `.geode` package and displayed in the main menu.

## Add the file and manifest entry

Save a high-resolution PNG as `resources/tutorial-logo.png`, then merge this block into your existing `mod.json`.

```json [mod.json]
{
  "resources": {
    "sprites": ["resources/tutorial-logo.png"]
  }
}
```

## Complete C++ example

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

## How it works

The build creates lower-quality variants and packages them. `_spr` expands the file name to your mod’s namespaced resource name. For a spritesheet use `spritesheets` in `mod.json` and `createWithSpriteFrameName` in C++.

## Verify and troubleshoot

Rebuild after changing `mod.json` or the PNG. If loading fails, check the exact letter case and confirm the resource appears in the built package. Provide only the high-resolution source image; let Geode generate the other quality levels.

[Resources reference](https://docs.geode-sdk.org/mods/resources/)
