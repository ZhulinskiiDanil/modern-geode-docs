---
title: 'build/'
---

## Purpose

This directory contains generated build output. The exact file set depends on the compiler, build generator and target platform. It is not the source of your mod.

## How this file fits in

CMake stores configuration and intermediate files here. The completed .geode package is the artifact you install or release. Other targets may use directories such as build-android64.

## Example

```text [build/]
hello-geode/
├── src/
├── mod.json
├── CMakeLists.txt
└── build/
    └── yourname.hello-geode.geode
```

## Things to keep in mind

Do not fix your mod by editing generated files; the next build can overwrite them. Keep build output out of version control. Preserve your original source files, metadata and resources.

## Verify the result

After geode build succeeds, inspect the package produced by that build and install it in a compatible game. If a change is not visible, check the output location and the installed package version before rebuilding again.

[Official template](https://github.com/geode-sdk/example-mod) · [Project overview](/en/v5/structure/project)
