---
title: 'layouts'
---

## What you will build

A centered row of three icons positioned by `RowLayout`, with no individual X coordinates.

## Complete example

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

## How it works

The parent’s content size is the layout boundary. `setLayout` assigns the layout and `updateLayout` applies it after children change. Call it again when adding, removing or resizing children; do not call it every frame.

## Verify and troubleshoot

Open the main menu and check that the three icons have equal gaps. If they overlap or scale unexpectedly, increase the parent width or adjust the layout’s gap and scale options.

[Layouts reference](https://docs.geode-sdk.org/tutorials/layouts/) · [Layout.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Layout.hpp)
