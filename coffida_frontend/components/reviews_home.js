import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './stylesheet';

class ReviewsHome extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

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
