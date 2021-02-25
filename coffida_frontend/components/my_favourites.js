/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-template */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './stylesheet';

class Favourites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  returnLocation = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@id');
    const url = 'http://10.0.2.2:3333/api/1.0.0/user/' + id;
    try {
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line no-dupe-keys
          'Content-Type': 'image/jpeg',
          'X-Authorization': token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then(async (responseJson) => {
          this.setState({
            faveLocations: responseJson.favourite_locations,
            locReviews: responseJson.favourite_locations.location_reviews,
            reviews: responseJson.reviews,
            likedReviews: responseJson.liked_reviews,
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
    this.returnLocation();
  }

  visitLocation = async (locID) => {
    locID = await AsyncStorage.setItem(
      '@location_id',
      // eslint-disable-next-line no-use-before-define
      JSON.stringify(locID),
    );
    this.props.navigation.navigate('SearchResult');
  };

  deleteFavourite = async (locID) => {
    const token = await AsyncStorage.getItem('@session_token');
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/favourite',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show(
            'Location removed from favourites',
            ToastAndroid.SHORT,
          );
          this.returnLocation();
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  render() {
    return (
      <View style={styles.flexContainer}>
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <FlatList
          style={{width: '100%'}}
          // contentContainerStyle={{marginTop: 10, paddingBottom: 40}}
          data={this.state.faveLocations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View>
              <View style={styles.flatlist2}>
                <Text>{item.location_name + ' '}</Text>
                <Text>
                  <TouchableOpacity
                    onPress={() => this.visitLocation(item.location_id)}>
                    <Ionicons
                      name="arrow-forward-circle"
                      size={20}
                      color="green"
                    />
                  </TouchableOpacity>
                </Text>
              </View>
              <View style={styles.flatlist3}>
                <Text>{item.location_town}</Text>
                <Text>
                  <TouchableOpacity
                    onPress={() => this.deleteFavourite(item.location_id)}>
                    <Ionicons name="heart-dislike" size={20} color="red" />
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

export default Favourites;
