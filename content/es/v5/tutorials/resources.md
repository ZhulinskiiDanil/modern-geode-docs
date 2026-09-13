---
title: 'resources'
---

## Qué vas a crear

Un PNG empaquetado dentro del `.geode` y visible en el menú principal.

## Añade el archivo y el manifest

Guarda un PNG de alta resolución como `resources/tutorial-logo.png` y combina este bloque con tu `mod.json`.

```json [mod.json]
{
  "resources": {
    "sprites": ["resources/tutorial-logo.png"]
  }
}
```

## Ejemplo C++ completo

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>

using namespace geode::prelude;

class $modify(ResourceTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        auto size = CCDirector::sharedDirector()->getWinSize();
        auto sprite = CCSprite::create("tutorial-logo.png"_spr);

        if (!sprite) {
            log::error("tutorial-logo.png could not be loaded");
            return true;
        }

        sprite->setPosition({size.width - 40.f, 40.f});
        sprite->setScale(0.5f);

        this->addChild(sprite, 10);

        return true;
    }
};
```

## Cómo funciona

La compilación crea variantes de menor calidad y empaqueta el recurso. `_spr` convierte el nombre en el nombre con espacio de tu mod. Para un spritesheet usa `spritesheets` en `mod.json` y `createWithSpriteFrameName` en C++.

## Comprobación y errores

Vuelve a compilar tras cambiar `mod.json` o el PNG. Si falla, revisa mayúsculas y confirma que el archivo esté en el paquete. Aporta solo la imagen de alta resolución; Geode crea las demás.

[Referencia de recursos](https://docs.geode-sdk.org/mods/resources/)
