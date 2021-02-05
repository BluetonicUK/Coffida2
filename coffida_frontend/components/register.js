
import React, { Component } from 'react';
import { Text, Image, TextInput, TouchableOpacity, Alert, ToastAndroid, ActivityIndicator} from 'react-native';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import styles from './stylesheet'
import { ScrollView } from 'react-native-gesture-handler';

class Register extends Component{

    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            surname: '',
            loginEmail: '',
            loginPassword: '',
            isLoading: false
        }
    }

    

    handleFirstName = (firstName) => {
        this.setState({firstName: firstName})
    }

    handleSurname= (surname) => {
        this.setState({surname: surname})
    }

    handleEmail = (email) => {
        this.setState({loginEmail: email})
    }

    handlePassword = password =>{
         this.setState({loginPassword: password })
    }


    // componentDidMount(){
    //     this.register()
    // }

    register = () => {


    var validator = require("email-validator");
    console.log(validator.validate(this.state.loginEmail))

    if(this.state.firstName.length === 0)
        ToastAndroid.show("First name must not be blank", ToastAndroid.SHORT)
    else if(this.state.surname.length === 0)
        ToastAndroid.show("Surname must not be blank", ToastAndroid.SHORT)
    else if(validator.validate(this.state.loginEmail) === false)
        ToastAndroid.show("Enter a valid email address", ToastAndroid.SHORT)
    else if(this.state.loginPassword.length < 6)
        ToastAndroid.show("Password must be longer than 6 characters", ToastAndroid.SHORT)
    

    else
    {
        this.setState({ActivityIndicator: true})
        return fetch("http://10.0.2.2:3333/api/1.0.0/user",  
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: this.state.firstName,
                last_name: this.state.surname,
                email: this.state.loginEmail,
                password: this.state.loginPassword,

            })

            })                                          //end fetch
            .then((response) => {
                if(response.status === 201){
                    return response.json()
                }
                else if(response.status === 400){
                    ToastAndroid.show("Failed to register", ToastAndroid.SHORT)
                }
                else{
                    ToastAndroid.show("Something went wrong", ToastAndroid.SHORT)
                }
                response.json()
                
            })
            .then((responseJson) => {              
                //this.setState({isLoading: false})
                console.log(responseJson)
                this.props.navigation.navigate('Login');
            })                                          //end promise (then)
                .catch((error) => {
                console.error(error);
            })                                              //end of catch
        }                                                   //end of else
    }

     render(){

        return(
        
        <ScrollView contentContainerStyle={styles.flexContainer}>

            <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

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
                    value={this.state.loginEmail} />

            <TextInput style={styles.input} 
                    placeholder='Enter password:'
                    onChangeText={this.handlePassword} 
                    value={this.state.loginPassword} 
                    secureTextEntry />
                <BarPasswordStrengthDisplay 
                    password= { this.state.loginPassword } 
                    width={200}
                    minLength={1}
                    />

            <TouchableOpacity style={styles.button} onPress={() => this.register()} >
                <Text style={styles.text}> Register User </Text>
            </TouchableOpacity>
        </ScrollView>
        );
        
    
  }
}


export default Register;