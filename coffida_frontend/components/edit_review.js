import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, FlatList, ToastAndroid, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import styles from './stylesheet'
import StarRating from 'react-native-star-rating';

class EditReview extends Component {


    constructor(props) {
        super(props);

        this.state = {
            overallRating: 0,
            priceRating: 0,
            qualityRating: 0,
            cleanlinessRating: 0,
            reviewText: '',
            starCount: 0,

        }
    }



    editReview = async () => {

        token = await AsyncStorage.getItem('@session_token')
        id = await AsyncStorage.getItem('@location_id')
        review_id = await AsyncStorage.getItem('@review_id')

        try {
            return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + id + '/review/' + review_id,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': token
                    },
                    body: JSON.stringify({
                        overall_rating: this.state.overallRating,
                        price_rating: this.state.priceRating,
                        quality_rating: this.state.qualityRating,
                        clenliness_rating: this.state.cleanlinessRating,
                        review_body: this.state.reviewText,
                    })
                })
                .then((response) => {
                    if (response.status === 200) {
                        ToastAndroid.show("Review Edited", ToastAndroid.SHORT)
                        this.props.navigation.navigate("Account")
                    }
                })
                .catch((error) => {
                    console.error(error + "ERROR 1");
                })
        }
        catch (e) {
            console.log(e + "ERROR 2")
        }

    }

    onOverallRating(rating){
        this.setState({ overallRating: rating })
    }
    onPriceRating(rating){
        this.setState({ priceRating: rating })
    }
    onQualityRating(rating){
        this.setState({ qualityRating: rating })
    }
    onCleanlinessRating(rating){
        this.setState({ cleanlinessRating: rating })
    }
    handleInput = (reviewInput) => {
        var comment = this.profanityFilter(reviewInput)
        this.setState({ reviewText: comment })
    }

    profanityFilter = (input) =>{
        let output = input.replace(/tea|cakes|pastries/gi, "****")
        return output
    }


    render() {

            return (
                <ScrollView>
                    <View style={styles.flexContainer}>

                        <Image style={styles.logo} source={require('../logos/Coffida1.png')} />
                        
                        <Text>Overall:</Text>
                        <Text>
                            <StarRating
                                containerStyle={styles.star}
                                disabled={false}
                                maxStars={5}
                                rating={this.state.overallRating}
                                selectedStar={(rating) => this.onOverallRating(rating)}
                                emptyStarColor={'#a9abb0'}
                                fullStarColor={'#1dab40'}
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
                                emptyStarColor={'#a9abb0'}
                                fullStarColor={'#1dab40'}
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
                                emptyStarColor={'#a9abb0'}
                                fullStarColor={'#1dab40'}
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
                                emptyStarColor={'#a9abb0'}
                                fullStarColor={'#1dab40'}
                                starSize={18}
                            />    
                            {'\n'}
                        </Text>
                        
                        <Text>Comments: </Text>

                        <TextInput 
                            style={styles.reviewInput} 
                            multiline={true} 
                            placeholder='Enter review'
                            onChangeText={this.handleInput}
                            value={this.state.reviewText}
                        /> 
                        
                        

                        <TouchableOpacity style={styles.button} onPress={() => this.editReview()} >
                            <Text style={styles.text}> Edit Review </Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            );
        }


}

export default EditReview;

