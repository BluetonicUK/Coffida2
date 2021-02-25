/* eslint-disable lines-between-class-members */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {Button} from 'react-native-paper';
import styles from './stylesheet';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: true,
    };
  }
  render() {
    const nav = this.props.navigation;

    return (
      <View style={styles.flexContainer}>
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <Button
          style={styles.paperButton}
          mode="contained"
          onPress={() => nav.navigate('Login')}>
          Login
        </Button>
        <Button
          style={styles.paperButton}
          mode="contained"
          onPress={() => nav.navigate('Register')}>
          Register
        </Button>
      </View>
    );
  }
}

export default Home;
