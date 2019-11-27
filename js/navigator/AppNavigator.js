import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';

const InitNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomePage,
    navigationOptions: {
      header: null,
    },
  },
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: {
      header: null,
    },
  },
  Detail: DetailPage
});

export default createAppContainer(
  createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
  }),
);
