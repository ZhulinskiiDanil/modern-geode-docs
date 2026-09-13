---
title: 'scroll-layer'
---

## What you will build

A ScrollLayer containing twenty rows inside a Popup, with a 260 × 150 viewport.

## Before you start

Use the First mod project with SDK 5.10.1 and a working build. Finding bottom-menu requires its geode.node-ids dependency. Replace the learning code; do not add a second TutorialMenu definition.

[First mod](/en/v5/get-started/first-mod) · [Button](/en/v5/tutorials/buttons)

## Complete example

Place ListPopup before TutorialMenu in the button tutorial’s src/main.cpp. Replace onTutorial’s body with the opening code below.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/ui/Popup.hpp>
#include <Geode/ui/ScrollLayer.hpp>
#include <string>
using namespace geode::prelude;

class ListPopup : public Popup {
protected:
    bool init() {
        if (!Popup::init(300.f, 240.f)) return false;
        setTitle("Scrollable list");
        auto list = ScrollLayer::create(CCSize{260.f, 150.f});
        list->setPosition({20.f, 35.f});
        m_mainLayer->addChild(list);
        constexpr int count = 20;
        constexpr float rowHeight = 28.f;
        constexpr float contentHeight = count * rowHeight;
        list->m_contentLayer->setContentSize({260.f, contentHeight});
        for (int i = 0; i < count; ++i) {
            auto text = std::string("Row ") + std::to_string(i + 1);
            auto label = CCLabelBMFont::create(text.c_str(), "bigFont.fnt");
            label->setScale(0.45f);
            label->setPosition({130.f, contentHeight - (i + 0.5f) * rowHeight});
            list->m_contentLayer->addChild(label);
        }
        list->scrollToTop();
        return true;
    }
public:
    static ListPopup* create() {
        auto result = new ListPopup();
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

ScrollLayer is the viewport; m_contentLayer owns scrolling children. The content is 20 × 28 = 560 units tall, larger than the viewport. Rows run top to bottom, and scrollToTop runs after sizing. These rows are labels, not clickable buttons.

## Open the window

```cpp
void onTutorial(CCObject*) {
    if (auto popup = ListPopup::create()) {
        popup->show();
    }
}
```

## Verify the result

Open the popup and check Row 1 at the top. Use the wheel or drag to reach Row 20; content outside the viewport should be clipped. Close and reopen to verify the initial position. Test gestures separately on each target mobile platform.

## Troubleshooting

No scrolling: content height must exceed viewport height. Static rows: attach them to m_contentLayer rather than m_mainLayer. Wrong initial position: size and populate before scrollToTop. Clickable rows require a CCMenu and testing click-versus-drag behavior.

Signatures were checked against SDK 5.10.1 sources. These examples have not been compiled or run in Geometry Dash in this environment.

## Next steps

[Button](/en/v5/tutorials/buttons) · [Popup](/en/v5/tutorials/popup) · [ScrollLayer](/en/v5/tutorials/scroll-layer)

[Geode example mod](https://github.com/geode-sdk/example-mod) · [Popup.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Popup.hpp) · [ScrollLayer.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/ScrollLayer.hpp)
