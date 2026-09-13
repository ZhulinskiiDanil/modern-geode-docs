---
title: 'node-ids'
---

## What you will build

A hook that finds the main menu’s `bottom-menu` by ID and adds a namespaced label to it without relying on child indexes.

## Add the dependency

Merge this dependency into your existing `mod.json`.

```json [mod.json]
{
  "dependencies": {
    "geode.node-ids": ">=1.23.3"
  }
}
```

## Complete C++ example

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

## Verify and troubleshoot

Open the main menu and look for “Node found” in the bottom row. Always handle a missing node: another game version or mod may change the tree. `_spr` prefixes IDs you create with your mod ID; do not use it for IDs owned by the game or another mod.

[Getting nodes reference](https://docs.geode-sdk.org/tutorials/nodetree/)
