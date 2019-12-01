import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';
import { connect } from 'react-redux';

const TABS = {
  Popular: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({tintColor}) => (
        <MaterialIcons name={'whatshot'} color={tintColor} size={26} />
      ),
    },
  },
  Trending: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({tintColor}) => (
        <Ionicons name={'md-trending-up'} color={tintColor} size={26} />
      ),
    },
  },
  Favorite: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({tintColor}) => (
        <MaterialIcons name={'favorite'} color={tintColor} size={26} />
      ),
    },
  },
  My: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor}) => (
        <Entypo name={'user'} color={tintColor} size={26} />
      ),
    },
  },
};

class DynamicTabNavigator extends Component {
  _tabNavigator() {
    const {Popular, Trending, Favorite, My} = TABS;
    const tabs = {Popular, Trending, Favorite, My};
    // Popular.navigationOptions.tabBarLabel = 'abc';
    // fix 重复渲染
    if(!this.tabNavigator){
      this.tabNavigator = createAppContainer(createBottomTabNavigator(tabs, {
        tabBarComponent: props => <BottomTabBar {...props} activeTintColor={this.props.theme}/>,
      }));
    }
    return this.tabNavigator;
  }

  render() {
    const TabNavigator = this._tabNavigator();
    return <TabNavigator />;
  }
}

class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.theme = {
      activeTintColor: props.activeTintColor,
      updateTime: new Date().getTime(),
    };
  }

  render() {
    const {routes, index} = this.props.navigation.state;
    if (routes[index].params) {
      const {theme} = routes[index].params;
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme;
      }
    }
    return (
      <BottomTabBar {...this.props} activeTintColor={this.theme.activeTintColor} />
    );
  }
}

const mapStateToProps = (store) => ({
  theme: store.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);
