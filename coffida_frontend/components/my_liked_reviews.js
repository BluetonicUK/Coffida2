import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import styles from './stylesheet';
//import {Button} from 'react-native-paper';

class MyLikedReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }
  render() {

    return (
      <View style={styles.flexContainer}>
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

      </View>
    );
  }
}

export default MyLikedReviews;