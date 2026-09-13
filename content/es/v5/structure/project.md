---
title: 'project'
---

## Un proyecto, varias responsabilidades

El código describe comportamiento. Los metadatos identifican el paquete. CMake conecta compilador, SDK y empaquetado. Mantén separadas estas responsabilidades.

## Explora el proyecto

Selecciona un archivo para ver su función y contenido. La plantilla puede cambiar: conserva CMakeLists.txt generado por tu CLI.

::file-tree
::

## Del código al juego

El editor no ejecuta el mod. Sigue el proceso de compilación. Un error del compilador ocurre antes del empaquetado; uno del cargador aparece tras instalar.

::interactive-demo
::

## Archivos generados y bindings

build contiene resultados y cachés. Los bindings describen clases del juego y direcciones específicas de plataforma. No edites archivos generados para cambiar tu mod: la siguiente compilación puede sustituirlos.

## Carga y duración

Geode lee mod.json, resuelve dependencias y carga el binario. Los hooks actúan cuando se invoca su función. Los nodos del menú pueden no existir durante la carga. No supongas que cualquier estado se puede descargar de forma segura en ejecución. Reinicia para probar una carga limpia.

## Errores frecuentes

No guardes build como código fuente. No cambies el ID sin evaluar dependencias y datos persistentes. Los recursos deben figurar en los metadatos cuando corresponda y en el paquete final.

[Plantilla oficial](https://github.com/geode-sdk/example-mod)
