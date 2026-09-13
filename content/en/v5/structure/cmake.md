---
title: 'CMakeLists.txt'
---

## Purpose

This is the build recipe at the project root. CMake selects source files, creates a shared library, connects the SDK and prepares packaging.

## How this file fits in

The excerpt below explains four lines from the official template. It is not a replacement for the complete generated file: keep its minimum CMake version, C++ standard and platform configuration.

## Example

```cmake [CMakeLists.txt]
file(GLOB_RECURSE SOURCES CONFIGURE_DEPENDS src/*.cpp)
add_library(${PROJECT_NAME} SHARED ${SOURCES})
add_subdirectory($ENV{GEODE_SDK} ${CMAKE_CURRENT_BINARY_DIR}/geode)
setup_geode_mod(${PROJECT_NAME})
```

## Things to keep in mind

SOURCES contains the discovered .cpp files. PROJECT_NAME is the CMake target name. GEODE_SDK is an environment variable pointing to the SDK, not the directory containing your mod. setup_geode_mod connects Geode’s build integration.

## Verify the result

Run geode build from the project root. If CMake cannot find the SDK, check GEODE_SDK in that terminal. If compilation succeeds but linking fails, check that the installed binaries match your SDK and platform.

[Official template](https://github.com/geode-sdk/example-mod) · [Project overview](/en/v5/structure/project)
