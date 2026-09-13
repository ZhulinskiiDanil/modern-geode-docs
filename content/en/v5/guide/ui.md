---
title: 'ui'
---

## Think in nodes

Geometry Dash's interface is a cocos2d scene graph. A layer contains nodes; a menu contains interactive items. A sprite alone is not a button. The clickable wrapper used by the official example is CCMenuItemSpriteExtra.

## Find the right parent

Use stable node IDs where available and declare the node-ids dependency. A lookup can return null. Attaching to the right parent matters because position, scale and visibility are inherited through the tree.

## Positioning without magic numbers

A node's position is relative to its parent. Its anchor determines the point aligned to that position. Scaling changes rendered size. Prefer the parent's layout when extending an existing menu, and call updateLayout after changing children.

## Put it into practice

Complete the first-mod tutorial, then change only the button's callback text. The full src/main.cpp there demonstrates a sprite, a menu item, a namespaced ID and a layout update. This keeps the first UI experiment small enough to debug.

## Test the interface

Open and close the menu, change the window size, and test alongside another mod that adds buttons. Check that the button remains visible, clickable, and does not overlap existing controls. Test on a device before claiming mobile support.

## Common mistakes

Hardcoded positions can overlap another mod's UI. Retaining a raw pointer after the parent releases a node can cause a use-after-free. Making a sprite bigger does not by itself establish sensible touch behavior.

[Official buttons tutorial](https://docs.geode-sdk.org/tutorials/buttons/) · [Layouts](https://docs.geode-sdk.org/tutorials/layouts/)
