---
title: 'scroll-layer'
---

## Qué vas a crear

Un ScrollLayer con veinte filas dentro de un Popup y un área visible de 260 × 150.

## Preparación

Usa el proyecto Primer mod con SDK 5.10.1 y compilación configurada. Buscar bottom-menu requiere su dependencia geode.node-ids. Sustituye el código didáctico; no dupliques la definición de TutorialMenu.

[First mod](/es/v5/get-started/first-mod) · [Button](/es/v5/tutorials/buttons)

## Ejemplo completo

Coloca ListPopup antes de TutorialMenu en src/main.cpp del tutorial de botones. Cambia el cuerpo de onTutorial por el código de apertura.

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

## Cómo funciona

ScrollLayer define el área visible y m_contentLayer contiene los nodos desplazables. El contenido mide 20 × 28 = 560, más que el área visible. Las filas van de arriba abajo; scrollToTop se llama después de ajustar el tamaño. Las filas son etiquetas, no botones.

## Abrir la ventana

```cpp
void onTutorial(CCObject*) {
    if (auto popup = ListPopup::create()) {
        popup->show();
    }
}
```

## Comprueba el resultado

Abre la ventana: Row 1 debe estar arriba. Desplázate con la rueda o arrastrando hasta Row 20. El contenido exterior debe quedar recortado. Cierra y vuelve a abrir para comprobar la posición inicial. Prueba los gestos en cada plataforma móvil de destino.

## Solución de problemas

Si no se desplaza, aumenta la altura de m_contentLayer por encima del área visible. Añade las filas a m_contentLayer, no a m_mainLayer. Llama scrollToTop después de configurar tamaño y nodos. Las filas interactivas necesitan CCMenu y pruebas para distinguir pulsación y arrastre.

Las firmas se comprobaron con las fuentes del SDK 5.10.1. Estos ejemplos no se han compilado ni ejecutado en Geometry Dash en este entorno.

## Siguiente paso

[Button](/es/v5/tutorials/buttons) · [Popup](/es/v5/tutorials/popup) · [ScrollLayer](/es/v5/tutorials/scroll-layer)

[Geode example mod](https://github.com/geode-sdk/example-mod) · [Popup.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Popup.hpp) · [ScrollLayer.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/ScrollLayer.hpp)
