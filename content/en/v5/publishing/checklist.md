---
title: 'checklist'
---

## Prepare a useful release

A tutorial button is a learning exercise. Before submitting, make something useful and understandable, test it, and read the current index guidelines. Passing a local checklist does not guarantee approval.

## Metadata and packaging

Check your mod ID, name, description, developer, version, target SDK and GD versions. Declare actual dependencies and packaged resources. Provide a recognizable icon, about.md, changelog.md, and source/support links. Only claim platforms you built and tested.

## Test the release

Build with the generated project's release configuration. Verify the installed package, not just the source tree: assets and metadata can be wrong even when compilation succeeds. Test a fresh game profile and interaction with similar mods.

## Submission

Publish the .geode package as a versioned release. Sign in to Geode Mods and submit its direct download link from your user page. The official publishing guide also describes the CLI flow. Reviewers need access to source code; follow the dedicated procedure for closed-source work.

## Common rejection reasons

Misleading metadata, preventable crashes, incompatibility, unsafe behavior, and a mod that does nothing meaningful can prevent acceptance. Understand all submitted code and the effect it has on users. Consult the current rules rather than treating this summary as exhaustive.

## Updates and rollback

Increase the version and upload a new release. Never replace an existing package: its checksum must remain stable. If an update is broken, retain its history and distribute a corrected version with a higher version number. Follow index maintainer guidance for delisting; do not silently overwrite old files.

[Official publishing workflow](https://docs.geode-sdk.org/mods/publishing/) · [Current index guidelines](https://github.com/geode-sdk/docs/blob/main/mods/guidelines.md)
