import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  DeviceInfo
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TIME_SPANS } from '../common/model';

class TrendingDialog extends Component {
  state = {
    visible: false
  };

  show = () => this.setState({ visible: true });

  dismiss = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    const { onSelect } = this.props;
    return (
      <Modal transparent visible={visible}>
        <TouchableOpacity style={styles.container} onPress={this.dismiss}>
          <>
            <MaterialIcon name="arrow-drop-up" size={36} style={styles.arrow} />
            <View style={styles.content}>
              {TIME_SPANS.map(({ showText, searchText }, index, arr) => (
                <View
                  key={index}
                  style={index !== arr.length - 1 && styles.bottomLine}
                >
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => onSelect({ showText, searchText })}
                  >
                    <Text style={styles.text}>{showText}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center'
  },
  arrow: {
    marginTop: DeviceInfo.isIPhoneX_deprecated ? 70 : 40,
    marginBottom: -15,
    padding: 0,
    color: '#fff'
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 5
  },
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  bottomLine: {
    borderBottomWidth: 0.3,
    borderBottomColor: 'darkgrey'
  },
  text: {
    fontSize: 18,
    color: '#000'
  }
});

export default TrendingDialog;
