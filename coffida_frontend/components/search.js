import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import styles from './stylesheet'
import { createStackNavigator } from '@react-navigation/stack';
//import UserHome from './user_home';
import { ScrollView } from 'react-native-gesture-handler';
import SearchResults from './search_results';

class Search extends Component {


    constructor(props) {
        super(props);

        this.state = {
            searchInput: '',
            locID: 0,
            locationList: [],
            locName: '',
            locTown: '',
            lat: 0,
            lon: 0,
            photoPath: '',
            avgOverall: 0,
            avgPrice: 0,
            avgQuality: 0,
            avgClean: 0,
            locReviews: []

        }
    }


    handleInput = (input) => {
        this.setState({ searchInput: input });
    }

    searchLocations = async () => {

        token = await AsyncStorage.getItem('@session_token')

        try {
            return fetch("http://10.0.2.2:3333/api/1.0.0/find?q=" + this.state.searchInput,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Type': 'image/jpeg',
                        'X-Authorization': token
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json()
                    }
                })
                .then(async (responseJson) => {
                    this.setState({
                        locID: responseJson.location_id,
                        locName: responseJson.location_name,
                        locTown: responseJson.location_town,
                        lat: responseJson.latitude,
                        lon: responseJson.longitude,
                        photoPath: responseJson.photo_path,
                        avgOverall: responseJson.avg_overall_rating,
                        avgPrice: responseJson.avg_price_rating,
                        avgClean: responseJson.avg_clenliness_rating,
                        locReviews: responseJson.location_reviews

                    })
                    this.props.navigation.navigate("SearchResults") //why does this fire without the button press???
                })
                .catch((error) => {
                    console.error(error + "ERROR 1");
                })
        }
        catch (e) {
            console.log(e + "ERROR 2")
        }

    }

    componentDidMount() {
        this.searchLocations();
    }

    render() {

        //const nav = this.props.navigation;

        return (
            <View style={styles.flexContainer}>

                <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

                <Text style={styles.text2}> Enter your search in the box below: </Text>

                <TextInput style={styles.input}
                    placeholder='Search:'
                    onChangeText={this.handleInput}
                    value={this.state.searchInput} />

                <TouchableOpacity style={styles.button} onPress={() => {this.searchLocations()}}>
                    <Text style={styles.text}> Submit </Text>
                </TouchableOpacity>
                <SearchResults dataFromParent = "TEST" />

            </View>

        );

    }
}

export default Search;