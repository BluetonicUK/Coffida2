import React, {Component} from 'react';
import {
  ScrollView,
  Image,
  ToastAndroid,
  View,
} from 'react-native';
import styles from './stylesheet';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, TextInput } from 'react-native-paper';

// FIX PATCH -> all fields need a value when patching - check null

class EditDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      surname: '',
      email: '',
      password: '',
      passwordView: false, 
    };
  }

  //methods here etc - need to get json data etc

  handleFirstName = (firstname) => {
    this.setState({firstname: firstname});
  };

  handleSurname = (surname) => {
    this.setState({surname: surname});
  };

  handleEmail = (email) => {
    this.setState({email: email});
  };



  componentDidMount(){
    this.getUserDetails();
  }

  getUserDetails = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const userID = await AsyncStorage.getItem('@id');

      return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userID, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token},
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
        .then( async (responseJson) => {
          this,this.setState({
            firstname: responseJson.first_name,
            surname: responseJson.last_name,
            email: responseJson.email,
          })
          console.log("NAME: " + this.state.firstname)
        })
        .catch((error) => {
          console.error(error);
        });
    }
  

  //works but need to do checking logic - check with Ash abotu back end as each field needs an entry.
  submitChanges = async () => {
    const id = await AsyncStorage.getItem('@id');
    const token = await AsyncStorage.getItem('@session_token');
    console.log(id);
    console.log(token);

    // var validator = require('email-validator');
    // console.log(this.state.email)

    // if(validator.validate(this.state.loginEmail) === false){
    //     ToastAndroid.show("Enter a valid email address", ToastAndroid.LONG)
    //     return
    // }
    // else if(this.state.loginPassword.length < 6)
    //     ToastAndroid.show("Password must be longer than 6 characters", ToastAndroid.SHORT)

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
          ToastAndroid.show('Successfully Updated Details', ToastAndroid.SHORT);
          this.props.navigation.navigate("Change Password");
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
        //this.setState({isLoading: false})
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.flexContainer}>
        <View style={styles.flexContainer}>
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />
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

          {/* <TextInput
            style={styles.paperInput}
            label="Enter password:"
            onChangeText={this.handlePassword}
            value={this.state.password}
            secureTextEntry
          />
          <BarPasswordStrengthDisplay
            password={this.state.password}
            width={200}
            minLength={1}
          /> */}
          
          <Button mode="contained" style={styles.paperButton} onPress={() => this.submitChanges()}>
            Submit Changes
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default EditDetails;
