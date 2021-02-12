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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }
  render() {
    const nav = this.props.navigation;

    return (
      <View style={styles.flexContainer}>
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => nav.navigate('Login')}>
          <Text style={styles.text}> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => nav.navigate('Register')}>
          <Text style={styles.text}> Register </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
