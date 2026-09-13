---
title: 'buttons'
---

## What you will build

A button at the top left of the main menu. Clicking writes Tutorial button clicked to the Geode log.

## Before you start

Use a separate mod project targeting SDK 5.10.1 with a working build. No other tutorial is required. Replace src/main.cpp with the complete example; do not merge it with other tutorial hooks. No extra mod.json dependencies are needed.

## Complete example

All code for this tutorial is in one src/main.cpp file.

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

## How it works

CCSprite draws the icon, CCMenuItemSpriteExtra receives clicks, and menu_selector calls onTutorial. A new CCMenu is attached to MenuLayer; the button uses local position (0, 0). The callback takes CCObject* and logs a message. No node-ID lookup is needed.

## Verify the result

Build with geode build and launch the game with the mod installed. Click the like icon at the top left and check the Geode log for Tutorial button clicked. Repeat.

## Troubleshooting

Missing button: check mod loading and menu position. Missing log: check void onTutorial(CCObject*) and Geode log access. A sprite alone is not clickable: use a CCMenuItem inside CCMenu.

Code was checked against SDK 5.10.1 APIs but has not been compiled or run in-game here.

[Geode SDK source](https://github.com/geode-sdk/example-mod)
