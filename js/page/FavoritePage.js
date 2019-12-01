import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class FavoritePage extends Component {
  // handleChange = () => {
  //   const {navigation} = this.props;
  //   navigation.setParams({
  //     theme: {
  //       activeTintColor: getRandomColor(),
  //       updateTime: new Date().getTime(),
  //     },
  //   });
  // };

  onChangeTheme = () => {
    const color = getRandomColor();
    this.props.changeTheme(color);
  };

  onInitTheme = () => this.props.initTheme();

  render() {
    return (
      <View style={styles.container}>
        <Text>FavoritePage</Text>
        <Button onPress={this.onChangeTheme} title={'change theme'} />
        <Button onPress={this.onInitTheme} title={'initialize theme'} />
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

const mapDispatchToProps = dispatch => ({
  changeTheme: theme => dispatch(actions.changeTheme(theme)),
  initTheme: ()=> dispatch(actions.intiTheme()),
});

export default connect(null, mapDispatchToProps)(FavoritePage);
