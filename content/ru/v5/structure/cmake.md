---
title: 'CMakeLists.txt'
---

## Назначение

Это рецепт сборки в корне проекта. CMake выбирает исходники, создаёт shared library, подключает SDK и подготавливает упаковку.

## Место в проекте

Ниже разобраны четыре строки официального шаблона. Фрагмент не заменяет полный файл: сохраните требования к CMake, стандарт C++ и настройки платформ из сгенерированного проекта.

## Пример

```cmake [CMakeLists.txt]
file(GLOB_RECURSE SOURCES CONFIGURE_DEPENDS src/*.cpp)
add_library(${PROJECT_NAME} SHARED ${SOURCES})
add_subdirectory($ENV{GEODE_SDK} ${CMAKE_CURRENT_BINARY_DIR}/geode)
setup_geode_mod(${PROJECT_NAME})
```

## На что обратить внимание

SOURCES содержит найденные .cpp. PROJECT_NAME — имя цели CMake. GEODE_SDK — переменная окружения с путём к SDK, а не к вашему моду. setup_geode_mod подключает сборочную интеграцию Geode.

## Проверка результата

Запустите geode build в корне проекта. Если SDK не найден, проверьте GEODE_SDK в этом терминале. При ошибках линковки сверьте установленные binaries с версией SDK и платформой.

[Официальный шаблон](https://github.com/geode-sdk/example-mod) · [Обзор проекта](/ru/v5/structure/project)
