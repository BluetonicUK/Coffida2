/* eslint-disable global-require */
/* eslint-disable react/sort-comp */
/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
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
import StarRating from 'react-native-star-rating';
import Photo from './photo';
import styles from './stylesheet';

class MyReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      faveLocations: [],
      locReviews: [],
      reviews: [],
      likedReviews: [],
      // displayImage: true,
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

  toEditReview = async (reviewID, locID) => {
    await AsyncStorage.setItem('@review_id', JSON.stringify(reviewID));
    await AsyncStorage.setItem('@loc_review_id', JSON.stringify(locID));
    this.props.navigation.navigate('Edit Review');
  };

  visitLocation = async (locID) => {
    locID = await AsyncStorage.setItem('@location_id', JSON.stringify(locID));
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
        console.error(error);
      });
  };

  IndividualReviewStars = (starRating) => {
    return (
      <StarRating
        containerStyle={styles.star}
        disabled={true}
        maxStars={5}
        rating={starRating}
        //selectedStar={(rating) => this.onStarRatingPress(rating)}
        emptyStarColor={'#a9abb0'}
        fullStarColor={'#7ee687'}
        starSize={15}
      />
    );
  };

  deleteReview = async (locID, reviewID) => {
    const token = await AsyncStorage.getItem('@session_token');
    const url =
      'http://10.0.2.2:3333/api/1.0.0/location/' +
      locID +
      '/review/' +
      reviewID;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Review Deleted', ToastAndroid.SHORT);
          this.returnLocation();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.flexContainer}>
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <FlatList
          style={{width: '100%'}}
          // contentContainerStyle={{marginTop: 10, paddingBottom: 40}}
          data={this.state.reviews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View>
              <View style={styles.flatlist4}>
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                  {'\n' + item.location.location_name + ', '}
                  {item.location.location_town + '\n'}
                </Text>

                <Photo
                  location_id={item.location.location_id}
                  review_id={item.review.review_id}
                />

                <Text style={{textAlign: 'center'}}>
                  Overall {'\n'}
                  {this.IndividualReviewStars(item.review.overall_rating)}
                  {'\n'}
                  Price {'\n'}
                  {this.IndividualReviewStars(item.review.price_rating)}
                  {'\n'}
                  Quality {'\n'}
                  {this.IndividualReviewStars(item.review.quality_rating)}
                  {'\n'}
                  Cleanliness {'\n'}
                  {this.IndividualReviewStars(item.review.clenliness_rating)}
                  {'\n'}
                  Comment {'\n'}
                  <Text style={{fontStyle: 'italic'}}>
                    {item.review.review_body}
                    {'\n'}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.deleteReview(
                        item.location.location_id,
                        item.review.review_id,
                      )
                    }>
                    <Ionicons
                      name="close-circle-outline"
                      size={20}
                      color="red"
                    />
                  </TouchableOpacity>
                  {'    '}
                  <TouchableOpacity
                    onPress={() =>
                      this.toEditReview(
                        item.review.review_id,
                        item.location.location_id,
                      )
                    }>
                    <Ionicons name="create-outline" size={20} color="blue" />
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

export default MyReviews;
