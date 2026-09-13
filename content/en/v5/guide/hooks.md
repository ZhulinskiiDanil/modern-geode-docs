---
title: 'hooks'
---

## What a hook actually changes

A hook intercepts a function call. It is not a loop and does not run on every frame unless the target function does. Hooking MenuLayer::init is useful because it gives you a moment after the menu is constructed.

## A minimal, complete mod

Prerequisite: a generated Geode project and a working toolchain. Replace src/main.cpp:

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

## Read it in execution order

1. The modify header provides the machinery for this game class.
2. The signature matches the original exactly.
3. MenuLayer::init calls through the hook chain to initialize the game UI.
4. If initialization succeeds, our log line runs.
5. Returning true tells the caller the menu is ready.

## Verify the result

Run `geode build`, install the package, restart the game and open the main menu. Inspect the Geode log for “The menu is ready”. Opening another menu instance can produce another message.

## Compatibility and mistakes

Calling the original is usually essential. Other mods may hook the same function, so do not assume you are the only participant. Do not add arbitrary priorities to fix a misunderstanding of ordering. Fields belonging to a modified object use Geode's fields mechanism; ordinary added members are not a safe substitute.

## Next step

Add a button with the complete first-mod tutorial. For manual hooks and priority, consult the upstream guide only after this example is clear.

[Official hooking guide](https://docs.geode-sdk.org/tutorials/modify/)
