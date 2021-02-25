/* eslint-disable lines-between-class-members */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable global-require */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
import React, {Component} from 'react';
import {Text, View, ScrollView, Image, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import StarRating from 'react-native-star-rating';
import {Button, TextInput} from 'react-native-paper';
import styles from './stylesheet';

class EditReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overallRating: 0,
      priceRating: 0,
      qualityRating: 0,
      cleanlinessRating: 0,
      reviewText: '',
    };
  }

  editReview = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@loc_review_id');
    const review_id = await AsyncStorage.getItem('@review_id');
    const url =
      'http://10.0.2.2:3333/api/1.0.0/location/' + id + '/review/' + review_id;
    // eslint-disable-next-line prettier/prettier
    console.log('REVIEW ID: ' + review_id);
    // eslint-disable-next-line prettier/prettier
    console.log('LOC ID: ' + id);

    try {
      return fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
        body: JSON.stringify({
          overall_rating: this.state.overallRating,
          price_rating: this.state.priceRating,
          quality_rating: this.state.qualityRating,
          clenliness_rating: this.state.cleanlinessRating,
          review_body: this.state.reviewText,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            ToastAndroid.show('Review Created', ToastAndroid.SHORT);
            this.props.navigation.navigate('Search');
          }
        })
        .catch((error) => {
          console.error(error + 'ERROR 1');
        });
    } catch (e) {
      console.log(e + 'ERROR 2');
    }
  };

  onOverallRating(rating) {
    this.setState({overallRating: rating});
  }
  onPriceRating(rating) {
    this.setState({priceRating: rating});
  }
  onQualityRating(rating) {
    this.setState({qualityRating: rating});
  }
  onCleanlinessRating(rating) {
    this.setState({cleanlinessRating: rating});
  }
  handleInput = (reviewInput) => {
    const comment = this.profanityFilter(reviewInput);
    this.setState({reviewText: comment});
  };

  profanityFilter = (input) => {
    const output = input.replace(/tea|cakes|pastries/gi, '****');
    return output;
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.flexContainer}>
        <View style={styles.flexContainer}>
          <Image
            style={styles.logo}
            source={require('../logos/Coffida1.png')}
          />
          <Text style={{fontWeight: 'bold'}}> Edit Review</Text>
          <Text>Overall:</Text>
          <Text>
            <StarRating
              containerStyle={styles.star}
              disabled={false}
              maxStars={5}
              rating={this.state.overallRating}
              selectedStar={(rating) => this.onOverallRating(rating)}
              emptyStarColor="#a9abb0"
              fullStarColor="#1dab40"
              starSize={18}
            />
          </Text>

          <Text>Price: </Text>
          <Text>
            <StarRating
              containerStyle={styles.star}
              disabled={false}
              maxStars={5}
              rating={this.state.priceRating}
              selectedStar={(rating) => this.onPriceRating(rating)}
              emptyStarColor="#a9abb0"
              fullStarColor="#1dab40"
              starSize={18}
            />
          </Text>

          <Text>Quality: </Text>
          <Text>
            <StarRating
              containerStyle={styles.star}
              disabled={false}
              maxStars={5}
              rating={this.state.qualityRating}
              selectedStar={(rating) => this.onQualityRating(rating)}
              emptyStarColor="#a9abb0"
              fullStarColor="#1dab40"
              starSize={18}
            />
          </Text>

          <Text>Cleanliness: </Text>
          <Text>
            <StarRating
              containerStyle={styles.star}
              disabled={false}
              maxStars={5}
              rating={this.state.cleanlinessRating}
              selectedStar={(rating) => this.onCleanlinessRating(rating)}
              emptyStarColor="#a9abb0"
              fullStarColor="#1dab40"
              starSize={18}
            />
            {'\n'}
          </Text>

          <Text>Comments: </Text>

          <TextInput
            style={styles.paperInput}
            multiline
            label="Enter review"
            onChangeText={this.handleInput}
            value={this.state.reviewText}
          />
          <View style={styles.mapButtonView}>
            <Button
              mode="contained"
              style={styles.mapButton}
              onPress={() => this.editReview()}>
              Edit Review
            </Button>
            <Button
              icon="camera"
              mode="contained"
              style={styles.mapButton}
              onPress={() => this.props.navigation.navigate('Camera')}>
              Add Photo
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default EditReview;
