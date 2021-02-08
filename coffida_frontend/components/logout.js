import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
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
          this.props.navigation.navigate('Home')
        );
      }


    render(){

    const nav = this.props.navigation; 

    return(

        <View style={styles.flexContainer}>
            <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

            <Text style={styles.text}> You have succesfully logged out</Text>

            <TouchableOpacity style={styles.button} onPress={() => this.toLogin()}>
                <Text style={styles.text}> Login </Text>
            </TouchableOpacity> 
            
        </View>

    );
    
  }
}

export default Account;