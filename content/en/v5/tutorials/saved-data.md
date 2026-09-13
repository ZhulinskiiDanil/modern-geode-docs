---
title: 'saved-data'
---

## What you will build

A counter that increases each time the main menu is created and remains available after restarting the game.

## Complete example

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>

using namespace geode::prelude;

class $modify(SavedDataTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        auto mod = Mod::get();
        auto visits = mod->getSavedValue<int64_t>("menu-visits", 0);

        visits += 1;
        mod->setSavedValue("menu-visits", visits);

        log::info("Main menu visits: {}", visits);
        return true;
    }
};
```

## How it works

Saved values do not need a declaration in `mod.json`. The second argument of `getSavedValue` is used the first time. `setSavedValue` updates the mod’s save container, which Geode writes to disk.

## Verify and troubleshoot

Open the main menu, leave it and return; the number should increase. Restart the game and confirm it continues. Keep the key and C++ type stable. Use settings instead when the user should edit a value through Geode’s settings UI.

[Saving data reference](https://docs.geode-sdk.org/mods/savedata/) · [Mod.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/loader/Mod.hpp)
