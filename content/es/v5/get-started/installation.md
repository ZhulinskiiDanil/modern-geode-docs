---
title: 'installation'
---

## Elige tu plataforma

Esta ruta usa SDK **v5.10.1**. Empieza en Windows o macOS con Geometry Dash y un cargador Geode compatible. Android e iOS necesitan sus propias herramientas. Compilar en escritorio no demuestra compatibilidad móvil.

## Instala las herramientas C++

En Windows instala Visual Studio Build Tools con **Desktop development with C++**, Windows SDK y CMake. En macOS instala Xcode y sus herramientas de línea de comandos. También necesitas Git. Consulta los [requisitos oficiales](https://docs.geode-sdk.org/getting-started/prerequisites/) de tu plataforma.

## Instala Geode CLI

En una nueva terminal de Windows:

```bash
winget install GeodeSDK.GeodeCLI
geode --version
```

Para macOS o Linux, utiliza las instrucciones del [repositorio oficial de CLI](https://github.com/geode-sdk/cli). Linux es un entorno de compilación cruzada, no un objetivo nativo del juego.

## Instala el SDK

```bash
geode sdk install
geode sdk install-binaries
```

Reinicia la terminal. Verifica GEODE_SDK con `$env:GEODE_SDK` en PowerShell o `echo $GEODE_SDK` en una shell POSIX. Comprueba que VERSION contiene 5.10.1. Si el instalador ya utiliza otra versión, sigue la documentación correspondiente.

## Configura el editor

Abre la carpeta del proyecto en VS Code con C/C++, CMake Tools y Geode. En Visual Studio, abre la carpeta con CMakeLists.txt. Configura la toolchain instalada: src/main.cpp no es un programa independiente.

## Verifica y corrige

Ejecuta `geode --version` desde la terminal de compilación. Si no existe, reinicia la terminal y comprueba PATH. Si CMake no encuentra Geode, revisa GEODE_SDK. Si faltan bibliotecas, instala los binarios de la misma versión del SDK.

[Fuente de configuración](https://github.com/geode-sdk/docs/blob/main/getting-started/sdk.md)
