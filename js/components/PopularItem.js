import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { THEME_COLOR } from '../common/constants';

class PopularItem extends Component {
  render() {
    const { data } = this.props;
    const { owner, full_name, description, stargazers_count } = data;
    if (!data || !owner) return null;
    const { avatar_url } = owner;
    const FavoriteButton = (
      <TouchableOpacity onPress={() => {}}>
        <Icon size={26} name="star-o" style={styles.icon} />
      </TouchableOpacity>
    );
    return (
      <TouchableOpacity style={styles.container} onPress={() => {}}>
        <View>
          <Text style={styles.title}>{full_name}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text>Author: </Text>
              {avatar_url ? (
                <Image source={{ uri: avatar_url }} style={styles.avatar} />
              ) : null}
            </View>
            <View style={styles.row}>
              <Text>Start: </Text>
              <Text>{stargazers_count}</Text>
            </View>
            {FavoriteButton}
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
    height: 22
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

export default PopularItem;
