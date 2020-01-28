import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { THEME_COLOR } from '../common/constants';
import actions from '../action';
import { connect } from 'react-redux';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class MyPage extends Component {
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

  onChangeTheme = () => {
    const color = getRandomColor();
    this.props.changeTheme(color);
  };

  onInitTheme = () => this.props.initTheme();

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
        <Button onPress={this.onChangeTheme} title={'change theme'} />
        <Button onPress={this.onInitTheme} title={'initialize theme'} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeTheme: theme => dispatch(actions.changeTheme(theme)),
  initTheme: ()=> dispatch(actions.intiTheme()),
});

export default connect(null, mapDispatchToProps)(MyPage);

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

