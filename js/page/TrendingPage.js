import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigatorUtil from '../navigator/NavigatorUtil';

export default class TrendingPage extends Component {
  navigate = () => {
    NavigatorUtil.navigate('Detail');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.navigate}>TrendingPage</Text>
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
