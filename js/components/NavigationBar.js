import React, { Component } from 'react';
import { View, ViewPropTypes, StatusBar, StyleSheet, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { NAV_BAR_HEIGHT_ANDROID, NAV_BAR_HEIGHT_IOS, STATUS_BAR_HEIGHT, THEME_COLOR } from '../common/constants';

const StatusBarShape = {
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string
};

class NavigationBar extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string,
    titleView: PropTypes.element,
    titleLayoutStyle: ViewPropTypes.style,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
    leftButton: PropTypes.element,
    rightButton: PropTypes.element
  };

  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden: false
    }
  };

  renderButtonElement = element => (
    <View style={styles.buttonContainer}>{element ? element : null}</View>
  );

  render() {
    const {
      style,
      title,
      titleView,
      titleLayoutStyle,
      hide,
      statusBar,
      leftButton,
      rightButton
    } = this.props;
    const StatusBarComp = statusBar.hidden ? null : (
      <View style={styles.statusBar}>
        <StatusBar {...statusBar} />
      </View>
    );
    const TitleView = titleView ? (
      titleView
    ) : (
      <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    );

    const Content = hide ? null : (
      <View style={styles.navBar}>
        {this.renderButtonElement(leftButton)}
        <View style={[styles.navBarTitleContainer, titleLayoutStyle]}>
          {TitleView}
        </View>
        {this.renderButtonElement(rightButton)}
      </View>
    );
    return (
      <View style={[styles.container, style]}>
        {StatusBarComp}
        {Content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#567',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS :NAV_BAR_HEIGHT_ANDROID,
  },
  buttonContainer: {
    alignItems: 'center'
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
});

export default NavigationBar;
