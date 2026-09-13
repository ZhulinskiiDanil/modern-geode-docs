---
title: 'src/main.cpp'
---

## Purpose

This is the starting point for your mod behavior. In the example below, the game initializes its main menu and our hook writes a log message.

## How this file fits in

Place this complete example in src/main.cpp of a generated project. The Geode header provides SDK types; the modify header supports the specific game class.

## Example

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>

using namespace geode::prelude;

class $modify(MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        log::info("The menu is ready");

        return true;
    }
};
```

## Things to keep in mind

Always preserve the bool init() signature and call the original before using the menu. The hook runs when the game calls init(), not simply because the library has been loaded.

## Verify the result

Build, install the package and restart the game. Look for “The menu is ready” in the Geode log. To add a visible button, continue with the complete first-mod tutorial.

[Official template](https://github.com/geode-sdk/example-mod) · [Project overview](/en/v5/structure/project)
