import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './stylesheet';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

class Account extends Component {
  toLogin = async () => {
    AsyncStorage.clear();
    return this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.flexContainer}>
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <Text style={styles.text}>You have succesfully logged out</Text>

        <Button mode="contained" style={styles.paperButton} onPress={() => this.toLogin()}>
          Return Home
        </Button>
      </View>
    );
  }
}

export default Account;
