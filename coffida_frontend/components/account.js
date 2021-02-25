/* eslint-disable consistent-return */
/* eslint-disable global-require */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-paper';
import styles from './stylesheet';

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@id');
    const url = 'http://10.0.2.2:3333/api/1.0.0/user/' + id;
    try {
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((responseJson) => {
          this.setState({
            firstname: responseJson.first_name,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  toEdit() {
    return this.props.navigation.navigate('EditDetails');
  }

  toLogout = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const url = 'http://10.0.2.2:3333/api/1.0.0/user/logout';

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
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

  time = () => {
    const hours = new Date().getHours();
    if (hours >= 12 && hours < 17) {
      return 'afternoon, ';
    }
    if (hours >= 17) {
      return 'evening, ';
    }
    return 'morning, ';
  };

  toMyLocations() {
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.navigation.navigate('MyLocations');
  }

  render() {
    return (
      <View style={styles.flexContainer}>
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <Text style={styles.text}>
          {' '}
          Good {this.time() + this.state.firstname + '!\n'}
        </Text>

        <Button
          mode="contained"
          style={styles.paperButton}
          onPress={() => this.toEdit()}>
          Edit Details
        </Button>
        <Button
          mode="contained"
          style={styles.buttonRed}
          onPress={() => this.toLogout()}>
          Logout
        </Button>
      </View>
    );
  }
}

export default Account;
