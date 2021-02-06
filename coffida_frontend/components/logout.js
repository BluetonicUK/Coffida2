import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import styles from './stylesheet'

//import UserHome from './user_home';
import { ScrollView } from 'react-native-gesture-handler';
import MyLocations from './my_locations'
import EditDetails from './edit_details'


// const Screen = {
//   MyLoc: MyLocations,
// };


class Account extends Component{

    toLogin(){
        return(
          this.props.navigation.navigate('Login')
        );
      }


    render(){

    const nav = this.props.navigation; 

    return(

        <View style={styles.flexContainer}>
            <Text style={styles.text2}> You have succesfully logged out</Text>

            <TouchableOpacity style={styles.button} onPress={() => this.toLogin()}>
                <Text style={styles.text2}> Login </Text>
            </TouchableOpacity> 
            
        </View>

    );
    
  }
}

export default Account;