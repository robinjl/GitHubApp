export default class NavigatorUtil {
  static navigateToHome(params) {
    const {navigation} = params;
    navigation.navigate('Main');
  }

  static navigate(path, params){
    const navigation = NavigatorUtil.navigation;
    navigation.navigate(path, params);
  }

  static goBack(navigation){
    navigation.goBack();
  }
}
