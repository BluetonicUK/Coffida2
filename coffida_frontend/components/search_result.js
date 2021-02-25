/* eslint-disable no-useless-catch */
/* eslint-disable no-else-return */
/* eslint-disable react/no-unused-state */
/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable spaced-comment */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import StarRating from 'react-native-star-rating';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import Photo from './photo';
import styles from './stylesheet';

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationID: 0,
      locName: '',
      locTown: '',
      lat: 0,
      long: 0,
      photoPath: '',
      avgOverall: 0,
      avgPrice: 0,
      avgQuality: 0,
      avgClean: 0,
      LocReviews: [],
      icon: 'heart-outline',
      likeIcon: 'thumbs-up-outline',
    };
  }

  componentDidMount = async () => {
    await this.returnLocation();
  };

  toAddReview = () => {
    this.props.navigation.navigate('Add Review');
  };

  // eslint-disable-next-line consistent-return
  returnLocation = async () => {
    const id = await AsyncStorage.getItem('@location_id');

    try {
      return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line no-dupe-keys
          'Content-Type': 'image/jpeg',
        },
      })
        // eslint-disable-next-line consistent-return
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then(async (responseJson) => {
          this.setState({
            locationID: responseJson.location_id,
            locName: responseJson.location_name,
            locTown: responseJson.location_town,
            lat: responseJson.latitude,
            long: responseJson.longitude,
            photoPath: responseJson.photo_path,
            avgOverall: responseJson.avg_overall_rating,
            avgPrice: responseJson.avg_price_rating,
            avgQuality: responseJson.avg_quality_rating,
            avgClean: responseJson.avg_clenliness_rating,
            LocReviews: responseJson.location_reviews,
          });
        })
        .catch((error) => {
          console.error(error + 'ERROR 1');
        });
    } catch (e) {
      console.log(e + 'ERROR 2');
    }
  };

  passCoordinates(lat, long, cafeName) {
    AsyncStorage.setItem('@latitude', JSON.stringify(lat));
    AsyncStorage.setItem('@longitude', JSON.stringify(long));
    AsyncStorage.setItem('@cafe_name', cafeName);
    this.props.navigation.navigate('Map');
  }

  returnMainReviewStars = (starRating) => {
    return (
      <StarRating
        containerStyle={styles.star}
        disabled={true}
        maxStars={5}
        rating={starRating}
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
        emptyStarColor={'#a9abb0'}
        fullStarColor={'#7ee687'}
        starSize={15}
      />
    );
  };

  addRemoveFavourite = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@location_id');
    try{
    if (this.state.icon === 'heart-outline') {
      return fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' + id + '/favourite',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
        },
      )
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              icon: 'heart',
              favourite: true,
            });
            ToastAndroid.show('Added to favourites', ToastAndroid.SHORT);
          }
        })
        .catch((error) => {
          console.error(error + 'ERROR 1');
        });
    } else {
      return fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' + id + '/favourite',
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
            this.setState({
              icon: 'heart-outline',
              favourite: false,
            });
            ToastAndroid.show('Removed from favourites', ToastAndroid.SHORT);
          }
        })
        .catch((error) => {
          console.error(error + 'ERROR 1');
        });
    }
  } catch(error) {
    throw error; 
  }
  };

  returnLikeIcon = () => {
    if (this.state.likeIcon === 'thumbs-up-outline') {
      return 'thumbs-up';
    }
    return 'thumbs-up-outline';
  };

  likeDislikeReview = async (rev_id, likes) => {
    //this.state.reviewID = rev_id
    //this.state.likes = likes

    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@location_id');

    if (this.state.likeIcon === 'thumbs-up-outline') {
      //console.log(rev_id)
      console.log('before' + likes);
      return fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          id +
          '/review/' +
          rev_id +
          '/like',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
        },
      )
        .then((response) => {
          if (response.status === 200) {
            likes += 1;
            this.setState({
              likeIcon: 'thumbs-up', //each review needs it's own state. not gonna have time.
              likes,
            });

            //updates - confusion as parameter is likes along with state
            console.log('after' + likes);
            this.returnLocation();
          }
        })
        .catch((error) => {
          console.error(error + 'ERROR 1');
        });
    } else {
      return fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          id +
          '/review/' +
          rev_id +
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
            this.setState({
              likeIcon: 'thumbs-up-outline',
              likes,
            });
            this.returnLocation();

            //ToastAndroid.show('Removed from favourites', ToastAndroid.SHORT)
          }
        })
        .catch((error) => {
          console.error(error + 'ERROR 1');
        });
    }
  };

  displayCafephoto() {
    if (this.state.photoPath != '') {
      return (
        <View style={{alignItems: 'center'}}>
          <Image
            style={styles.image}
            source={{uri: this.state.photoPath}}></Image>
        </View>
      );
    }
    return <View></View>;
  }

  render() {
    return (
      <View style={styles.shop}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
          {this.state.locName + '\n' + this.state.locTown}
        </Text>

        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => this.addRemoveFavourite()}>
          <Ionicons
            name={this.state.icon}
            style={{color: 'red', fontSize: 18}}
          />
        </TouchableOpacity>

        <View style={styles.ratingView}>
          <Text>Overall: </Text>
          <Text>{this.returnMainReviewStars(this.state.avgOverall)}</Text>
        </View>

        <View style={styles.ratingView}>
          <Text>Average Price: </Text>
          <Text>{this.returnMainReviewStars(this.state.avgPrice)}</Text>
        </View>

        <View style={styles.ratingView}>
          <Text>Average Quality: </Text>
          <Text>{this.returnMainReviewStars(this.state.avgQuality)}</Text>
        </View>

        <View style={styles.ratingView}>
          <Text>Average Cleanliness: </Text>
          <Text>{this.returnMainReviewStars(this.state.avgClean)}</Text>
        </View>

        <View style={styles.mapButtonView}>
          <Button
            mode="contained"
            style={styles.mapButton}
            onPress={() =>
              this.passCoordinates(
                this.state.lat,
                this.state.long,
                this.state.locName,
              )
            }>
            Map
          </Button>
          <Button
            mode="contained"
            style={styles.mapButton}
            onPress={() => this.toAddReview()}>
            Add Review
          </Button>
        </View>
        {this.displayCafephoto()}

        <FlatList
          data={this.state.LocReviews}
          renderItem={({item}) => (
            // <View>
            <View style={styles.flatlist2}>
              <Text style={styles.flatlist2}>
                User Review: {item.review_id + '\n'}
                Overall Rating:{' '}
                {this.IndividualReviewStars(item.overall_rating)}
                {'\n'}
                Price Rating: {this.IndividualReviewStars(item.price_rating)}
                {'\n'}
                Qiality Rating:{' '}
                {this.IndividualReviewStars(item.quality_rating)}
                {'\n'}
                Cleanliness Rating:{' '}
                {this.IndividualReviewStars(item.clenliness_rating)}
                {'\n'}
                Comment:{' '}
                <Text style={{fontStyle: 'italic'}}>
                  {'\n' + item.review_body + '\n'}
                </Text>
                Likes: {item.likes + ' '}
                <TouchableOpacity
                  onPress={() =>
                    this.likeDislikeReview(item.review_id, item.likes)
                  }>
                  <Ionicons
                    name={this.state.likeIcon}
                    style={{color: '#2569fa', fontSize: 15}}
                  />
                </TouchableOpacity>
                {'\n'}
                <Photo
                  location_id={this.state.locationID}
                  review_id={item.review_id}
                />
              </Text>
            </View>
          )}
          keyExtractor={(temp, index) => index.toString()}
        />
      </View>
    );
  }
}

export default SearchResult;
