---
title: 'async'
---

## Solo v5: futures sustituyen Tasks

Geode v5 utiliza un runtime basado en Arc. Los ejemplos legacy Task pertenecen a versiones anteriores. No mezcles `EventListener<WebTask>` con APIs de v5 que devuelven Future.

## Qué crearemos

Una petición al inicializar el menú que registra el estado HTTP. Es una demostración: no hagas peticiones cada vez que se abre el menú en un mod publicado.

## Conocimientos y duración

Necesitas hooks y fields. TaskHolder se guarda en el objeto modificado y cancela al destruirse. Una variable local temporal lo terminaría demasiado pronto.

## Ejemplo completo

Sustituye src/main.cpp:

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/utils/async.hpp>
#include <Geode/utils/web.hpp>
using namespace geode::prelude;

class $modify(NetworkMenu, MenuLayer) {
    struct Fields {
        async::TaskHolder<web::WebResponse> request;
    };
    bool init() {
        if (!MenuLayer::init()) return false;
        m_fields->request.spawn(
            web::WebRequest().get("https://example.org"),
            [](web::WebResponse response) {
                log::info("HTTP status: {}", response.code());
            }
        );
        return true;
    }
};
```

El callback recibe el resultado por valor y no captura el puntero del menú. La dirección es una demostración, no un servicio Geode.

## Resultado esperado

Compila, instala y abre el menú. Con conexión aparece el estado HTTP en el registro. El código de estado no demuestra que los datos sean válidos. Comprueba errores antes de analizar el contenido.

## Errores y cancelación

Prueba sin conexión y abandona la pantalla antes de terminar. No modifiques UI destruida desde un callback. No bloquees el hilo del juego esperando. Una coroutine se suspende con co_await, pero todavía debes diseñar propiedad y cancelación.

## Siguientes pasos

Estudia async::TaskHolder y Arc futures antes de añadir reintentos, parsing o descarga de imágenes.

[Async](https://docs.geode-sdk.org/tutorials/async/) · [Migración v5](https://docs.geode-sdk.org/tutorials/migrate-v5/) · [Cabecera v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/utils/async.hpp)
