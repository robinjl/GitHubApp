import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigatorUtil from '../navigator/NavigatorUtil';

export default class WelcomePage extends Component {
  componentDidMount() {
    this.timer = setTimeout(
      () => NavigatorUtil.navigateToHome(this.props),
      100,
    );
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>WelcomePage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
