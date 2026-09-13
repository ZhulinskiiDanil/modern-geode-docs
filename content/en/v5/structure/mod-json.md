---
title: 'mod.json'
---

## Purpose

The loader reads this file to identify your mod and check compatibility before loading its binary. Keep it at the project root beside CMakeLists.txt.

## How this file fits in

This sample declares Windows only. Add another platform only after building and testing it against the correct game version. Replace the sample ID and author with your own values.

## Example

```json [mod.json]
{
  "geode": "5.10.1",
  "gd": {
    "win": "2.2081"
  },
  "id": "yourname.hello-geode",
  "name": "Hello Geode",
  "version": "1.0.0",
  "developer": "Your name",
  "description": "A small learning mod.",
  "dependencies": {
    "geode.node-ids": ">=v1.23.3"
  }
}
```

## Things to keep in mind

geode is the SDK target, gd describes game compatibility, and version belongs to your mod. They are different versions. The node-ids dependency is needed by the menu-button tutorial.

## Verify the result

JSON does not allow comments or trailing commas. Keep the mod ID stable across updates: dependencies and saved data identify the mod by that ID. Build and inspect Geode’s load errors to verify compatibility.

[Official template](https://github.com/geode-sdk/example-mod) · [Project overview](/en/v5/structure/project)
