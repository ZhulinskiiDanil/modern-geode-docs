---
title: 'popup'
---

## What you will build

A custom 300 × 200 Popup with text and closing behavior. The complete example includes a small launcher button.

## Before you start

Use a separate mod project targeting SDK 5.10.1 with a working build. No other tutorial is required. Replace src/main.cpp with the complete example; do not merge it with other tutorial hooks. No extra mod.json dependencies are needed.

## Complete example

All code for this tutorial is in one src/main.cpp file.

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

## How it works

Popup::init builds the window. Add content to m_mainLayer in local coordinates. The factory checks init, autoreleases on success, and deletes on failure. The complete MenuLayer hook below the class creates a launcher whose callback calls create and show. SDK 5.10.1 Popup has no template arguments.

## Verify the result

Build with geode build and open the main menu. Click the like icon at the top left. Check the title, text, close button, reopening, Escape/Back, and another game window size.

## Troubleshooting

Call show after create to display the window. Popup<> or initAnchored errors indicate mixed APIs. Use m_mainLayer coordinates for content. Do not manually delete an autoreleased object.

Code was checked against SDK 5.10.1 APIs but has not been compiled or run in-game here.

[Geode SDK source](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Popup.hpp)
