import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewUtil {
  static renderLeftButton = callback => (
    <TouchableOpacity onPress={callback} style={{ padding: 12 }}>
      <Ionicons size={24} name="ios-arrow-back" color="#fff" />
    </TouchableOpacity>
  );

  static renderShareButton = callback => (
    <TouchableOpacity onPress={callback} style={{ padding: 12 }}>
      <Ionicons size={24} name="md-share" color="#fff" />
    </TouchableOpacity>
  );
}
