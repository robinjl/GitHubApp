import React from 'react';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigatorUtil from '../navigator/NavigatorUtil';

class TabNavigator extends React.Component {
  render() {
    // fix DynamicTabNavigator 中页面无法跳转到外层导航器页面
    NavigatorUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator />;
  }
}

export default TabNavigator;
