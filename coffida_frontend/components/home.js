import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import styles from './stylesheet';
import { Button } from 'react-native-paper';

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
        
        <Button style={styles.paperButton} mode="contained" onPress={() => nav.navigate('Login')}>
          Login
        </Button>
        <Button style={styles.paperButton} mode="contained" onPress={() => nav.navigate('Register')}>
          Register
        </Button>
      </View>
    );
  }
}

export default Home;
