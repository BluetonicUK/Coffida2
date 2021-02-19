import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './stylesheet';
import { Button } from 'react-native-paper';

class ReviewsHome extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.flexContainer}>

        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <Button mode="contained" style={styles.paperButton} onPress={() => this.props.navigation.navigate('Favourites')}>
          My Favourites
        </Button>
          <Button mode="contained" style={styles.paperButton} onPress={() => this.props.navigation.navigate('My Reviews')}>
          My Reviews
        </Button>
          <Button mode="contained" style={styles.paperButton} onPress={() => this.props.navigation.navigate('My Liked Reviews')}>
          My Liked Reviews
        </Button>
      </View>
    );
  }
}

export default ReviewsHome;
