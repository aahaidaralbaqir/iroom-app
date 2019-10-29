import{
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import PrivateNavigation from './Private'
import PublicNavigation from './Guest'
import Loading from './Loading'
const RootNav = createSwitchNavigator({
  Loading : {
    screen : Loading
  },
  PublicNavigation: PublicNavigation,
  PrivateNavigation: PrivateNavigation
})


export default createAppContainer(RootNav);
