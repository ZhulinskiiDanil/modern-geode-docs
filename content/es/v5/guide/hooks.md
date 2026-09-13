---
title: 'hooks'
---

## Qué cambia un hook

Un hook intercepta una llamada. No es un bucle y solo se ejecuta cada frame si la función original lo hace. MenuLayer::init permite actuar después de construir el menú.

## Un mod mínimo completo

Necesitas un proyecto generado y la toolchain. Sustituye src/main.cpp:

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
using namespace geode::prelude;

class $modify(MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        log::info("The menu is ready");
        return true;
    }
};
```

## Orden de ejecución

1. La cabecera modify aporta el mecanismo de modificación.
2. La firma coincide con el original.
3. MenuLayer::init recorre la cadena de hooks y crea la interfaz.
4. Si tiene éxito, escribimos el mensaje.
5. true informa de que el menú está listo.

## Verifica el resultado

Ejecuta `geode build`, instala el paquete, reinicia y abre el menú principal. Busca “The menu is ready” en el registro. Otra instancia puede producir otro mensaje.

## Compatibilidad y errores

Normalmente debes llamar al original. Otros mods pueden interceptar la misma función. No cambies prioridades al azar. Los datos añadidos al objeto modificado usan el mecanismo fields de Geode; añadir miembros normales no lo sustituye.

## Siguiente paso

Añade un botón con el tutorial completo. Estudia manual hooks y prioridades cuando entiendas este ejemplo.

[Guía oficial de hooks](https://docs.geode-sdk.org/tutorials/modify/)
