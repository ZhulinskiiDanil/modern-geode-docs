---
title: 'introduction'
---

## A loader and a toolbox

Geometry Dash is the game. Geode's loader starts alongside it and loads compatible mod packages. The SDK is the set of C++ headers and tools you use to build those packages. Your mod is native code running inside the game process, so a bad pointer can crash the entire game.

## What can you build?

Add a useful menu button, change a layer, organize editor tools, or remember a player's preferences. Begin with a visible change to the main menu before attempting gameplay or networking.

## How the pieces connect

You edit C++ in `src`. CMake describes how to compile it against the SDK. The build produces a `.geode` package containing a platform binary and metadata. The loader checks metadata and dependencies before the mod participates in the game.

## What you should know

You do not need to know the whole C++ language. Start with functions, classes, pointers, and the difference between a build error and a runtime error. A web developer can think of a layer as a screen and a node as a UI element, but node ownership is not managed by a JavaScript garbage collector.

## Your first milestone

Install the toolchain, build the template, then add a menu button that opens an alert. You will understand where code lives and have a visible result to test.

## Check your understanding

The SDK does not replace Geometry Dash. A Windows binary is not an Android binary. Distributing a package does not automatically publish it in the Geode index.

[Official project overview](https://github.com/geode-sdk/geode)
