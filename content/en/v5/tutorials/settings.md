---
title: 'settings'
---

## What you will build

A user-editable toggle named “Show greeting” and C++ code that reads it and reacts to later changes.

## Declare the setting

Add `settings` to your existing `mod.json`; keep your own ID, name, version and platform values.

```json [mod.json]
{
  "geode": "5.10.1",
  "id": "yourname.settings-demo",
  "name": "Settings Demo",
  "version": "1.0.0",
  "settings": {
    "show-greeting": {
      "type": "bool",
      "name": "Show greeting",
      "description": "Write a greeting when the mod loads",
      "default": true
    }
  }
}
```

## Read and observe it

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/loader/SettingV3.hpp>

using namespace geode::prelude;

$on_mod(Loaded) {
    auto enabled = Mod::get()->getSettingValue<bool>("show-greeting");
    log::info("Show greeting: {}", enabled);

    listenForSettingChanges<bool>("show-greeting", [](bool value) {
        log::info("Show greeting changed to {}", value);
    });
}
```

## Verify and troubleshoot

Build, open the mod’s settings page and toggle the option. The callback runs when the value changes; it does not run once automatically at startup, which is why the example reads the initial value separately. The C++ type must match the setting type: `bool` for `bool`, `int64_t` for `int`, and `double` for `float`.

[Settings reference](https://docs.geode-sdk.org/mods/settings/) · [SettingV3.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/loader/SettingV3.hpp)
