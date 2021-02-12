import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import styles from './stylesheet';
import AsyncStorage from '@react-native-community/async-storage';
import StarRating from 'react-native-star-rating';

class MyLocations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandFavourites: false,
      expandReviews: false,
      faveLocations: [],
      locReviews: [],
      reviews: [],
      likedReviews: [],
    };
  }

  componentDidMount = () => {
    this.returnLocation();
  };

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
            locReviews: responseJson.favourite_locations.location_reviews, //array
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

  returnMainReviewStars = (starRating) => {
    return (
      <StarRating
        containerStyle={styles.star}
        disabled={true}
        maxStars={5}
        rating={starRating}
        //selectedStar={(rating) => this.onStarRatingPress(rating)}
        emptyStarColor={'#a9abb0'}
        fullStarColor={'#1dab40'}
        starSize={18}
      />
    );
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

  toEditReview = async (reviewID, locID) => {
    await AsyncStorage.setItem('@review_id', JSON.stringify(reviewID));
    await AsyncStorage.setItem('@loc_review_id', JSON.stringify(locID));
    this.props.navigation.navigate('Edit Review');
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

  unlikeReview = async (locID, reviewID, likes) => {
    const token = await AsyncStorage.getItem('@session_token');
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        locID +
        '/review/' +
        reviewID +
        '/like',
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
          likes -= 1;
          ToastAndroid.show('Review Unliked', ToastAndroid.SHORT);
          this.returnLocation();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const nav = this.props.navigation;

    return (
      <View>
        <View style={styles.shop2}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            Favourite Locations:{' '}
          </Text>

          <FlatList
            contentContainerStyle={{marginTop: 10, paddingBottom: 40}}
            data={this.state.faveLocations}
            renderItem={({item}) => (
              <Text style={{textAlign: 'center'}}>
                {/* ID:  {item.location_id + '\n'} */}
                Name: {item.location_name + '\n'}
                Town: {item.location_town + '\n'}
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.buttonRemove}
                    onPress={() => this.deleteFavourite(item.location_id)}>
                    <Text style={{textAlign: 'center'}}>Remove {'\n'}</Text>
                  </TouchableOpacity>
                  <Text>{'\n'}</Text>
                </View>
              </Text>
            )}
            keyExtractor={(temp, index) => index.toString()}
          />
        </View>

        <View style={styles.shop2}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            My Reviews:{' '}
          </Text>

          <FlatList
            contentContainerStyle={{marginTop: 10, paddingBottom: 40}}
            data={this.state.reviews}
            renderItem={({item}) => (
              <Text style={{textAlign: 'center'}}>
                {item.location.location_name +
                  ', ' +
                  item.location.location_town +
                  '\n'}
                {/* LOCID: {item.location.location_id + '\n'}
                ID: {item.review.review_id + '\n'} */}
                Overall: {'\n'}
                {this.IndividualReviewStars(item.review.overall_rating)}
                {'\n'}
                Price: {'\n'}
                {this.IndividualReviewStars(item.review.price_rating)}
                {'\n'}
                Quality: {'\n'}
                {this.IndividualReviewStars(item.review.quality_rating)}
                {'\n'}
                Cleanliness: {'\n'}
                {this.IndividualReviewStars(item.review.clenliness_rating)}
                {'\n'}
                Comment: {item.review.review_body + '\n'}
                {'\n'}
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.mapButton}
                    onPress={() =>
                      this.toEditReview(
                        item.review.review_id,
                        item.location.location_id,
                      )
                    }>
                    <Text style={{textAlign: 'center'}}>Edit Review</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonRemove}
                    onPress={() =>
                      this.deleteReview(
                        item.location.location_id,
                        item.review.review_id,
                      )
                    }>
                    <Text style={{textAlign: 'center'}}>Remove{'\n\n'}</Text>
                  </TouchableOpacity>
                </View>
              </Text>
            )}
            keyExtractor={(temp, index) => index.toString()}
          />
        </View>

        <View style={styles.shop2}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            Liked Reviews:{' '}
          </Text>

          <FlatList
            contentContainerStyle={{marginTop: 10, paddingBottom: 40}}
            data={this.state.likedReviews}
            renderItem={({item}) => (
              <Text style={{textAlign: 'center'}}>
                {item.location.location_name +
                  ', ' +
                  item.location.location_town +
                  '\n'}
                {/* ID:  {item.review.review_id + '\n'} */}
                Overall: {'\n'}
                {this.IndividualReviewStars(item.review.overall_rating)}
                {'\n'}
                Price: {'\n'}
                {this.IndividualReviewStars(item.review.price_rating)}
                {'\n'}
                Quality: {'\n'}
                {this.IndividualReviewStars(item.review.quality_rating)}
                {'\n'}
                Cleanliness: {'\n'}
                {this.IndividualReviewStars(item.review.clenliness_rating)}
                {'\n'}
                Comment: {item.review.review_body + '\n'}
                likes: {item.review.likes + '\n '}
                <TouchableOpacity
                  style={styles.buttonRemove}
                  onPress={() =>
                    this.unlikeReview(
                      item.location.location_id,
                      item.review.review_id,
                      item.review.likes,
                    )
                  }>
                  <Text style={{textAlign: 'center'}}>Unlike</Text>
                </TouchableOpacity>
                {'\n'}
              </Text>
            )}
            keyExtractor={(temp, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

export default MyLocations;
