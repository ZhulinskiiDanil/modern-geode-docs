---
title: 'first-mod'
---

## Qué vamos a crear

Un botón nuevo en el menú principal de Geometry Dash. Al pulsarlo aparece **You built your first mod.** Es un mod educativo, no un producto listo para el índice. Objetivo: Geode v5.10.1 y Geometry Dash 2.2081, como la plantilla consultada.

## Antes de empezar

Completa la configuración del entorno. Necesitas cargador, SDK, CLI y compilador C++. Conserva la dependencia `geode.node-ids` con versión `>=v1.23.3` en mod.json: proporciona el ID `bottom-menu`.

## Cómo funciona

Geode conecta nuestro código a `MenuLayer::init`. Primero llamamos al original para crear la interfaz. Después encontramos el menú inferior, añadimos un botón y actualizamos el layout. El nombre `HelloMenu` permite referenciar el callback.

## 1. Crea el proyecto

Desde la carpeta que contendrá tu proyecto:

```bash
geode new
```

Introduce tu ID (por ejemplo `yourname.hello-geode`), nombre y autor. Abre la carpeta generada. Conserva su CMakeLists.txt: ya conecta el SDK y los pasos de empaquetado.

## 2. Añade el código completo

Sustituye el contenido de `src/main.cpp`:

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>

using namespace geode::prelude;

class $modify(HelloMenu, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        auto menu = this->getChildByID("bottom-menu");
        if (!menu) return true;

        auto button = CCMenuItemSpriteExtra::create(
            CCSprite::createWithSpriteFrameName("GJ_likeBtn_001.png"),
            this,
            menu_selector(HelloMenu::onHello)
        );
        button->setID("hello-button"_spr);
        menu->addChild(button);
        menu->updateLayout();
        return true;
    }

    void onHello(CCObject*) {
        FLAlertLayer::create(
            "Hello, Geode!", "You built your first mod.", "OK"
        )->show();
    }
};
```

La comprobación de null evita fallos si no existe el menú. `_spr` antepone el ID del mod al ID del botón. `updateLayout()` lo coloca junto a los botones existentes sin coordenadas fijas. El callback recibe `CCObject*`, la firma que requiere el menú.

## 3. Compila e instala

Desde la carpeta con mod.json:

```bash
geode build
```

Si configuraste un perfil de juego en CLI, la compilación puede instalar el paquete automáticamente. Si no, busca el archivo `.geode` en build e instálalo desde Geode. Verifica SDK y GD en mod.json; no declares plataformas que no has probado.

## Resultado esperado

Reinicia Geometry Dash. Aparece un botón de pulgar arriba en la fila inferior. Púlsalo para abrir el diálogo y pulsa OK para cerrarlo. Vuelve al menú y verifica que hay un botón añadido por instancia.

## Errores frecuentes

- Falta la cabecera de MenuLayer: incluye el modify header.
- Firma incorrecta: utiliza `bool init()`, no void.
- No aparece: verifica que el mod y node-ids estén activados.
- No se carga: lee el error de Geode y comprueba versiones y plataforma.
- Falta el init original: la interfaz puede estar incompleta.

## Qué aprender después

Explora el árbol del proyecto, los hooks y los layouts. Cambia el texto de la alerta y recompila para verificar el ciclo completo.

[Ejemplo oficial consultado](https://github.com/geode-sdk/example-mod/blob/main/src/main.cpp) · [Instrucciones de compilación](https://github.com/geode-sdk/docs/blob/main/getting-started/create-mod.md)
