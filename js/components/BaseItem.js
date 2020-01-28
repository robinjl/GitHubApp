import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { THEME_COLOR } from '../common/constants';

class BaseItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: props.isFavorite
    };
  }

  static propTypes = {
    data: PropTypes.object,
    onSelect: PropTypes.func,
    onFavorite: PropTypes.func
  };

  // 取代 componentWillReceiveProps
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const isFavorite = nextProps.isFavorite;
  //   if (isFavorite !== prevState.isFavorite) {
  //     return { isFavorite };
  //   }
  //   return null;
  // }

  _renderFavoriteIcon = () => (
    <TouchableOpacity onPress={this.onPressFavorite}>
      <Icon
        size={26}
        name={this.state.isFavorite ? 'star' : 'star-o'}
        style={styles.icon}
      />
    </TouchableOpacity>
  );

  onPressFavorite = () => {
    const isFavorite = !this.state.isFavorite;
    this.setState({ isFavorite });
    this.props.onFavorite();
  };

  onItemClick = () =>
    this.props.onSelect(() => {
      this.onPressFavorite();
    });
}

const styles = StyleSheet.create({
  icon: {
    color: THEME_COLOR,
    padding: 5
  }
});

export default BaseItem;
