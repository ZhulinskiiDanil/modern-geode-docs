---
title: 'notifications'
---

## What you will build

A success notification that appears when the main menu opens and hides automatically after two seconds.

## Complete example

Replace `src/main.cpp` with this file. It does not depend on another tutorial or on `geode.node-ids`.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/ui/Notification.hpp>

using namespace geode::prelude;

class $modify(NotificationTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        Notification::create(
            "The mod is ready!",
            NotificationIcon::Success,
            2.f
        )->show();

        return true;
    }
};
```

## How it works

`Notification::create` receives text, an icon and display time. `show()` is required. Use `0.f` only when you keep the returned pointer and later call `hide()` or `cancel()`.

## Verify and troubleshoot

Build with `geode build`, open the main menu and confirm the message disappears by itself. If nothing appears, verify that the mod loaded and that `MenuLayer::init()` calls the original function before creating the notification. Avoid creating one every frame or inside frequently repeated callbacks.

[Notification.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Notification.hpp)
