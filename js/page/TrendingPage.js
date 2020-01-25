import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import actions from '../action';
import {
  TRENDING_QUERY_STRING,
  TRENDING_URL,
  THEME_COLOR,
  PAGE_SIZE
} from '../common/constants';
import Toast from 'react-native-easy-toast';
import NavigationBar from '../components/NavigationBar';
import TrendingItem from '../components/TrendingItem';
import TrendingDialog from '../components/TrendingDialog';
import { TIME_SPANS } from '../common/model';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import NavigatorUtil from '../navigator/NavigatorUtil';

const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';

class TrendingTab extends Component {
  constructor(props) {
    super(props);
    this.timeSpan = props.timeSpan;
  }
  componentDidMount() {
    this.loadData(false);
    this.timeSpanChangeListener = DeviceEventEmitter.addListener(
      EVENT_TYPE_TIME_SPAN_CHANGE,
      timeSpan => {
        this.timeSpan = timeSpan;
        this.loadData(false);
      }
    );
  }

  componentWillUnmount() {
    this.timeSpanChangeListener && this.timeSpanChangeListener.remove();
  }

  _getStore = () => {
    const { trending, tabLabel } = this.props;
    let store = trending[tabLabel];
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
    const { fetchTrending, fetchMoreTrending, tabLabel } = this.props;
    const store = this._getStore();
    const { originData, pageNumber } = store;
    const url = this.generateFetchUrl(tabLabel);
    if (fetchMore) {
      fetchMoreTrending(tabLabel, pageNumber + 1, PAGE_SIZE, originData, () =>
        this.refs.toast.show('No more data')
      );
      return;
    }
    fetchTrending(tabLabel, url, PAGE_SIZE);
  };

  generateFetchUrl = key => {
    return (
      TRENDING_URL +
      (key.toUpperCase() === 'ALL' ? '' : key) +
      '?' +
      this.timeSpan
    );
  };

  renderItem = ({ item }) => (
    <TrendingItem
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
          keyExtractor={item => item.fullName}
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
  trending: state.trending
});

const mapDispatchToProps = dispatch => {
  return {
    fetchTrending: (storeName, url, pageSize) =>
      dispatch(actions.fetchTrending(storeName, url, pageSize)),
    fetchMoreTrending: (storeName, url, pageNumber, pageSize, callback) =>
      dispatch(
        actions.fetchMoreTrending(
          storeName,
          url,
          pageNumber,
          pageSize,
          callback
        )
      )
  };
};

const TrendingTabPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingTab);

export default class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.tabs = [
      'All',
      'C#',
      'Java',
      'Python',
      'React Native',
      'iOS',
      'Android'
    ];
    this.state = {
      timeSpan: TIME_SPANS[0]
    };
  }

  _renderTopTabs = () => {
    const tabs = {};
    const { searchText } = this.state.timeSpan;
    this.tabs.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => (
          <TrendingTabPage {...props} tabLabel={item} timeSpan={searchText} />
        ),
        navigationOptions: {
          title: item
        }
      };
    });
    if (!this.TabNavigator) {
      // TabNavigator 不随时间选择重新渲染
      this.TabNavigator = createAppContainer(
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
    }
    return this.TabNavigator;
  };

  renderTitleView = () => (
    <TouchableOpacity
      onPress={() => this.refs.dialog.show()}
      style={styles.titleContainer}
    >
      <>
        <Text style={styles.title}>趋势 {this.state.timeSpan.showText}</Text>
        <MaterialIcon name="arrow-drop-down" size={22} color="#fff" />
      </>
    </TouchableOpacity>
  );

  onSelectTimeSpan = timeSpan => {
    this.refs.dialog.dismiss();
    this.setState({
      timeSpan
    });
    DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, timeSpan.searchText);
  };

  render() {
    const TabNavigator = this._renderTopTabs();
    return (
      <View style={styles.container}>
        <NavigationBar titleView={this.renderTitleView()} />
        <TabNavigator />
        <TrendingDialog onSelect={this.onSelectTimeSpan} ref="dialog" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
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
    height: 30, // 解决 scrollEnabled = true 导致 Android 初次渲染闪烁问题
    lineHeight: 30
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
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    color: '#fff'
  }
});
