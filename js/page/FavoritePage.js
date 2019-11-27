import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default class FavoritePage extends Component {
  handleChange = () => {
    const {navigation} = this.props;
    navigation.setParams({
      theme: {
        activeTintColor: getRandomColor(),
        updateTime: new Date().getTime(),
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>FavoritePage</Text>
        <Button onPress={this.handleChange} title={'change theme'} />
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
