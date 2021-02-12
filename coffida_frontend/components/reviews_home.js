import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './stylesheet';
import AsyncStorage from '@react-native-community/async-storage';

class ReviewsHome extends Component {
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

  toLogout = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const url = 'http://10.0.2.2:3333/api/1.0.0/user/logout';
  };

  render() {
    return (
      <View style={styles.flexContainer}>

        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Favourites')}>
          <Text style={styles.text}> My Favourites </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('My Reviews')}>
          <Text style={styles.text}> My Reviews </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('My Liked Reviews')}>
          <Text style={styles.text}> My Liked Reviews </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ReviewsHome;
