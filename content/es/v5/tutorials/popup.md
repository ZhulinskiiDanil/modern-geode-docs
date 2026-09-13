---
title: 'popup'
---

## Qué vas a crear

Un Popup propio de 300 × 200 con título, texto y botón de cierre integrado.

## Preparación

Usa el proyecto Primer mod con SDK 5.10.1 y compilación configurada. Buscar bottom-menu requiere su dependencia geode.node-ids. Sustituye el código didáctico; no dupliques la definición de TutorialMenu.

[First mod](/es/v5/get-started/first-mod) · [Button](/es/v5/tutorials/buttons)

## Ejemplo completo

Inserta esta clase antes de TutorialMenu en el src/main.cpp del tutorial de botones. Sustituye solo el cuerpo de onTutorial por el código de apertura.

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

## Cómo funciona

Popup::init crea la ventana. Añade contenido a m_mainLayer con coordenadas locales. La fábrica comprueba init, usa autorelease si funciona y elimina el objeto si falla. SDK 5.10.1 usa Popup sin parámetros de plantilla; los ejemplos antiguos con Popup<> y setup no coinciden con esta cabecera.

## Abrir la ventana

```cpp
void onTutorial(CCObject*) {
    if (auto popup = TutorialPopup::create()) {
        popup->show();
    }
}
```

## Comprueba el resultado

Compila y pulsa el botón. Comprueba título, texto, cierre y reapertura. Prueba Escape/Back y otro tamaño de ventana del juego.

## Solución de problemas

create no muestra la ventana: hace falta show. Los errores de Popup<> o initAnchored indican mezcla de APIs. Para situar contenido usa coordenadas de m_mainLayer. No elimines manualmente un popup con autorelease.

Las firmas se comprobaron con las fuentes del SDK 5.10.1. Estos ejemplos no se han compilado ni ejecutado en Geometry Dash en este entorno.

## Siguiente paso

[Button](/es/v5/tutorials/buttons) · [Popup](/es/v5/tutorials/popup) · [ScrollLayer](/es/v5/tutorials/scroll-layer)

[Geode example mod](https://github.com/geode-sdk/example-mod) · [Popup.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Popup.hpp) · [ScrollLayer.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/ScrollLayer.hpp)
