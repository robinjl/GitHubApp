import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './navigator/AppNavigator';
import store from './store';
import { YellowBox } from 'react-native';

class App extends React.Component {
  render() {
    // console.disableYellowBox = true;
    YellowBox.ignoreWarnings([
      'You should only render one navigator explicitly in your app, and other navigators should be rendered by including them in that navigator. Full details at:',
      'AsyncStorage'
    ]);
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
