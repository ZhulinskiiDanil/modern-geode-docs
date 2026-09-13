---
title: 'src/'
---

## Purpose

The C++ source of your mod lives here. Start with one file, then split features into focused files as the mod grows.

## How this file fits in

The official template discovers src/*.cpp recursively through CMake. Headers describe declarations; .cpp files contain implementations. Keep generated output outside this folder.

## Example

```text [src/]
hello-geode/
└── src/
    └── main.cpp
```

## Things to keep in mind

Open main.cpp in the navigation to see how a hook becomes part of the game. A file named main.cpp does not mean this project is an executable with a main() function.

## Verify the result

After adding a source file, run geode build from the project root. If the new code is missing from the binary, inspect the source selection in CMakeLists.txt.

[Official template](https://github.com/geode-sdk/example-mod) · [Project overview](/en/v5/structure/project)
