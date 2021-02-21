import React, {Component} from 'react';
import {
  ScrollView,
  Image,
  ToastAndroid,
  View,
  Text,
} from 'react-native';
import styles from './stylesheet';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, TextInput } from 'react-native-paper';


class ChangePassword extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        password: '',
        changePassword: false, 
      };
    }

    submitChanges = async () => {
        const id = await AsyncStorage.getItem('@id');
        const token = await AsyncStorage.getItem('@session_token');

        return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
            },
            body: JSON.stringify({
                password: this.state.password,
            }),
        })
            .then((response) => {
            if (response.status === 200) {
                ToastAndroid.show('Successfully Updated Details', ToastAndroid.SHORT);
                this.props.navigation.navigate("Account");
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
            })
            .catch((error) => {
                throw error;
            });
        };

    handlePassword = (password) => {
        this.setState({password: password});
    };

    render() {
        if(this.state.changePassword === false){
            return(
                <ScrollView contentContainerStyle={styles.flexContainer}>
                    <View style={styles.flexContainer}>
                        
                        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />
                        <Text>Would you like to change your password?</Text>
                        <Button mode="contained" style={styles.paperButton} onPress={() => this.props.navigation.navigate("Account")}>
                            No
                        </Button>
                        <Button mode="contained" style={styles.paperButton} onPress={() => this.setState({changePassword: true})}>
                            Yes
                        </Button>
                    </View>
                </ScrollView>
            );
        }
        else if (this.state.changePassword === true) {
            return (            
                <ScrollView contentContainerStyle={styles.flexContainer}>
                    <View style={styles.flexContainer}>
                    <Image style={styles.logo} source={require('../logos/Coffida1.png')} />
                    <Button mode="contained" style={styles.paperButton} onPress={() => this.setState({changePassword: false})}>
                        Back
                    </Button>

                    <TextInput
                        style={styles.paperInput}
                        label="Enter new password:"
                        onChangeText={this.handlePassword}
                        value={this.state.password}
                        secureTextEntry
                    />
                    <BarPasswordStrengthDisplay
                        password={this.state.password}
                        width={200}
                        minLength={1}
                    />
                    
                    <Button mode="contained" style={styles.paperButton} onPress={() => this.submitChanges()}>
                        Submit Changes
                    </Button>
                    </View>
                </ScrollView>
            );
        }
    }
}

export default ChangePassword;