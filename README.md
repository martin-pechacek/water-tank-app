# water-tank-app
# Water Tank

React Native mobile app for displaying current status of water level in tank and simple dashboard charts.

Optimized only for android.

__Other parts of solution__
* [Arduino with ultrasonic sensor](https://github.com/martin-pechacek/water-tank-arduino)
* [Java (Spring boot) backend](https://github.com/martin-pechacek/water-tank-backend)

## Screens

![Home screen](https://github.com/martin-pechacek/water-tank-app/blob/master/example/homescreen.png?raw=true)
![Dashboard](https://github.com/martin-pechacek/water-tank-app/blob/master/example/dashboard.png?raw=true)


## Installation

1. Install [node.js](https://nodejs.org/en/) and then run in project folder
```bash
npm install
```
2. Install android studio and follow this [guide](https://developer.android.com/studio/run/emulator) to setup android emulator

## Usage

__Run application locally in emulator__

Run in project folder

```bash
npm run android
```
__Install app on device (unsigned version)__

Run in project folder

```
react-native bundle --platform android --dev false --entry-file index.js
--bundle-output android/app/src/main/assets/index.android.bundle 
--assets-dest android/app/src/main/res

cd android

gradlew assembleRelease

```

## License
[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)