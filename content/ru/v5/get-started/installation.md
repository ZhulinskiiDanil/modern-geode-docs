---
title: 'installation'
---

## Выберите платформу

Этот маршрут рассчитан на SDK **v5.10.1**. Начните с Windows или macOS, установленной Geometry Dash и совместимого загрузчика Geode. Для Android и iOS нужны отдельные инструменты. Сборка на компьютере не подтверждает работу на телефоне.

## Установите инструменты C++

На Windows установите Visual Studio Build Tools с компонентами **Desktop development with C++**, Windows SDK и CMake. На macOS установите Xcode и command-line tools. Также нужен Git. Сверяйте платформенные требования с [официальной инструкцией](https://docs.geode-sdk.org/getting-started/prerequisites/).

## Установите Geode CLI

В новом терминале Windows выполните:

```bash
winget install GeodeSDK.GeodeCLI
geode --version
```

Для macOS и Linux используйте инструкции и релизы [официального CLI](https://github.com/geode-sdk/cli). Linux здесь — среда кросс-компиляции, а не отдельная нативная версия игры.

## Установите SDK

```bash
geode sdk install
geode sdk install-binaries
```

Перезапустите терминал. Проверьте путь GEODE_SDK: в PowerShell — `$env:GEODE_SDK`, в POSIX shell — `echo $GEODE_SDK`. Откройте файл VERSION в SDK: для этого руководства требуется 5.10.1. Если установщик уже выбирает более новую версию, используйте документацию к ней.

## Настройте редактор

В VS Code откройте папку проекта и установите расширения C/C++, CMake Tools и Geode. В Visual Studio откройте папку с CMakeLists.txt. Выберите установленный C++ toolchain; src/main.cpp не является отдельной программой.

## Проверка и ошибки

Запустите `geode --version` в терминале сборки. Если команда не найдена, перезапустите терминал и проверьте PATH. Если CMake не находит Geode, проверьте GEODE_SDK. При отсутствии SDK-библиотек установите binaries именно для своей версии SDK.

[Источник настройки SDK](https://github.com/geode-sdk/docs/blob/main/getting-started/sdk.md)
