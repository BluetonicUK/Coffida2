import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import Geolocation from 'react-native-geolocation-service';
import styles from './stylesheet';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      locationPermission: false,
    };
  }

//   getCoordinates = async () => {
//     const lat = await AsyncStorage.getItem('@latitude');
//     const long = await AsyncStorage.getItem('@longitude');

//     Geolocation.getCurrentPosition(
//       (position) => {
//         const location = JSON.stringify(position);
//         this.setState({location});
//       },
//       (error) => {
//         Alert.alert(error.message);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 20000,
//         maximumAge: 100,
//       },
//     );
//   };

  render() {
    return <View style={styles.flexContainer} />;
  }
}

export default Map;
