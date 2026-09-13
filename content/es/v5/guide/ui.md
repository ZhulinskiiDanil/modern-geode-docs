---
title: 'ui'
---

## Piensa en nodos

La interfaz es un árbol de escena cocos2d. Una layer contiene nodos; un menú contiene elementos interactivos. Un sprite no es un botón. El ejemplo oficial utiliza CCMenuItemSpriteExtra como contenedor clicable.

## Encuentra el padre correcto

Utiliza IDs estables y declara node-ids. La búsqueda puede devolver null. El padre importa porque posición, escala y visibilidad dependen del árbol.

## Posición sin números arbitrarios

La posición es relativa al padre. El anchor determina el punto de referencia y scale cambia el tamaño visible. Para ampliar un menú, utiliza su layout y llama a updateLayout después de cambiar los hijos.

## Practica

Completa el primer mod y cambia el texto del callback. Su src/main.cpp demuestra sprite, menu item, ID propio y actualización del layout. Un cambio pequeño es más fácil de depurar.

## Prueba la interfaz

Abre y cierra el menú, cambia el tamaño de ventana y prueba con otro mod que añada botones. Comprueba visibilidad, pulsación y ausencia de solapamientos. Prueba en un dispositivo antes de declarar soporte móvil.

## Errores frecuentes

Las posiciones fijas pueden solaparse con otros mods. Un puntero puede quedar inválido cuando el padre libera al node. Aumentar un sprite no garantiza un área táctil adecuada.

[Botones](https://docs.geode-sdk.org/tutorials/buttons/) · [Layouts](https://docs.geode-sdk.org/tutorials/layouts/)
