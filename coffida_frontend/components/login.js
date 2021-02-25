/* eslint-disable react/no-unused-state */
/* eslint-disable consistent-return */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {ToastAndroid, Image, ScrollView, LogBox} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, TextInput} from 'react-native-paper';
import styles from './stylesheet';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      loginEmail: '',
      loginPassword: '',
    };
  }

  handleEmail = (email) => {
    this.setState({loginEmail: email});
  };

  handlePassword = (password) => {
    this.setState({loginPassword: password});
  };

  logIn() {
    LogBox.ignoreAllLogs(); // stops the responseJson.token being undefined in a popup.
    const validator = require('email-validator');

    if (validator.validate(this.state.loginEmail) === false) {
      ToastAndroid.show('Enter a valid email address', ToastAndroid.SHORT);
    } else {
      return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.loginEmail,
          password: this.state.loginPassword,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          if (response.status === 400) {
            ToastAndroid.show('Invalid credentials', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Sorry there is a problem', ToastAndroid.SHORT);
          }
          this.setState({isLoading: false});
        })
        .then(async (responseJson) => {
          console.log(responseJson);
          await AsyncStorage.setItem('@session_token', responseJson.token);
          await AsyncStorage.setItem('@id', JSON.stringify(responseJson.id));
          this.props.navigation.navigate('TabbedNav');
        })
        .catch((error) => {
          throw error;
        });
    }
  }

  render = () => {
    // const nav = this.props.navigation;
    // if(this.state.ActivityIndicator){
    //     return(
    //         <View>
    //             <ActivityIndicator
    //                 size='large'
    //                 color='red' />
    //         </View>
    //     );
    // }
    return (
      <ScrollView contentContainerStyle={styles.flexContainer}>
        {/* <View > */}
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <TextInput
          style={styles.paperInput}
          label="Email"
          value={this.state.loginEmail}
          onChangeText={this.handleEmail}
          mode="outlined"
        />
        <TextInput
          style={styles.paperInput}
          label="Password"
          value={this.state.loginPassword}
          onChangeText={this.handlePassword}
          mode="outlined"
          secureTextEntry
        />

        <Button
          mode="contained"
          style={styles.paperButton}
          onPress={() => this.logIn()}>
          Login
        </Button>
      </ScrollView>
    );
  };
}

export default Login;
