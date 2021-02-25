/* eslint-disable react/no-unused-state */
/* eslint-disable consistent-return */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './stylesheet';

class Account extends Component {
  toLogin = async () => {
    AsyncStorage.clear();
    return this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View style={styles.flexContainer}>
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <Text style={styles.text}>You have succesfully logged out</Text>

        <Button
          mode="contained"
          style={styles.paperButton}
          onPress={() => this.toLogin()}>
          Return Home
        </Button>
      </View>
    );
  }
}

export default Account;
