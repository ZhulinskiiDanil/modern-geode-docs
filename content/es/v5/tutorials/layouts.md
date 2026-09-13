---
title: 'layouts'
---

## Qué vas a crear

Una fila centrada de tres iconos organizada por `RowLayout`, sin coordenadas X individuales.

## Ejemplo completo

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/ui/Layout.hpp>

using namespace geode::prelude;

class $modify(LayoutTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        auto size = CCDirector::sharedDirector()->getWinSize();

        auto row = CCNode::create();
        row->setContentSize({150.f, 45.f});
        row->setPosition({size.width / 2.f, size.height - 55.f});
        row->setAnchorPoint({0.5f, 0.5f});
        row->setLayout(RowLayout::create()->setGap(12.f));

        this->addChild(row, 10);

        for (auto frame : {
            "GJ_likeBtn_001.png",
            "GJ_starBtn_001.png",
            "GJ_optionsBtn_001.png"
        }) {
            row->addChild(CCSprite::createWithSpriteFrameName(frame));
        }

        row->updateLayout();

        return true;
    }
};
```

## Cómo funciona

El tamaño del padre define el límite del layout. `setLayout` asigna el diseño y `updateLayout` lo aplica después de cambiar los hijos. Repítelo al añadir, quitar o redimensionar nodos; no en cada fotograma.

## Comprobación y errores

Abre el menú y comprueba que los tres iconos tienen separaciones iguales. Si se solapan o reducen, amplía el padre o ajusta el espacio y las opciones de escala.

[Referencia de Layouts](https://docs.geode-sdk.org/tutorials/layouts/) · [Layout.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Layout.hpp)
