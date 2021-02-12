import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './stylesheet';
import AsyncStorage from '@react-native-community/async-storage';

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      firstname: '',
      surname: '',
      email: '',
      favourite_locations: [],
      reviews: [],
      liked_reviews: [],
    };
  }

  toLogout = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const url = 'http://10.0.2.2:3333/api/1.0.0/user/logout';
    console.log(token);

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      //X-auth
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate('Logout');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.flexContainer}>
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.toMyLocations()}>
          <Text style={styles.text}> My Locations </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Account;
