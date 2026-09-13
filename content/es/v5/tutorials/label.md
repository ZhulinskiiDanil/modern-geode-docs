---
title: 'label'
---

## Qué vas a crear

Un `geode::Label` compatible con Unicode, con ancho máximo, etiquetas de color y posición en el menú principal. Es el reemplazo moderno de `CCLabelBMFont` en Geode 5.9+.

## Ejemplo completo

Sustituye `src/main.cpp` por este ejemplo independiente. No necesita otro tutorial.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/ui/Label.hpp>
using namespace geode::prelude;

class $modify(LabelTutorial, MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        auto size = CCDirector::sharedDirector()->getWinSize();
        auto label = geode::Label::createRich(
            "<cg>Geode</c> labels support Unicode: Привет!",
            "bigFont.fnt"
        );
        if (!label) return false;

        label->setAlignment(geode::Label::Alignment::Center);
        label->setMaxWidth(220.f);
        label->setPosition(size / 2.f);
        label->setID("tutorial-label"_spr);
        this->addChild(label, 10);
        return true;
    }
};
```

## Cómo funciona

`Label::createRich` recibe el texto y un archivo `.fnt`. `<cg>...</c>` aplica color; para texto normal puedes usar `Label::create`. `setMaxWidth` activa los saltos de línea y `setAlignment` alinea esas líneas. Usa `setText` para actualizar texto normal y `setRichText` cuando cambien las etiquetas.

## Etiquetas compatibles

El texto enriquecido usa una etiqueta de color de apertura y la etiqueta de cierre común `</c>`. `geode::Label` admite estos colores predefinidos:

| Etiqueta | Color           | Ejemplo               |
| -------- | --------------- | --------------------- |
| `<ca>`   | violeta         | `<ca>acento</c>`      |
| `<cb>`   | azul            | `<cb>información</c>` |
| `<cc>`   | amarillo pálido | `<cc>pista</c>`       |
| `<cd>`   | rosa            | `<cd>suave</c>`       |
| `<cf>`   | aqua            | `<cf>frío</c>`        |
| `<cg>`   | verde           | `<cg>correcto</c>`    |
| `<cj>`   | cian            | `<cj>enlace</c>`      |
| `<cl>`   | azul claro      | `<cl>nota</c>`        |
| `<co>`   | naranja         | `<co>aviso</c>`       |
| `<cp>`   | magenta         | `<cp>especial</c>`    |
| `<cr>`   | rojo            | `<cr>error</c>`       |
| `<cs>`   | dorado          | `<cs>premium</c>`     |
| `<cy>`   | amarillo        | `<cy>resaltado</c>`   |

Para un color exacto, usa la forma hexadecimal `<c-rrggbb>texto</c>`, por ejemplo `<c-ff66aa>rosa personalizado</c>`. Las etiquetas se pueden anidar; ciérralas en orden inverso. Las etiquetas desconocidas se muestran como texto normal, así que revisa la escritura si el color no aparece.

## Comprobación y errores

Compila con `geode build` y abre el menú principal. El mensaje debe quedar centrado, ajustarse a 220 unidades y mostrar el saludo cirílico. Si faltan glifos, registra una fuente alternativa con `registerFont`. Después de cambiar texto con etiquetas, vuelve a establecer el rich text.

[Label.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Label.hpp) · [Changelog de Geode: Label añadido en v5.9](https://github.com/geode-sdk/geode/blob/main/CHANGELOG.md)
