import { createStackNavigator } from 'react-navigation-stack';


import Login from '../../screens/Login';

const PublicNavigation = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});


export default PublicNavigation;
