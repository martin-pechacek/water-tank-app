import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Routes from './routes';

export default function App() {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return <Routes />
}
