import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { THEME_COLOR } from '../common/constants';

export default class MyPage extends Component {
  renderLeftButton = (
    <TouchableOpacity onPress={() => {}}>
      <Ionicons size={24} name="ios-arrow-back" style={styles.leftButton} />
    </TouchableOpacity>
  );
  renderRightButton = (
    <TouchableOpacity onPress={() => {}}>
      <Feather size={24} name="search" style={styles.rightButton} />
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="我的"
          statusBar={{ backgroundColor: THEME_COLOR }}
          style={{ backgroundColor: THEME_COLOR }}
          leftButton={this.renderLeftButton}
          rightButton={this.renderRightButton}
        />
        <Text>MyPage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftButton: {
    left: 20,
    color: '#fff'
  },
  rightButton: {
    right: 20,
    color: '#fff'
  }
});
