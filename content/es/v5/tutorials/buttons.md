---
title: 'buttons'
---

## Qué vas a crear

Un botón arriba a la izquierda del menú principal. Al pulsarlo escribe Tutorial button clicked en el registro de Geode.

## Preparación

Usa un proyecto independiente con SDK 5.10.1 y compilación configurada. No necesitas otro tutorial. Sustituye src/main.cpp por el ejemplo completo; no mezcles hooks de otros ejemplos. No hacen falta dependencias adicionales en mod.json.

## Ejemplo completo

Todo el código está en un único archivo src/main.cpp.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
using namespace geode::prelude;

class $modify(ButtonTutorialMenu, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        auto size = CCDirector::sharedDirector()->getWinSize();
        auto menu = CCMenu::create();
        menu->setPosition({35.f, size.height - 45.f});
        this->addChild(menu, 10);
        auto icon = CCSprite::createWithSpriteFrameName("GJ_likeBtn_001.png");
        auto button = CCMenuItemSpriteExtra::create(
            icon, this, menu_selector(ButtonTutorialMenu::onTutorial));
        button->setID("tutorial-button"_spr);
        menu->addChild(button);
        return true;
    }
    void onTutorial(CCObject*) {
        log::info("Tutorial button clicked");
    }
};
```

## Cómo funciona

CCSprite dibuja, CCMenuItemSpriteExtra recibe pulsaciones y menu_selector llama a onTutorial. Un CCMenu propio se añade a MenuLayer; el botón usa la posición local (0, 0). El callback recibe CCObject* y escribe en el registro. No se buscan nodos por ID.

## Comprueba el resultado

Compila con geode build e inicia el juego con el mod instalado. Pulsa el icono de Me gusta arriba a la izquierda y busca Tutorial button clicked en el registro de Geode. Repite.

## Solución de problemas

Si falta el botón, revisa la carga del mod y la posición. Si falta el registro, comprueba void onTutorial(CCObject*) y el acceso a los logs. Un sprite solo no recibe pulsaciones: necesitas CCMenuItem dentro de CCMenu.

El código se contrastó con las APIs del SDK 5.10.1, pero no se compiló ni ejecutó en el juego aquí.

[Geode SDK source](https://github.com/geode-sdk/example-mod)
