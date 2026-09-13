---
title: 'popup'
---

## What you will build

A custom 300 × 200 Popup with a title, text, and the built-in close button.

## Before you start

Use the First mod project with SDK 5.10.1 and a working build. Finding bottom-menu requires its geode.node-ids dependency. Replace the learning code; do not add a second TutorialMenu definition.

[First mod](/en/v5/get-started/first-mod) · [Button](/en/v5/tutorials/buttons)

## Complete example

Insert this class before TutorialMenu in the button tutorial’s src/main.cpp. Replace only the onTutorial body with the opening code below.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/ui/Popup.hpp>
using namespace geode::prelude;

class TutorialPopup : public Popup {
protected:
    bool init() {
        if (!Popup::init(300.f, 200.f)) return false;
        setTitle("My popup");
        auto message = CCLabelBMFont::create("Hello, modder!", "bigFont.fnt");
        message->setScale(0.5f);
        message->setPosition({150.f, 100.f});
        m_mainLayer->addChild(message);
        return true;
    }
public:
    static TutorialPopup* create() {
        auto result = new TutorialPopup();
        if (result->init()) {
            result->autorelease();
            return result;
        }
        delete result;
        return nullptr;
    }
};
```

## How it works

Popup::init builds the window. Attach content to m_mainLayer using window-local coordinates. The factory checks initialization, autoreleases a successful object, and deletes it on failure. SDK 5.10.1 uses non-template Popup; older Popup<> and setup examples do not match this header.

## Open the window

```cpp
void onTutorial(CCObject*) {
    if (auto popup = TutorialPopup::create()) {
        popup->show();
    }
}
```

## Verify the result

Build, press the tutorial button, and check the title, text, close button, and reopening. Try Escape/Back and a different game window size.

## Troubleshooting

create does not display the window: call show. Popup<> or initAnchored errors indicate mixed SDK APIs. Misplaced content usually uses screen coordinates instead of m_mainLayer coordinates. Do not manually delete an autoreleased popup.

Signatures were checked against SDK 5.10.1 sources. These examples have not been compiled or run in Geometry Dash in this environment.

## Next steps

[Button](/en/v5/tutorials/buttons) · [Popup](/en/v5/tutorials/popup) · [ScrollLayer](/en/v5/tutorials/scroll-layer)

[Geode example mod](https://github.com/geode-sdk/example-mod) · [Popup.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Popup.hpp) · [ScrollLayer.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/ScrollLayer.hpp)
