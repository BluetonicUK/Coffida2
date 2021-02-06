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



  getDetails = async () => {

    token = await AsyncStorage.getItem('@session_token')
    id = await AsyncStorage.getItem('@id')


    try {
      return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
          },
        })
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          }
        })
        .then((responseJson) => {
          this.setState({
            id: responseJson.user_id,
            firstname: responseJson.first_name,
            surname: responseJson.last_name,
            email: responseJson.email,
            favourite_locations: responseJson.favourite_locations,
            reviews: responseJson.reviews,
            liked_reviews: responseJson.liked_reviews
          })
        })
        .catch((error) => {
          console.error(error + "ERROR 1");
        })
    }
    catch (e) {
      console.log(e + "ERROR 2")
    }

  }


  componentDidMount() {
    this.getDetails();
  }

  toMyLocations() {
    return (
      this.props.navigation.navigate('MyLocations')
    );
  }

  toEdit() {
    return (
      this.props.navigation.navigate('EditDetails')
    );
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

  time = () => {
    var hours = new Date().getHours();
    if (hours >= 12 && hours < 17)
      return "afternoon, "
    else if (hours >= 17 && hours < 0)
      return "evening, "
    else
      return "morning, "

  }

  render() {


    const nav = this.props.navigation;

    return (

      <View style={styles.flexContainer}>

        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <Text style={styles.text}> Good {this.time() + this.state.firstname + "!"}</Text>

        <TouchableOpacity style={styles.button} onPress={() => this.toMyLocations()} >
          <Text style={styles.text}> My Locations </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => this.toEdit()}>
          <Text style={styles.text}> Edit Details </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRed} onPress={() => this.toLogout()}>
          <Text style={styles.text}> Logout </Text>
        </TouchableOpacity>

      </View>

    );

  }
}

export default Account;