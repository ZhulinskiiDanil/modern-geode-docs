---
title: 'cpp-primer'
---

## Classes and inheritance

A class groups state with behavior. MenuLayer is a game class. A Geode modification adds behavior to that class through the SDK's hook machinery. Do not treat it as replacing every instance with a normal C++ subclass.

## Pointers and references

A pointer stores an address and may be null. A reference names an existing object. A node returned by a lookup may not exist. Check it before calling methods with `->`. Unlike optional chaining in JavaScript, C++ does not silently skip an invalid pointer.

## auto and const

`auto` asks the compiler to infer the type; it is not dynamic typing. `const` restricts mutation through that variable. `auto const&` can avoid copying a value when you only read it.

## Ownership and lifetime

cocos2d objects commonly use reference counting and autorelease. A parent retains children; removing a child can release it. Do not wrap an autoreleased node in std::unique_ptr or call delete on it. Smart pointers are useful only when their ownership model matches the object.

## A complete first example

Place this in src/main.cpp of a generated project:

```cpp
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>

using namespace geode::prelude;

class $modify(MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;

        log::info("The menu is ready");

        return true;
    }
};
```

The bool reports initialization success. The early return prevents our code from running after the original fails.

## Common mistakes

A lambda that captures `this` does not keep the object alive. A cast does not prove a node has the type you expect. Templates are compile-time recipes, not JavaScript generics with erased runtime checks. Understand ownership before storing a pointer for later.

## Verify

Build the project, open the main menu and inspect Geode's log for the message. Continue with the first-mod tutorial for a visible UI change.

[Geode C++ resources](https://github.com/geode-sdk/docs/tree/main/cpp)
