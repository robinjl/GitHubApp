import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { THEME_COLOR } from '../common/constants';
import HTMLView from 'react-native-htmlview';
import BaseItem from './BaseItem'; // 显示 HTML 标签

class TrendingItem extends BaseItem {
  render() {
    const { data } = this.props;
    const { fullName, description, meta, starCount, contributors } = data;
    if (!data) return null;
    return (
      <TouchableOpacity style={styles.container} onPress={this.onItemClick}>
        <View>
          <Text style={styles.title}>{fullName}</Text>
          {description ? (
            <HTMLView
              value={`<p>${description}</p>`}
              onLinkPress={() => {}}
              stylesheet={{
                p: styles.description,
                a: styles.description
              }}
            />
          ) : null}
          <Text style={styles.description}>{meta}</Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text>Built by: </Text>
              {contributors.map(avatar_url => {
                return avatar_url ? (
                  <Image
                    key={avatar_url}
                    source={{ uri: avatar_url }}
                    style={styles.avatar}
                  />
                ) : null;
              })}
            </View>
            <View style={styles.row}>
              <Text>Start: </Text>
              <Text>{starCount}</Text>
            </View>
            {this._renderFavoriteIcon()}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 5,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    borderRadius: 2,
    shadowColor: 'grey',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3
  },
  avatar: {
    width: 22,
    height: 22,
    marginRight: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  },
  icon: {
    color: THEME_COLOR,
    padding: 5
  }
});

export default TrendingItem;
