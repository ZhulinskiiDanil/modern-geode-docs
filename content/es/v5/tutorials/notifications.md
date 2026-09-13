---
title: 'notifications'
---

## Qué vas a crear

Una notificación de éxito que aparece al abrir el menú principal y se oculta tras dos segundos.

## Ejemplo completo

Sustituye `src/main.cpp` por este archivo. No depende de otro tutorial ni de `geode.node-ids`.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/ui/Notification.hpp>

using namespace geode::prelude;

class $modify(NotificationTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        Notification::create(
            "The mod is ready!",
            NotificationIcon::Success,
            2.f
        )->show();

        return true;
    }
};
```

## Cómo funciona

`Notification::create` recibe el texto, icono y duración. Después debes llamar a `show()`. Usa `0.f` solo si conservas el puntero para llamar más tarde a `hide()` o `cancel()`.

## Comprobación y errores

Compila con `geode build`, abre el menú principal y comprueba que el mensaje desaparece solo. Si no aparece, verifica que el mod se cargó y que se llama primero al `MenuLayer::init()` original. No crees notificaciones cada fotograma.

[Notification.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Notification.hpp)
