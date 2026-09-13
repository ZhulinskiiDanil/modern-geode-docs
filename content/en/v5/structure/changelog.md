---
title: 'changelog.md'
---

## Purpose

Keep release notes in this optional root-level Markdown file. It helps players understand what changed before updating.

## How this file fits in

Describe the user-visible behavior first. Mention compatibility changes, bug fixes and any action players need to take. Put the newest release first and keep its version aligned with mod.json.

## Example

```markdown [changelog.md]
# Changelog

## v1.0.1

- Fix the menu button layout.

## v1.0.0

- Add the menu button.
```

## Things to keep in mind

Changing this file does not change the package version. Increment version in mod.json and publish a new package for each release; do not replace an existing release artifact.

## Verify the result

Inspect the packaged changelog in Geode. Verify that its version matches the release and that links work. Keep support instructions separate when they do not describe a change.

[Official template](https://github.com/geode-sdk/example-mod) · [Project overview](/en/v5/structure/project)
