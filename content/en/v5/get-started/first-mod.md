---
title: 'first-mod'
---

## What we’re building

A new button in Geometry Dash's main menu. Click it and an alert says **You built your first mod.** This is a learning mod, not an index-ready product. Target: Geode v5.10.1 and Geometry Dash 2.2081, matching the referenced template.

## Before you begin

Finish environment setup. You need the loader in your game, the SDK and CLI, and a configured C++ compiler. This example uses `geode.node-ids`: keep the template's dependency `>=v1.23.3` in mod.json. It supplies the stable `bottom-menu` ID.

## How it works

Geode attaches our replacement to `MenuLayer::init`. We call the original first, so the game's menu exists. Then we find its bottom menu, add a button, and ask the layout to position it. The named `HelloMenu` class lets us refer to the callback.

## 1. Create the project

Run this from the parent folder in your terminal:

```bash
geode new
```

Answer the prompts with your own ID (for example `yourname.hello-geode`), name, and developer. Open the generated folder. Keep its CMakeLists.txt; the generated template already connects the SDK and packaging steps.

## 2. Add the complete code

Replace the contents of `src/main.cpp` with this:

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>

using namespace geode::prelude;

class $modify(HelloMenu, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        auto menu = this->getChildByID("bottom-menu");
        if (!menu) return true;

        auto button = CCMenuItemSpriteExtra::create(
            CCSprite::createWithSpriteFrameName("GJ_likeBtn_001.png"),
            this,
            menu_selector(HelloMenu::onHello)
        );
        button->setID("hello-button"_spr);
        menu->addChild(button);
        menu->updateLayout();
        return true;
    }

    void onHello(CCObject*) {
        FLAlertLayer::create(
            "Hello, Geode!", "You built your first mod.", "OK"
        )->show();
    }
};
```

The null check handles a missing menu without crashing. `_spr` prefixes the node ID with your mod ID, reducing collisions. `updateLayout()` places the new child beside existing buttons rather than using hardcoded screen coordinates. The callback accepts `CCObject*`, the signature expected by the menu item.

## 3. Build and install

Run inside the folder containing mod.json:

```bash
geode build
```

If you configured a game profile in Geode CLI, the build can install the package automatically. Otherwise find the generated `.geode` file in the build directory and install it through Geode. Confirm that mod.json lists your actual target SDK and GD versions; do not declare an untested platform supported.

## Expected result

Restart Geometry Dash. The main menu now has an extra thumbs-up button in its bottom row. Click it: a dialog opens. Press OK to dismiss it. Re-enter the menu and verify there is one added button for each menu instance.

## Common mistakes

- Missing MenuLayer header: include the modify header, not just Geode.hpp.
- Wrong hook signature: it must be `bool init()`, not void.
- No button: check the mod is enabled and the node-ids dependency is loaded.
- Wrong package: inspect Geode's load error and match your game, SDK and platform.
- Forgetting the original init: the game UI may be absent or invalid.

## What to learn next

Explore the project tree, then hooks and UI layouts. Change the alert text and rebuild to confirm that your edit, build and installation loop works.

[Official example used for API verification](https://github.com/geode-sdk/example-mod/blob/main/src/main.cpp) · [Build instructions](https://github.com/geode-sdk/docs/blob/main/getting-started/create-mod.md)
