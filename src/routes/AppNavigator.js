import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../components/Home';

const HomeStack = createStackNavigator(
  {
    HomeScreen
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
);

export default HomeStack;
