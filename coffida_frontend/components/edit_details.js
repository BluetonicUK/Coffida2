import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './stylesheet'
import { ScrollView } from 'react-native-gesture-handler';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';

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

    
    
    saveDetails = () => {

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

            <TouchableOpacity style={styles.button} onPress={() => this.saveDetails()} >
                <Text style={styles.text}> Submit Changes </Text>
            </TouchableOpacity>
        </ScrollView>

    );
    
  }
}

export default EditDetails;