/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */

import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {Button} from 'react-native-paper';
import styles from './stylesheet';

class ReviewsHome extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.flexContainer}>
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <Button
          mode="contained"
          style={styles.paperButton}
          onPress={() => this.props.navigation.navigate('Favourites')}>
          My Favourites
        </Button>
        <Button
          mode="contained"
          style={styles.paperButton}
          onPress={() => this.props.navigation.navigate('My Reviews')}>
          My Reviews
        </Button>
        <Button
          mode="contained"
          style={styles.paperButton}
          onPress={() => this.props.navigation.navigate('My Liked Reviews')}>
          My Liked Reviews
        </Button>
      </View>
    );
  }
}

export default ReviewsHome;
