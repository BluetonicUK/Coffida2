import React, { Component } from 'react';
import { Text, View, Div, TouchableOpacity, Image } from 'react-native';
import styles from './stylesheet'
import { createStackNavigator } from '@react-navigation/stack';
//import UserHome from './user_home';
import AsyncStorage from '@react-native-community/async-storage'
import { Rating, AirbnbRating } from 'react-native-ratings';
import StarRating from 'react-native-star-rating';
//import location_id from './search'


//const location_id = route.params

class SearchResult extends React.Component{

    
    constructor(props){
        super(props);

        this.state = {
            locationID: 0,
            starCount: 2.5,

            locName: '',
            locTown: '',
            lat: 0,
            long: 0,
            photoPath: '',
            avgOverall: 0,
            avgPrice: 0,
            avgQuality: 0,
            acvClean: 0,
            shop_reviews: []

        }
            
    }
    
    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
      }
    

    // componentDidMount(){
    //     this.returnLocation();
    // }


    returnLocation = async () => {

        token = await AsyncStorage.getItem('@session_token')

        try {
            return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + this.state.locationID,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Type': 'image/jpeg',
                        //'X-Authorization': token
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json()
                    }
                })
                .then(async (responseJson) => {
                    this.setState({
                        locName: responseJson.location_name,
                        locTown: responseJson.location_town,
                        lat: responseJson.latitude,
                        long: responseJson.longitude,
                        photoPath: responseJson.photo_path,
                        avgOverall: responseJson.avg_overall_rating,
                        avgPrice: responseJson.avg_price_rating,
                        avgQuality: responseJson.avg_quality_rating,
                        acvClean: responseJson.avg_clenliness_rating,
                        shop_reviews: responseJson.location_reviews

                    })

                })
                .catch((error) => {
                    console.error(error + "ERROR 1");
                })
        }
        catch (e) {
            console.log(e + "ERROR 2")
        }

    }
    
    render(){
        
        return(
            <View style={styles.flexContainer}>

            
            <StarRating 
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                emptyStarColor={'#a9abb0'}
                fullStarColor={'#1dab40'}
                />
   
            </View>

        );
    
  }
}

export default SearchResult;


// //<Rating 
// type='custom'
// showRating
// onFinishRating={this.ratingCompleted} 
// ratingColor={'#1dab40'}
// ratingBackgroundColor={'#d1e8d7'}
// />