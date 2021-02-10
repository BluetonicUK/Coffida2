import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './stylesheet'
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage'

import StarRating from 'react-native-star-rating';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableHighlight } from 'react-native-gesture-handler';





class SearchResult extends React.Component {


    constructor(props) {
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
            avgClean: 0,
            LocReviews: [],

            favourite: false,
            isPhoto: false,

            testReviews: []
        }

    }


    componentDidMount() {
        this.returnLocation();
    }

    componentWillUnmount() {

    }


    returnLocation = async () => {



        token = await AsyncStorage.getItem('@session_token')
        id = await AsyncStorage.getItem('@location_id')

        try {
            return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + id,
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
                        avgClean: responseJson.avg_clenliness_rating,
                        LocReviews: responseJson.location_reviews

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


    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

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


        )
    }
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


        )
    }

    addRemoveFavourite = () => {
        let icon = 'heart';
            if(icon === 'heart-outline'){
                return(
                    <Ionicons name={'heart'} size={18} color={'red'} />
                )
            }
            else if(icon === 'heart'){
                return(
                    <Ionicons name={'heart-outline'} size={18} color={'red'} />
                )
            }


    }

    render() {
        //console.log({location_id})

        return (
            <View>
                <View style={styles.shop}>
                    <Text 
                        style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            {this.state.locName + '\n' + this.state.locTown}</Text>

 
                        <TouchableHighlight style={{alignItems: 'center'}} onPress={() => this.addRemoveFavourite()}>
                            {this.addRemoveFavourite()}
                        </TouchableHighlight>


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
                        <TouchableOpacity style={styles.mapButton}>
                            <Text style={styles.text2} >  Map</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mapButton} >
                            <Text style={styles.text2} >Review</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.image} source={require('../images/cup.jpg')}></Image>
                    </View>
                </View>


                <FlatList
                    contentContainerStyle={{ height: 1000, width: 300 }}
                    data={this.state.LocReviews}
                    renderItem={({ item }) =>


                        <Text style={{fontSize: 13}}>
                            User Review: {item.review_id + '\n'}
                                Overall Rating:                     {this.IndividualReviewStars(item.overall_rating)}{'\n'}
                                Price Rating:                        {this.IndividualReviewStars(item.price_rating)}{'\n'}
                                Qiality Rating:                      {this.IndividualReviewStars(item.quality_rating)}{'\n'}
                                Cleanliness Rating:             {this.IndividualReviewStars(item.clenliness_rating)}{'\n'}
                                Comment:    {item.review_body + '\n'}
                                Likes: {item.likes}{'\n'}
                                
                        </Text>

                    }
                    keyExtractor={(temp, index) => index.toString()}
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