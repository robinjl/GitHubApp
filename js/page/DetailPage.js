import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import NavigationBar from '../components/NavigationBar';
import { GITHUB_URL, THEME_COLOR } from '../common/constants';
import ViewUtil from '../common/ViewUtil';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigatorUtil from '../navigator/NavigatorUtil';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    const { data, isFavorite } = this.props.navigation.state.params;
    this.state = {
      title: data.full_name || data.fullName,
      uri: data.html_url || GITHUB_URL + data.fullName,
      canGoBack: false, // WebView 返回上一页标识
      isFavorite
    };
  }

  goBack = () => {
    if (this.state.canGoBack) {
      this.webview.goBack(); // WebView history
      return;
    }
    NavigatorUtil.goBack(this.props.navigation);
  };

  onNavigationStateChange = navState => {
    this.setState({
      canGoBack: navState.canGoBack,
      uri: navState.url
    });
  };

  onFavorite = () => {
    this.setState(prevState=>{
      const {onFavorite, callback} =  this.props.navigation.state.params;
      const isFavorite = !prevState.isFavorite;
      onFavorite(isFavorite);
      callback();
      return{
        isFavorite
      }
    });
  };

  renderRightButton = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={this.onFavorite}>
        <FontAwesome
          size={24}
          name={this.state.isFavorite ? 'star' : 'star-o'}
          color="#fff"
        />
      </TouchableOpacity>
      {ViewUtil.renderShareButton()}
    </View>
  );

  render() {
    const { title, uri } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={title}
          titleLayoutStyle={title.length > 20 && { marginRight: 30 }}
          leftButton={ViewUtil.renderLeftButton(this.goBack)}
          rightButton={this.renderRightButton()}
          style={{ backgroundColor: THEME_COLOR }}
        />
        <WebView
          ref={webview => (this.webview = webview)}
          startInLoadingState
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
          source={{ uri }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
