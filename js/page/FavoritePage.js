import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  DeviceInfo
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import actions from '../action';
import { THEME_COLOR, TAB_FLAG } from '../common/constants';
import PopularItem from '../components/PopularItem';
import NavigationBar from '../components/NavigationBar';
import NavigatorUtil from '../navigator/NavigatorUtil';
import FavoriteUtil from '../common/FavoriteUtil';
import FavoriteDAO from '../expand/dao/FavoriteDAO';
import TrendingItem from '../components/TrendingItem';

class FavoriteTab extends Component {
  constructor(props) {
    super(props);
    this.flag = props.flag;
    this.favoriteDAO = new FavoriteDAO(this.flag);
  }
  componentDidMount() {
    this.loadData(false);
  }

  _getStore = () => {
    const { favorite } = this.props;
    let store = favorite[this.flag];
    if (!store) {
      store = {
        data: [],
        loading: false
      };
    }
    return store;
  };

  loadData = () => {
    const { fetchFavorite } = this.props;
    fetchFavorite(this.flag, true);
  };

  renderItem = ({ item }) => {
    const Item = this.flag === TAB_FLAG.popular ? PopularItem : TrendingItem;
    return (
      <Item
        data={item.data}
        isFavorite={item.isFavorite}
        onSelect={callback => {
          NavigatorUtil.navigate('Detail', {
            data: item.data,
            isFavorite: item.isFavorite,
            callback,
            onFavorite: isFavorite =>
              FavoriteUtil.onFavorite(
                item.data,
                isFavorite,
                this.flag,
                this.favoriteDAO
              )
          });
        }}
        onFavorite={() =>
          FavoriteUtil.onFavorite(
            item.data,
            !item.isFavorite,
            this.flag,
            this.favoriteDAO
          )
        }
      />
    );
  };

  render() {
    const store = this._getStore();
    return (
      <View style={styles.pageContainer}>
        <FlatList
          data={store.data}
          renderItem={this.renderItem}
          keyExtractor={item =>
            this.flag === TAB_FLAG.popular
              ? item.data.id.toString()
              : item.data.fullName
          }
          refreshControl={
            <RefreshControl
              refreshing={store.loading}
              onRefresh={() => this.loadData(true)}
              colors={THEME_COLOR}
              tintColor={THEME_COLOR}
              title="Loading"
              titleColor={THEME_COLOR}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  favorite: state.favorite
});

const mapDispatchToProps = dispatch => {
  return {
    fetchFavorite: (storeName, isLoading) =>
      dispatch(actions.fetchFavorite(storeName, isLoading))
  };
};

const FavoriteTabPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteTab);

export default class FavoritePage extends Component {
  constructor(props) {
    super(props);
    this.tabs = [
      { title: '最热', flag: TAB_FLAG.popular },
      { title: '趋势', flag: TAB_FLAG.trending }
    ];
  }

  _renderTopTabs = () => {
    const tabs = {};
    this.tabs.forEach((tab, index) => {
      tabs[`tab${index}`] = {
        screen: props => <FavoriteTabPage {...props} flag={tab.flag} />,
        navigationOptions: {
          title: tab.title
        }
      };
    });
    return tabs;
  };

  render() {
    const tabs = this._renderTopTabs();
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(tabs, {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: true,
          style: styles.tabBarStyle,
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle
        }
      })
    );
    return (
      <View style={styles.container}>
        <NavigationBar title="收藏" />
        <TabNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0,
    flex: 1
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabStyle: {
    padding: 0
  },
  tabBarStyle: {
    backgroundColor: 'purple',
    height: 30 // 解决 scrollEnabled = true 导致 Android 初次渲染闪烁问题
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#fff'
  },
  labelStyle: {
    fontSize: 13,
    paddingBottom: 15
  },
  indicatorContainer: {
    alignItems: 'center',
    marginVertical: 5
  },
  indicator: {
    margin: 5,
    color: THEME_COLOR
  }
});
