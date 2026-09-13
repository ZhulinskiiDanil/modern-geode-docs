---
title: 'data'
---

## ¿Ajustes o valores guardados?

Los settings son configuración del usuario declarada en mod.json. Los saved values son estado gestionado por el código, por ejemplo si se mostró un tutorial. No obligues al usuario a editar JSON para una preferencia normal.

## Ejemplo completo de persistencia

Necesitas un proyecto, hooks de MenuLayer y bool. Sustituye src/main.cpp, compila e instala:

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
using namespace geode::prelude;

class $modify(MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        auto mod = Mod::get();
        bool wasSeen = mod->getSavedValue<bool>("menu-seen", false);
        log::info("Menu was seen before: {}", wasSeen);
        mod->setSavedValue<bool>("menu-seen", true);
        return true;
    }
};
```

La primera lectura utiliza false. Después guardamos true. Registramos el valor anterior para observar el cambio.

## Verificación

En datos nuevos aparece false. Cierra el juego normalmente y vuelve a abrirlo: debe aparecer true. Geode persiste durante su ciclo de guardado; un cierre inesperado no garantiza escritura en disco.

## Metadatos y settings

mod.json declara identidad, compatibilidad, dependencias, recursos y ajustes. Lee un ajuste con el tipo declarado. Un saved boolean y un setting boolean con la misma clave son conceptos separados.

## Datos complejos y errores

Versiona el esquema de JSON complejo. Valida campos y datos ausentes al actualizar. Cambiar el ID puede separar el mod de datos anteriores. No supongas que un valor corrupto o de otro tipo se puede leer.

## Siguiente paso

Añade una preferencia útil al botón. Consulta el esquema oficial antes de introducir un tipo nuevo de setting.

[Mod.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/loader/Mod.hpp#L267) · [Referencia mod.json](https://docs.geode-sdk.org/mods/configuring/)
