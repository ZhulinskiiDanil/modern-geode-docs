---
title: 'buttons'
---

## What you will build

A Button in the bottom menu that opens a message when clicked.

## Before you start

Use the First mod project with SDK 5.10.1 and a working build. Finding bottom-menu requires its geode.node-ids dependency. Replace the learning code; do not add a second TutorialMenu definition.

[First mod](/en/v5/get-started/first-mod) · [Button](/en/v5/tutorials/buttons)

## Complete example

Put this complete example in src/main.cpp.

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

## How it works

CCSprite draws the icon; CCMenuItemSpriteExtra handles clicks; menu_selector connects it to onTutorial. The callback takes CCObject*. Add the item to the existing menu and update its layout. The _spr suffix namespaces the node ID with your mod ID.

## Verify the result

Build with geode build, launch the game with the mod installed, and open the main menu. Click the like icon: The button works! should appear once. Close it and repeat.

## Troubleshooting

Missing button: check the bottom-menu warning and node-ids dependency. An item outside CCMenu will not receive normal menu clicks. Check the callback class name and void onTutorial(CCObject*) signature.

Signatures were checked against SDK 5.10.1 sources. These examples have not been compiled or run in Geometry Dash in this environment.

## Next steps

[Button](/en/v5/tutorials/buttons) · [Popup](/en/v5/tutorials/popup) · [ScrollLayer](/en/v5/tutorials/scroll-layer)

[Geode example mod](https://github.com/geode-sdk/example-mod) · [Popup.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Popup.hpp) · [ScrollLayer.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/ScrollLayer.hpp)
