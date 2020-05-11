/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './navigation'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
      <AppNavigator/>
  );
};

export default App;
