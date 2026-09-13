---
title: 'scroll-layer'
---

## Qué vas a crear

Un ScrollLayer de veinte filas directamente en el menú principal, con área visible de 140 × 100.

## Preparación

Usa un proyecto independiente con SDK 5.10.1 y compilación configurada. No necesitas otro tutorial. Sustituye src/main.cpp por el ejemplo completo; no mezcles hooks de otros ejemplos. No hacen falta dependencias adicionales en mod.json.

## Ejemplo completo

Todo el código está en un único archivo src/main.cpp.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/ui/ScrollLayer.hpp>
#include <string>

using namespace geode::prelude;

class $modify(ScrollTutorialMenu, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        auto size = CCDirector::sharedDirector()->getWinSize();
        auto list = ScrollLayer::create(CCSize{140.f, 100.f});
        list->setPosition({size.width - 150.f, size.height - 130.f});
        list->setID("tutorial-list"_spr);

        this->addChild(list, 10);

        constexpr int count = 20;
        constexpr float rowHeight = 24.f;
        constexpr float contentHeight = count * rowHeight;

        list->m_contentLayer->setContentSize({140.f, contentHeight});

        for (int i = 0; i < count; ++i) {
            auto text = std::string("Row ") + std::to_string(i + 1);
            auto label = CCLabelBMFont::create(text.c_str(), "bigFont.fnt");
            label->setScale(0.4f);
            label->setPosition({70.f, contentHeight - (i + 0.5f) * rowHeight});

            list->m_contentLayer->addChild(label);
        }

        list->scrollToTop();

        return true;
    }
};
```

## Cómo funciona

ScrollLayer se añade directamente a MenuLayer. Su tamaño 140 × 100 define el área visible; m_contentLayer mide 20 × 24 = 480 de alto. Las filas pertenecen a m_contentLayer y se desplazan con él. scrollToTop se llama al terminar. La posición de demostración se calcula desde la esquina superior derecha; adáptala a tu interfaz.

## Comprueba el resultado

Compila con geode build y abre el menú principal. La lista aparece arriba a la derecha. Comprueba Row 1 y desplázate hasta Row 20 con la rueda o arrastrando. El contenido exterior debe recortarse. Sal y vuelve para comprobar la posición inicial. Prueba gestos en el dispositivo móvil de destino.

## Solución de problemas

La altura del contenido debe superar la del área visible. Añade filas a m_contentLayer. Llama a scrollToTop después del tamaño y las filas. Si se superpone a controles, ajusta posición y tamaño; reserva espacio libre en una interfaz final.

El código se contrastó con las APIs del SDK 5.10.1, pero no se compiló ni ejecutó en el juego aquí.

[Geode SDK source](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/ScrollLayer.hpp)
