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


    constructor(props){
        super(props);

        this.state = {

        }
    }

    //methods here etc - need to get json data etc

    toMyLocations(){
      return(
        this.props.navigation.navigate('MyLocations')
      );
    }

    toEdit(){
      return(
        this.props.navigation.navigate('EditDetails')
      );
    }

    render(){

    const nav = this.props.navigation; 

    return(

        <View style={styles.flexContainer}>
            <Text style={styles.text2}> user ID</Text>
            <Text style={styles.text2}> Good (do something with time) </Text>
            <Text style={styles.text2}> user ID</Text>
            <Text style={styles.text2}> hello name + surname</Text>
            <Text style={styles.text2}> email </Text>

            <TouchableOpacity style={styles.button2} onPress={() => this.toMyLocations()} >
                <Text style={styles.text2}> My Locations </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={() => this.toEdit()}>
                <Text style={styles.text2}> Edit Details </Text>
            </TouchableOpacity> 
            
        </View>

    );
    
  }
}

export default Account;