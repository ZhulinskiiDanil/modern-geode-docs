---
title: 'introduction'
---

## Un cargador y una caja de herramientas

Geometry Dash es el juego. El cargador de Geode se inicia con él y carga paquetes de mods compatibles. El SDK aporta las cabeceras C++ y herramientas para construirlos. Tu código se ejecuta dentro del proceso del juego: un puntero inválido puede cerrarlo.

## ¿Qué puedes crear?

Un botón útil, cambios en una layer, herramientas del editor o preferencias persistentes. Empieza con un cambio visible en el menú principal antes de modificar el juego o usar la red.

## Cómo encajan las piezas

Escribes C++ en `src`. CMake describe cómo compilarlo con el SDK. La compilación produce un paquete `.geode` con un binario para cada plataforma incluida y sus metadatos. El cargador verifica metadatos y dependencias antes de activar el mod.

## Conocimientos previos

No necesitas aprender todo C++. Empieza con funciones, clases, punteros y errores de compilación frente a errores de ejecución. Una layer se parece a una pantalla y un node a un elemento de interfaz, pero no existe el recolector de basura de JavaScript.

## Tu primer objetivo

Instala las herramientas, compila la plantilla y añade un botón que abra una alerta. Tendrás un resultado visible que comprobar.

## Comprueba lo aprendido

El SDK no sustituye a Geometry Dash. Un binario de Windows no es un binario de Android. Crear un paquete no lo publica automáticamente en el índice.

[Proyecto oficial](https://github.com/geode-sdk/geode)
