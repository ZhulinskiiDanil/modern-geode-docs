---
title: 'data'
---

## Settings or saved values?

Settings are user-facing configuration declared in mod.json. Saved values are state managed by your code, such as whether a tutorial was already shown. Do not force users to edit a JSON file for a preference that belongs in settings.

## A complete persistence example

Prerequisites: a generated project, MenuLayer hooks, and bool values. Replace src/main.cpp, build and install:

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
using namespace geode::prelude;

class $modify(MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        auto mod = Mod::get();
        bool wasSeen = mod->getSavedValue<bool>("menu-seen", false);
        log::info("Menu was seen before: {}", wasSeen);
        mod->setSavedValue<bool>("menu-seen", true);
        return true;
    }
};
```

The first valid read uses false as its default. We record true after the menu appears. The previous value is logged so that you can observe the change.

## Verify the result

Start the game and inspect the log. On a fresh save, the first result is false. Exit the game normally and start it again: it should be true. Geode's save lifecycle persists the data; a crash is not evidence that a write reached disk.

## Metadata and settings

mod.json declares identity, SDK and game compatibility, dependencies, resources, and optional settings. Read a setting with the type expected by its declaration. A saved boolean and a settings boolean with the same key are separate concepts.

## Complex data and mistakes

Keep schema versions for complex saved JSON. Validate fields and handle missing values when updating an existing mod. Renaming your mod ID may separate it from earlier saved data. Do not assume a corrupt or differently typed value can be read successfully.

## Next step

Add a meaningful preference to your menu button. Consult the authoritative settings documentation for the exact schema before adding a new settings type.

[Mod.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/loader/Mod.hpp#L267) · [mod.json reference](https://docs.geode-sdk.org/mods/configuring/)
