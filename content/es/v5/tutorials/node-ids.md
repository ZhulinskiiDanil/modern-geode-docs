---
title: 'node-ids'
---

## Qué vas a crear

Un hook que encuentra `bottom-menu` por ID y añade una etiqueta sin depender de índices de hijos.

## Añade la dependencia

Combina este bloque con tu `mod.json` existente.

```json [mod.json]
{
  "dependencies": {
    "geode.node-ids": ">=1.23.3"
  }
}
```

## Ejemplo C++ completo

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>

using namespace geode::prelude;

class $modify(NodeIdTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        auto menu = this->getChildByID("bottom-menu");

        if (!menu) {
            log::error("bottom-menu was not found");
            return true;
        }

        auto label = CCLabelBMFont::create("Node found", "bigFont.fnt");
        label->setScale(0.35f);
        label->setID("node-found-label"_spr);

        menu->addChild(label);
        menu->updateLayout();

        return true;
    }
};
```

## Comprobación y errores

Abre el menú principal y busca `Node found` en la fila inferior. Gestiona siempre el caso ausente: otra versión o mod puede cambiar el árbol. `_spr` es para IDs creados por tu mod; no lo uses con el `bottom-menu` ajeno.

[Referencia de Node IDs](https://docs.geode-sdk.org/tutorials/nodetree/)
