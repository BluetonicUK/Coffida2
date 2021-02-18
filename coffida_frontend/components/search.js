import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Slider from '@react-native-community/slider';
import styles from './stylesheet';
import { ScrollView } from 'react-native-gesture-handler';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      locationID: 0,
      locationList: [],
      hasSubmitted: false,

      //individual location values
      locName: '',
      locTown: '',
      lat: 0,
      long: 0,
      photoPath: '',
      minOverall: 0,
      minPrice: 0,
      minQuality: 0,
      minClean: 0,

      loadingExtraData: false,
      page:1,
      loading: true,

    };
  }

  handleInput = (input) => {
    this.setState({searchInput: input});
  };
  handleOverall = (input) => {
    this.setState({minOverall: input})
  }
  handlePrice = (input) => {
    this.setState({minPrice: input})
  }
  handleQuality = (input) => {
    this.setState({minQuality: input})
  }
  handleClean = (input) => {
    this.setState({minClean: input})
  }

  searchLocations = async () => {

    const token = await AsyncStorage.getItem('@session_token');
    let url = 'http://10.0.2.2:3333/api/1.0.0/find?'

    if(this.state.searchInput != ''){
      url += 'q=' + this.state.searchInput + '&';
    }
    if(this.state.minOverall > 0){
      url += 'overall_rating=' + this.state.minOverall + '&'
    }
    if(this.state.minPrice > 0){
      url += 'price_rating=' + this.state.minPrice + '&'
    }
    if(this.state.minQuality > 0){
      url += 'quality_rating=' + this.state.minQuality + '&'
    }
    if(this.state.minClean > 0){
      url += 'clenliness_rating=' + this.state.minClean + '&'
    }

    try {
      return fetch(url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // eslint-disable-next-line no-dupe-keys
            'Content-Type': 'image/jpeg',
            'X-Authorization': token,
          },
        },
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then(async (responseJson) => {
          this.setState({
            locationList: responseJson,
            locationName: responseJson.location_name,
            hasSubmitted: true,
          });
        })
        .catch((error) => {
          console.error(error + 'ERROR 1');
        });
    } catch (e) {
      console.log(e + 'ERROR 2');
    }
  };

  goBack = () => {
    this.state.hasSubmitted = false;
    this.forceUpdate();
  };

  selectResultID = async (location_id) => {
    this.state.locationID = location_id;
    await AsyncStorage.setItem('@location_id', JSON.stringify(location_id));
    this.props.navigation.navigate('SearchResult');
  };


  overallSlider(){
    return(
      <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={5}
            value={this.state.minOverall}
            step={1}
            minimumTrackTintColor="#52e37b"
            maximumTrackTintColor="#000000"
            thumbTintColor="green"
            onValueChange={(value) => this.handleOverall(value)}
          />
    );
  }
  priceSlider(){
    return(
      <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={5}
            value={this.state.minPrice}
            step={1}
            minimumTrackTintColor="#52e37b"
            maximumTrackTintColor="#000000"
            thumbTintColor="green"
            onValueChange={(value) => this.handlePrice(value)}
          />
    );
  }
  qaulSlider(){
    return(
      <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={5}
            value={this.state.minQuality}
            step={1}
            minimumTrackTintColor="#52e37b"
            maximumTrackTintColor="#000000"
            thumbTintColor="green"
            onValueChange={(value) => this.handleQuality(value)}
          />
    );
  }
  cleanSlider(){
    return(
      <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={5}
            value={this.state.minClean}
            step={1}
            minimumTrackTintColor="#52e37b"
            maximumTrackTintColor="#000000"
            thumbTintColor="green"
            onValueChange={(value) => this.handleClean(value)}
          />
    );
  }

  renderCustomItem = ({ item, index }) => {
    return (
      <TouchableOpacity
      style={styles.flatlist}
      onPress={() => this.selectResultID(item.location_id)}>
        <View style={styles.resultsView}>
          <Text >{item.location_name}</Text>
          <Text>{item.location_town}</Text>   
        </View>
    </TouchableOpacity>
      );
    }

  keyExtractor = (item, index) => {
    index.toString()
  }

  LoadMoreData = () =>{
    this.setState({
    page:this.state.page+1
    },()=>this.searchLocations())
    }

  render() {
    //const nav = this.props.navigation;
    if (this.state.hasSubmitted === false) {
      return (
        <ScrollView>
          <View style={styles.flexContainer}>
            <Image
              style={styles.logo}
              source={require('../logos/Coffida1.png')}
            />

            <Text style={styles.text}> Enter your search in the box below: </Text>

            <TextInput
              style={styles.input}
              placeholder="Search:"
              onChangeText={this.handleInput}
              value={this.state.searchInput}
            />
            
            <Text>Minmum Overall Rating {this.state.minOverall}</Text>
            {this.overallSlider()}
            <Text>Minmum Price Rating {this.state.minPrice}</Text>
            {this.priceSlider()}
            <Text>Minmum Quality Rating {this.state.minQuality}</Text>
            {this.qaulSlider()}
            <Text>Minmum Cleanliness Rating {this.state.minClean}</Text>
            {this.cleanSlider()}


            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.searchLocations();
              }}>
              <Text style={styles.text}> Submit </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else if (this.state.hasSubmitted === true) {
      return (
          <View style={styles.flexContainer}>
            <TouchableOpacity style={styles.button} onPress={() => this.goBack()}>
              <Text style={styles.text}> Back </Text>
            </TouchableOpacity>

            <FlatList
              data={this.state.locationList}
              renderItem={this.renderCustomItem}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0}
              onEndReached={this.LoadMoreData}
              >
            </FlatList>
          </View>
      );
    }
  }
}

export default Search;
