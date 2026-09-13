---
title: 'resources/'
---

## Purpose

Store custom images, fonts and other assets here. This is a source folder; the loader uses resources extracted from the built package.

## How this file fits in

The name resources is a project convention. Placing an image in a folder alone does not guarantee it will be packaged: declare the relevant resources in mod.json using the documented schema.

## Example

```text [resources/]
hello-geode/
├── resources/
│   └── banner.png
└── mod.json
```

## Things to keep in mind

Do not assume that an existing game sprite is your own file. The first-mod tutorial uses a sprite frame already supplied by the game, while a custom asset must be packaged by your mod.

## Verify the result

Build and inspect the resulting package, then test a clean install without relying on files left by a previous build. Check spelling, case and the resource declaration when an image is missing.

[Official template](https://github.com/geode-sdk/example-mod) · [Project overview](/en/v5/structure/project)
