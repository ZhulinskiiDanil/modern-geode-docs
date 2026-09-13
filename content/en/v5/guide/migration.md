---
title: 'migration'
---

## A separate compatibility boundary

v4 is archived in this guide. The v5 pages target 5.10.1. Switching documentation versions is not equivalent to changing the SDK installed on your machine.

## Upgrade in a branch

Keep a working release and its source. Create a migration branch, install the intended SDK and matching binaries, then update metadata and rebuild. Read compiler errors before changing behavior.

## Async is different

Legacy geode::Task was replaced by an Arc-based system in v5. Future-returning operations can be awaited or spawned. TaskHolder owns an operation and cancels on destruction. Port lifetime management, not only names.

## UI changes

Popup construction patterns also changed. Compare your popup base class and initialization code against the official guide. Avoid copying a v4 popup implementation into v5 unchanged.

## Verification checklist

Test fresh installs, existing saved data, menu re-entry, cancellation, and coexistence with related mods. Build each supported platform separately. Publish a new immutable release; keep previous artifacts available.

## Continue in v5

Use the version selector to move to v5 while keeping this article and language. Search results from the archive remain separate.

[Authoritative v4 → v5 migration guide](https://docs.geode-sdk.org/tutorials/migrate-v5/)
