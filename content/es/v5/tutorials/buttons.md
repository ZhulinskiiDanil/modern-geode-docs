---
title: 'buttons'
---

## Qué vas a crear

Un Button en el menú inferior que muestra un mensaje al pulsarlo.

## Preparación

Usa el proyecto Primer mod con SDK 5.10.1 y compilación configurada. Buscar bottom-menu requiere su dependencia geode.node-ids. Sustituye el código didáctico; no dupliques la definición de TutorialMenu.

[First mod](/es/v5/get-started/first-mod) · [Button](/es/v5/tutorials/buttons)

## Ejemplo completo

Coloca el ejemplo completo en src/main.cpp.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
using namespace geode::prelude;

class $modify(TutorialMenu, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        auto menu = this->getChildByID("bottom-menu");
        if (!menu) {
            log::warn("bottom-menu was not found");
            return true;
        }
        auto icon = CCSprite::createWithSpriteFrameName("GJ_likeBtn_001.png");
        auto button = CCMenuItemSpriteExtra::create(
            icon, this, menu_selector(TutorialMenu::onTutorial));
        button->setID("tutorial-button"_spr);
        menu->addChild(button);
        menu->updateLayout();
        return true;
    }
    void onTutorial(CCObject*) {
        FLAlertLayer::create("Tutorial", "The button works!", "OK")->show();
    }
};
```

## Cómo funciona

CCSprite dibuja el icono; CCMenuItemSpriteExtra recibe pulsaciones; menu_selector enlaza onTutorial. El callback recibe CCObject*. Añadimos el elemento al menú existente y actualizamos su layout. _spr incorpora el ID del mod al ID del nodo.

## Comprueba el resultado

Compila con geode build, inicia el juego con el mod instalado y pulsa el icono de Me gusta del menú principal. Debe aparecer The button works!. Cierra el mensaje y repite.

## Solución de problemas

Si falta el botón, revisa el aviso bottom-menu y la dependencia node-ids. El elemento debe estar dentro de CCMenu. Comprueba la clase del callback y la firma void onTutorial(CCObject*).

Las firmas se comprobaron con las fuentes del SDK 5.10.1. Estos ejemplos no se han compilado ni ejecutado en Geometry Dash en este entorno.

## Siguiente paso

[Button](/es/v5/tutorials/buttons) · [Popup](/es/v5/tutorials/popup) · [ScrollLayer](/es/v5/tutorials/scroll-layer)

[Geode example mod](https://github.com/geode-sdk/example-mod) · [Popup.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Popup.hpp) · [ScrollLayer.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/ScrollLayer.hpp)
