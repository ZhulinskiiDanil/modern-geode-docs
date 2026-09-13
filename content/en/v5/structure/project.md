---
title: 'project'
---

## One project, several responsibilities

The source code describes behavior. Metadata tells the loader what the package is. CMake connects the compiler, SDK and packaging process. Keep these responsibilities separate.

## Explore the project

Select a file below to inspect its role and sample content. The exact generated template can change; keep the CMakeLists.txt produced by your installed CLI.

::file-tree
::

## From source to game

Your editor does not execute the mod. Follow the build pipeline below. A compiler error happens before packaging; a loader error happens after installation.

::interactive-demo
::

## Generated files and bindings

The build directory contains generated output and caches. Bindings describe game classes and platform-specific addresses. Do not edit generated bindings or build output to change your mod: those edits can disappear on the next build.

## Loading and lifetime

Geode reads mod.json, resolves dependencies and loads the platform binary. Hooks run when their target functions are called. Do not assume menu nodes exist during library loading, or promise that arbitrary mod state can be safely unloaded at runtime. Restart to test a fresh load.

## Common mistakes

Do not commit build output as source. Do not rename your mod ID casually: it identifies dependencies and persistent data. Resources must be declared in metadata when required and included in the resulting package.

[Official template](https://github.com/geode-sdk/example-mod)
