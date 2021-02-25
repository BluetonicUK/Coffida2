/* eslint-disable no-else-return */
/* eslint-disable lines-between-class-members */
/* eslint-disable consistent-return */
/* eslint-disable global-require */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
import React, {Component} from 'react';
import {ScrollView, Image, ToastAndroid, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, TextInput} from 'react-native-paper';
import styles from './stylesheet';

// FIX PATCH -> all fields need a value when patching - check null

class EditDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      surname: '',
      email: '',
    };
  }

  handleFirstName = (firstname) => {
    this.setState({firstname});
  };

  handleSurname = (surname) => {
    this.setState({surname});
  };

  handleEmail = (email) => {
    this.setState({email});
  };

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const userID = await AsyncStorage.getItem('@id');

    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userID, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          ToastAndroid.show('Invalid credentials', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Sorry there is a problem', ToastAndroid.SHORT);
        }
      })
      .then(async (responseJson) => {
        this,
          this.setState({
            firstname: responseJson.first_name,
            surname: responseJson.last_name,
            email: responseJson.email,
          });
        console.log('NAME: ' + this.state.firstname);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  submitChanges = async () => {
    const id = await AsyncStorage.getItem('@id');
    const token = await AsyncStorage.getItem('@session_token');
    const validator = require('email-validator');

    if (validator.validate(this.state.email) === false) {
      ToastAndroid.show('Enter a valid email address', ToastAndroid.LONG);
      return;
    }

    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify({
        first_name: this.state.firstname,
        last_name: this.state.surname,
        email: this.state.email,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show(
            'Successfully Changed Password',
            ToastAndroid.SHORT,
          );
          this.props.navigation.navigate('Change Password');
        } else if (response.status === 400) {
          ToastAndroid.show('Bad Request', ToastAndroid.SHORT);
        } else if (response.status === 401) {
          ToastAndroid.show(
            'Unorthorised Access to this user',
            ToastAndroid.SHORT,
          );
        } else if (response.status === 403) {
          ToastAndroid.show('Forbidden', ToastAndroid.SHORT);
        } else if (response.status === 404) {
          ToastAndroid.show('404: Page not found', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(
            'Server error, please try later',
            ToastAndroid.SHORT,
          );
        }
        // this.setState({isLoading: false})
      })
      .catch((error) => {
        throw error;
      });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.flexContainer}>
        <View style={styles.flexContainer}>
          <Image
            style={styles.logo}
            source={require('../logos/Coffida1.png')}
          />

          <TextInput
            style={styles.paperInput}
            label="Enter First Name:"
            onChangeText={this.handleFirstName}
            value={this.state.firstname}
          />

          <TextInput
            style={styles.paperInput}
            label="Enter Surname:"
            onChangeText={this.handleSurname}
            value={this.state.surname}
          />

          <TextInput
            style={styles.paperInput}
            label="Enter email:"
            onChangeText={this.handleEmail}
            value={this.state.email}
          />

          <Button
            mode="contained"
            style={styles.paperButton}
            onPress={() => this.submitChanges()}>
            Submit Changes
          </Button>
          <Text>You can change your password after submitting changes</Text>
        </View>
      </ScrollView>
    );
  }
}

export default EditDetails;
