# Technical source record

Reviewed on 2026-09-13. Original instructional prose; independent information architecture and visual design.

| Source                                                                               | What it verifies                                                    |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| https://api.github.com/repos/geode-sdk/geode/releases/latest                         | Stable release v5.10.1, released 2026-08-29                         |
| https://github.com/geode-sdk/geode/releases/tag/v5.10.1                              | Release summary: custom settings fix and arc 1.5.9                  |
| https://github.com/geode-sdk/geode/tree/v5.10.1                                      | SDK version boundary                                                |
| https://github.com/geode-sdk/docs                                                    | Official hand-written documentation source                          |
| https://github.com/geode-sdk/docs/blob/main/getting-started/geode-cli.md             | CLI installation and version check                                  |
| https://github.com/geode-sdk/docs/blob/main/getting-started/sdk.md                   | SDK installation, binaries and GEODE_SDK                            |
| https://github.com/geode-sdk/docs/blob/main/getting-started/create-mod.md            | geode new, geode build, generated package and installation          |
| https://github.com/geode-sdk/example-mod/blob/main/src/main.cpp                      | MenuLayer, CCMenuItemSpriteExtra, node IDs, layout and FLAlertLayer |
| https://github.com/geode-sdk/example-mod/blob/main/mod.json                          | GD 2.2081, metadata and node-ids dependency >=v1.23.3               |
| https://github.com/geode-sdk/docs/blob/main/mods/configuring.md                      | mod.json semantics                                                  |
| https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/loader/Mod.hpp  | Exact curated API signatures and saved-value behavior               |
| https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/utils/async.hpp | TaskHolder and v5 async ownership                                   |
| https://docs.geode-sdk.org/tutorials/migrate-v5/                                     | Task replacement, futures and Popup changes                         |
| https://docs.geode-sdk.org/mods/publishing/                                          | Submission and immutable release workflow                           |
| https://github.com/geode-sdk/docs/blob/main/mods/guidelines.md                       | Current review and compatibility requirements                       |

The official homepage and some documentation URLs denied direct automated fetching. Their official GitHub sources were used instead. Main-branch docs and example-mod can evolve; recheck them whenever upgrading the pinned snapshot. No Geode CLI command, API or version support claim is invented to fill a navigation category.
