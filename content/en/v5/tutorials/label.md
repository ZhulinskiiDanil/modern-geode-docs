---
title: 'label'
---

## What you will build

A Unicode-friendly `geode::Label` with a maximum width, rich color tags and a position in the main menu. This is the modern replacement for `CCLabelBMFont` in Geode 5.9+.

## Complete example

Replace `src/main.cpp` with this standalone example. It does not require another tutorial.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/ui/Label.hpp>
using namespace geode::prelude;

class $modify(LabelTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        auto size = CCDirector::sharedDirector()->getWinSize();
        auto label = geode::Label::createRich(
            "<cg>Geode</c> labels support Unicode: Привет!",
            "bigFont.fnt"
        );
        if (!label) return false;

        label->setAlignment(geode::Label::Alignment::Center);
        label->setMaxWidth(220.f);
        label->setPosition(size / 2.f);
        label->setID("tutorial-label"_spr);
        this->addChild(label, 10);
        return true;
    }
};
```

## How it works

`Label::createRich` accepts a string and a `.fnt` file. `<cg>...</c>` applies a color tag; plain text can use `Label::create`. `setMaxWidth` enables wrapping, and `setAlignment` controls the wrapped lines. Use `setText` for efficient plain-text updates and `setRichText` when the tags change.

## Verify and troubleshoot

Build with `geode build` and open the main menu. The centered message should wrap inside 220 units and render the Cyrillic greeting. If glyphs are missing, register a fallback font with `registerFont`. If colors reset after changing text, set the rich text again rather than calling `setText` with markup.

[Label.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Label.hpp) · [Geode changelog: Label added in v5.9](https://github.com/geode-sdk/geode/blob/main/CHANGELOG.md)
