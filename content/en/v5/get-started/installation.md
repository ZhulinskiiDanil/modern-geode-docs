---
title: 'installation'
---

## Choose your target

This path targets SDK **v5.10.1**. Start on Windows or macOS with a working Geometry Dash installation and a compatible Geode loader. Android and iOS need their own toolchains; compiling on a desktop does not prove a mobile build works.

## Install the C++ tools

On Windows, install Visual Studio Build Tools with **Desktop development with C++**, the Windows SDK, and CMake tools. On macOS, install Xcode and its command-line tools. Install Git. Use the [official prerequisites](https://docs.geode-sdk.org/getting-started/prerequisites/) for platform-specific requirements.

## Install Geode CLI

On Windows, open a new terminal and run:

```bash
winget install GeodeSDK.GeodeCLI
geode --version
```

For macOS or Linux, use the release and installation instructions in the [official CLI repository](https://github.com/geode-sdk/cli). Linux is a cross-compilation host, not a claim of a native Linux game binary.

## Install the SDK

```bash
geode sdk install
geode sdk install-binaries
```

Restart your terminal. Check that `GEODE_SDK` points to the SDK directory. In PowerShell use `$env:GEODE_SDK`; in a POSIX shell use `echo $GEODE_SDK`. Read the SDK's VERSION file and confirm 5.10.1 before following this snapshot. If the latest installer has moved on, follow the matching version documentation instead.

## Editor setup

Open the project folder in VS Code with C/C++, CMake Tools, and the Geode extension. In Visual Studio, open the folder containing CMakeLists.txt. Configure using your installed C++ toolchain rather than treating src/main.cpp as a standalone program.

## Verify and recover

Run `geode --version` in the same terminal you will build from. If it is not found, restart the terminal and check PATH. If CMake cannot locate Geode, verify GEODE_SDK in that terminal. If link errors mention absent SDK libraries, install binaries matching the SDK version.

[SDK setup source](https://github.com/geode-sdk/docs/blob/main/getting-started/sdk.md)
