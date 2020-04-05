import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import App from './AppNavigator';

export default createAppContainer(
  createSwitchNavigator(
    {
      App
    },
    {
      initialRouteName: 'App'
    }
  )
)
