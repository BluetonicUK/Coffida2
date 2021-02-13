import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ToastAndroid,
} from 'react-native';
import styles from './stylesheet';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
//import {Button} from 'react-native-paper';

class MyLikedReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      likedReviews: [],
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

  componentDidMount() {
    this.returnLocation();
  }

  render() {
    return (
      <View style={styles.flexContainer}>
        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

        <FlatList
          style={{width: '100%'}}
          //contentContainerStyle={{marginTop: 10, paddingBottom: 40}}
          data={this.state.likedReviews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View>
              <View style={styles.flatlist4}>
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                  {'\n' + item.location.location_name + ', '}
                  {item.location.location_town + '\n'}
                </Text>

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
                  Likes: {item.review.likes + '\n'}
                  Comment {'\n'}
                  <Text style={{fontStyle: 'italic'}}>
                    {item.review.review_body}
                    {'\n'}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.unlikeReview(
                        item.location.location_id,
                        item.review.review_id,
                        item.review.likes,
                      )
                    }>
                    <Ionicons
                      name="close-circle-outline"
                      size={20}
                      color={'red'}
                    />
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

export default MyLikedReviews;