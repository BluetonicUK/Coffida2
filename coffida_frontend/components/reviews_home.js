import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import styles from './stylesheet'
import AsyncStorage from '@react-native-community/async-storage'

//import UserHome from './user_home';
import { ScrollView } from 'react-native-gesture-handler';
import MyLocations from './my_locations'
import EditDetails from './edit_details'


// const Screen = {
//   MyLoc: MyLocations,
// };



class Account extends Component {


  constructor(props) {
    super(props);

    this.state = {
      id: '',
      firstname: '',
      surname: '',
      email: '',
      favourite_locations: [],
      reviews: [],
      liked_reviews: []
    }
  }


  toLogout = async () => {

    token = await AsyncStorage.getItem('@session_token')
    console.log(token)

    return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token
        },
        //X-auth
      })
      .then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate('Logout');
        }

      })
      .catch((error) => {
        console.error(error);
      });

  }

  

  render() {


    const nav = this.props.navigation;

    return (

      <View style={styles.flexContainer}>

        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        

        <TouchableOpacity style={styles.button} onPress={() => this.toMyLocations()} >
          <Text style={styles.text}> My Locations </Text>
        </TouchableOpacity>


      </View>

    );

  }
}

export default Account;