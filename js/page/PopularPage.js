import React, { Component } from 'react';
import { View, Text, StyleSheet, YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

class Page extends Component {
  render() {
    const {tabLabel} = this.props;
    return (
      <View style={styles.pageContainer}>
        <Text>{tabLabel}</Text>
      </View>
    );
  }
}

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.tabs = [
      'JavaScript',
      'React',
      'Vue',
      'Node.js',
      'React Native',
      'iOS',
      'Android',
    ];
  }

  _renderTopTabs = () => {
    const tabs = {};
    this.tabs.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <Page {...props} tabLabel={item} />,
        navigationOptions: {
          title: item,
        },
      };
    });
    return tabs;
  };

  render() {
    // console.disableYellowBox = true;
    YellowBox.ignoreWarnings([
      'You should only render one navigator explicitly in your app, and other navigators should be rendered by including them in that navigator. Full details at:',
      'AsyncStorage'
    ]);
    const tabs = this._renderTopTabs();
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(tabs, {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: true,
          scrollEnabled: true,
          style: {
            backgroundColor: 'purple',
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle,
        },
      }),
    );
    return (
      <View style={styles.container}>
        <TabNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabStyle: {
    minWidth: 50,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#fff',
  },
  labelStyle: {
    fontSize: 13,
  },
});
