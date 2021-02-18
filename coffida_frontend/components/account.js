import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './stylesheet';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-paper';

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
      liked_reviews: [],
    };
  }

  getDetails = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@id');
    const url = 'http://10.0.2.2:3333/api/1.0.0/user/' + id;
    try {
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
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
            liked_reviews: responseJson.liked_reviews,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.getDetails();
  }

  toMyLocations() {
    return this.props.navigation.navigate('MyLocations');
  }

  toEdit() {
    return this.props.navigation.navigate('EditDetails');
  }

  toLogout = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const url = 'http://10.0.2.2:3333/api/1.0.0/user/logout';

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate('Logout');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  time = () => {
    var hours = new Date().getHours();
    if (hours >= 12 && hours < 17) {
      return 'afternoon, ';
    } else if (hours >= 17) {
      return 'evening, ';
    } else {
      return 'morning, ';
    }
  };

  render() {
    //const nav = this.props.navigation;

    return (
      <View style={styles.flexContainer}>
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <Text style={styles.text}>
          {' '}
          Good {this.time() + this.state.firstname + '!\n'}
        </Text>

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => this.toMyLocations()}>
          <Text style={styles.text}> My Locations </Text>
        </TouchableOpacity> */}
        <Button mode="contained" style={styles.paperButton} onPress={() => this.toEdit()}>
          Edit Details
        </Button>
        <Button mode="contained" style={styles.buttonRed} onPress={() => this.toLogout()}>
          Logout
        </Button>

        {/* <TouchableOpacity style={styles.button} onPress={() => this.toEdit()}>
          <Text style={styles.text}> Edit Details </Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={styles.buttonRed}
          onPress={() => this.toLogout()}>
          <Text style={styles.text}> Logout </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

export default Account;
