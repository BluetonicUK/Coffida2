import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import styles from './stylesheet'
import { ScrollView } from 'react-native-gesture-handler';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import AsyncStorage from '@react-native-community/async-storage'

// URL NEEDS ID NUMBER!!!!!

class EditDetails extends Component{


    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            surname: '',
            email: '',
            password: ''
        }
    }

    //methods here etc - need to get json data etc

    handleFirstName = (firstname) => {
        this.setState({firstname: firstname})
    }

    handleSurname= (surname) => {
        this.setState({surname: surname})
    }

    handleEmail = (email) => {
        this.setState({email: email})
    }

    handlePassword = password =>{
         this.setState({password: password })
    }

    
    //works but need to do checking logic - check with Ash abotu back end as each field needs an entry.
    submitChanges = async () => {
        id = await AsyncStorage.getItem('@id')
        token = await AsyncStorage.getItem('@session_token')
        console.log(id)
        console.log(token)

        var validator = require("email-validator");

        // if(validator.validate(this.state.loginEmail) === false)
        //     ToastAndroid.show("Enter a valid email address", ToastAndroid.SHORT)
        // else if(this.state.loginPassword.length < 6)
        //     ToastAndroid.show("Password must be longer than 6 characters", ToastAndroid.SHORT)

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + id,  
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json',
                        'X-Authorization': token },
            body: JSON.stringify({
                first_name: this.state.firstname,
                last_name: this.state.surname,
                email: this.state.email,
                password: this.state.password,
            })
            })
            .then((response) => {
                if(response.status === 200){
                    ToastAndroid.show("Successfully Updated Details", ToastAndroid.SHORT);
                } 
                else if(response.status === 400)
                    ToastAndroid.show("Bad Request", ToastAndroid.SHORT);
                else if(respinse.status === 401)
                    ToastAndroid.show("Unorthorised Access to this user", ToastAndroid.SHORT);
                else if(respinse.status === 403)
                    ToastAndroid.show("Forbidden", ToastAndroid.SHORT);
                else if(respinse.status === 404)
                    ToastAndroid.show("404: Page not found", ToastAndroid.SHORT);
                else
                    ToastAndroid.show("Server error, please try later", ToastAndroid.SHORT);

                //this.setState({isLoading: false})
            })
            .catch((error) => {
                console.error(error);
        })
    }
    
    
    
    render(){

    const nav = this.props.navigation; 

    return(

        <ScrollView contentContainerStyle={styles.flexContainer}>
            <TextInput style={styles.input} 
                    placeholder='Enter First Name:'
                    onChangeText={this.handleFirstName} 
                    value={this.state.firstname} />

            <TextInput style={styles.input} 
                    placeholder='Enter Surname:'
                    onChangeText={this.handleSurname} 
                    value={this.state.surname} />

            <TextInput style={styles.input} 
                    placeholder='Enter email:' 
                    onChangeText={this.handleEmail} 
                    value={this.state.email} />

            <TextInput style={styles.input} 
                    placeholder='Enter password:'
                    onChangeText={this.handlePassword} 
                    value={this.state.password} 
                    secureTextEntry />
                <BarPasswordStrengthDisplay 
                    password= { this.state.password } 
                    width={200}
                    minLength={1}
                    />

            <TouchableOpacity style={styles.button} onPress={() => this.submitChanges()} >
                <Text style={styles.text}> Submit Changes </Text>
            </TouchableOpacity>
        </ScrollView>

    );
    
  }
}

export default EditDetails;