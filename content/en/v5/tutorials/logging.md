---
title: 'logging'
---

## What you will build

A small diagnostic hook that uses the appropriate log level and formatted values.

## Complete example

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>

using namespace geode::prelude;

$on_mod(Loaded) {
    log::info("Tutorial mod loaded: {}", Mod::get()->getVersion());
}

class $modify(LoggingTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) {
            log::error("MenuLayer initialization failed");

            return false;
        }

        log::debug(
            "Menu size: {}, children: {}",
            this->getContentSize(),
            this->getChildrenCount()
        );

        return true;
    }
};
```

## Choose a level

Use `error` when functionality cannot continue, `warn` when you recover, `info` for meaningful lifecycle events, and `debug` for detailed diagnostics. Debug messages are hidden by default until enabled in Geode’s log filtering settings.

## Verify and troubleshoot

Open the platform console or the latest file under `geode/logs`. Confirm the load line, then enable debug filtering and reopen the main menu. Avoid logging every frame or exposing tokens, passwords and private user data.

[Logging reference](https://docs.geode-sdk.org/tutorials/logging/)
