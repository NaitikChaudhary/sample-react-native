# Noon - Minimal React Native App

A minimal React Native app with **New Architecture** enabled, built with TypeScript and Yarn.

## Features

- ✅ React Native 0.82.1 with New Architecture (Fabric & TurboModules)
- ✅ TypeScript
- ✅ Yarn package manager
- ✅ Minimal setup - no unnecessary dependencies

## Prerequisites

- Node.js 20.19.4 (use `nvm use 20.19.4`)
- Yarn 3.6.4
- Complete the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment)

## Getting Started

### Step 1: Start Metro

```sh
nvm use 20.19.4
yarn start
```

### Step 2: Run on Android

```sh
yarn android
```

### Step 3: Run on iOS

First, install CocoaPods dependencies:

```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

Then run:

```sh
yarn ios
```

## New Architecture

This app has the **New Architecture** enabled by default:

- **Android**: `newArchEnabled=true` in `android/gradle.properties`
- **iOS**: Automatically enabled via Podfile configuration

## Project Structure

```
Noon/
├── App.tsx              # Main app component (minimal)
├── index.js             # App entry point
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── android/             # Android native code
├── ios/                 # iOS native code
└── README.md            # This file
```

## Learn More

- [React Native New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
