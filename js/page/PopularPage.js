import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  DeviceInfo
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import actions from '../action';
import {
  POPULAR_QUERY_STRING,
  POPULAR_URL,
  THEME_COLOR,
  PAGE_SIZE
} from '../common/constants';
import PopularItem from '../components/PopularItem';
import Toast from 'react-native-easy-toast';
import NavigationBar from '../components/NavigationBar';
import NavigatorUtil from '../navigator/NavigatorUtil';

class PopularTab extends Component {
  componentDidMount() {
    this.loadData(false);
  }

  _getStore = () => {
    const { popular, tabLabel } = this.props;
    let store = popular[tabLabel];
    if (!store) {
      store = {
        data: [],
        originData: [],
        loading: false,
        hideLoadingMore: true,
        pageNumber: 0
      };
    }
    return store;
  };

  loadData = fetchMore => {
    const { fetchPopular, fetchMorePopular, tabLabel } = this.props;
    const store = this._getStore();
    const { originData, pageNumber } = store;
    const url = this.generateFetchUrl(tabLabel);
    if (fetchMore) {
      fetchMorePopular(tabLabel, pageNumber + 1, PAGE_SIZE, originData, () =>
        this.refs.toast.show('No more data')
      );
      return;
    }
    fetchPopular(tabLabel, url, PAGE_SIZE);
  };

  generateFetchUrl = key => POPULAR_URL + key + POPULAR_QUERY_STRING;

  renderItem = ({ item }) => (
    <PopularItem
      data={item}
      onSelect={() => {
        NavigatorUtil.navigate('Detail', { data: item });
      }}
    />
  );

  renderIndicator = () => {
    const store = this._getStore();
    return store.hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator} />
        <Text>Loading more ...</Text>
      </View>
    );
  };

  render() {
    const store = this._getStore();
    return (
      <View style={styles.pageContainer}>
        <FlatList
          data={store.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={store.loading}
              onRefresh={() => this.loadData(false)}
              colors={THEME_COLOR}
              tintColor={THEME_COLOR}
              title="Loading"
              titleColor={THEME_COLOR}
            />
          }
          ListFooterComponent={this.renderIndicator}
          onEndReached={() => {
            setTimeout(() => {
              if (this.canLoadMore) {
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true; // 解决初始化页面调用 onEndReached 方法问题
          }}
        />
        <Toast position="center" ref="toast" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  popular: state.popular
});

const mapDispatchToProps = dispatch => {
  return {
    fetchPopular: (storeName, url, pageSize) =>
      dispatch(actions.fetchPopular(storeName, url, pageSize)),
    fetchMorePopular: (storeName, url, pageNumber, pageSize, callback) =>
      dispatch(
        actions.fetchMorePopular(storeName, url, pageNumber, pageSize, callback)
      )
  };
};

const PopularTabPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopularTab);

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
      'Android'
    ];
  }

  _renderTopTabs = () => {
    const tabs = {};
    this.tabs.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={item} />,
        navigationOptions: {
          title: item
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
          scrollEnabled: true,
          style: styles.tabBarStyle,
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle
        }
      })
    );
    return (
      <View style={styles.container}>
        <NavigationBar title="最热" />
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
