import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../components/Home';

const HomeStack = createStackNavigator(
  {
    Home
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
);

export default HomeStack;
