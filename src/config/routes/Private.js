import { createStackNavigator } from 'react-navigation-stack'

import BottomNavigator from './BottomNavigator';


const PrivateNavigation = createStackNavigator({
  BottomNavigation : {
    screen : BottomNavigator,
    navigationOptions : {
      header : null
    }
  }
})

export default PrivateNavigation;
