---
title: 'scroll-layer'
---

## What you will build

A twenty-row ScrollLayer directly in the main menu, with a 140 × 100 viewport.

## Before you start

Use a separate mod project targeting SDK 5.10.1 with a working build. No other tutorial is required. Replace src/main.cpp with the complete example; do not merge it with other tutorial hooks. No extra mod.json dependencies are needed.

## Complete example

All code for this tutorial is in one src/main.cpp file.

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

## How it works

ScrollLayer attaches directly to MenuLayer. Its 140 × 100 size defines the viewport; m_contentLayer is 20 × 24 = 480 units tall. Rows belong to m_contentLayer and move with it. Call scrollToTop after populating. The demo position is relative to the top right of the game window; adapt it to your interface.

## Verify the result

Build with geode build and open the main menu. The list appears at the top right immediately. Check Row 1, then scroll or drag to Row 20. Content outside the viewport should be clipped. Leave and return to verify the initial position. Test gestures on the target mobile device.

## Troubleshooting

Content height must exceed viewport height. Put rows in m_contentLayer so they move. Call scrollToTop after sizing and adding rows. If the list overlaps game controls, adjust its size and position; reserve free space in a production interface.

Code was checked against SDK 5.10.1 APIs but has not been compiled or run in-game here.

[Geode SDK source](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/ScrollLayer.hpp)
