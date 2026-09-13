---
title: 'async'
---

## v5 only: futures replace Tasks

Geode v5 uses an asynchronous runtime based on Arc. Legacy Task examples belong to older documentation. Do not combine `EventListener<WebTask>` with v5 Future-returning APIs.

## What we will build

A request started when the main menu initializes. It prints the HTTP status. This is a networking demonstration, not code you should keep on every menu initialization in a released mod.

## Prerequisites and lifetime

You need the hooks tutorial and an understanding of fields. The TaskHolder is stored on the modified object. It cancels its task when destroyed; a temporary local holder would end too early.

## Complete example

Replace src/main.cpp in the generated project:

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
#include <Geode/utils/async.hpp>
#include <Geode/utils/web.hpp>
using namespace geode::prelude;

class $modify(NetworkMenu, MenuLayer) {
    struct Fields {
        async::TaskHolder<web::WebResponse> request;
    };
    bool init() {
        if (!MenuLayer::init()) return false;
        m_fields->request.spawn(
            web::WebRequest().get("https://example.org"),
            [](web::WebResponse response) {
                log::info("HTTP status: {}", response.code());
            }
        );
        return true;
    }
};
```

The callback receives the response by value and does not capture the menu pointer. The endpoint is a demonstration address, not a Geode service.

## Expected result

Build, install and open the menu. With a working network, the log contains an HTTP status. A response code alone is not proof that application data is valid. Handle unsuccessful responses before parsing payloads.

## Errors and cancellation

Test offline and navigate away before completion. Do not mutate destroyed UI from a callback. Do not block the game thread waiting for a result. A coroutine uses co_await to suspend; cancellation and ownership still need an explicit design.

## Next steps

Study async::TaskHolder and Arc futures upstream before adding retries, parsing or downloading images.

[Async documentation](https://docs.geode-sdk.org/tutorials/async/) · [v5 migration](https://docs.geode-sdk.org/tutorials/migrate-v5/) · [Pinned async header](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/utils/async.hpp)
