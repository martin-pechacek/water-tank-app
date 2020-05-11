import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from '../screens/HomeScreen'
import ChartScreen from '../screens/ChartScreen'

const StackNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen
    },
    ChartScreen: {
      screen: ChartScreen
    }
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none'
  }
)

export default createAppContainer(StackNavigator)
