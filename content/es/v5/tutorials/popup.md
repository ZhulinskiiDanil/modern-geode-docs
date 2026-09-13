---
title: 'popup'
---

## Qué vas a crear

Un Popup propio de 300 × 200 con texto y cierre. El ejemplo completo incluye un pequeño botón para abrirlo.

## Preparación

Usa un proyecto independiente con SDK 5.10.1 y compilación configurada. No necesitas otro tutorial. Sustituye src/main.cpp por el ejemplo completo; no mezcles hooks de otros ejemplos. No hacen falta dependencias adicionales en mod.json.

## Ejemplo completo

Todo el código está en un único archivo src/main.cpp.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
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

class $modify(PopupTutorialMenu, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        auto size = CCDirector::sharedDirector()->getWinSize();
        auto menu = CCMenu::create();
        menu->setPosition({35.f, size.height - 45.f});
        this->addChild(menu, 10);
        auto icon = CCSprite::createWithSpriteFrameName("GJ_likeBtn_001.png");
        auto button = CCMenuItemSpriteExtra::create(
            icon, this, menu_selector(PopupTutorialMenu::onTutorial));
        button->setID("tutorial-button"_spr);
        menu->addChild(button);
        return true;
    }
    void onTutorial(CCObject*) {
        if (auto popup = TutorialPopup::create()) {
            popup->show();
        }
    }
};
```

## Cómo funciona

Popup::init crea la ventana. El contenido usa coordenadas locales de m_mainLayer. La fábrica comprueba init, usa autorelease si funciona y elimina el objeto si falla. El hook completo de MenuLayer crea un botón cuyo callback llama a create y show. Popup en SDK 5.10.1 no tiene argumentos de plantilla.

## Comprueba el resultado

Compila con geode build y abre el menú principal. Pulsa el icono arriba a la izquierda. Comprueba título, texto, cierre, reapertura, Escape/Back y otro tamaño de ventana.

## Solución de problemas

Llama a show después de create. Los errores Popup<> o initAnchored indican mezcla de APIs. Usa coordenadas de m_mainLayer. No elimines manualmente un objeto con autorelease.

El código se contrastó con las APIs del SDK 5.10.1, pero no se compiló ni ejecutó en el juego aquí.

[Geode SDK source](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Popup.hpp)
