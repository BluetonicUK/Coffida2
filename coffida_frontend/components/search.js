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
import styles from './stylesheet';

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
      avgOverall: 0,
      avgPrice: 0,
      avgQuality: 0,
      acvClean: 0,
      shop_reviews: [],
    };
  }

  handleInput = (input) => {
    this.setState({searchInput: input});
  };

  searchLocations = async () => {
    const token = await AsyncStorage.getItem('@session_token');

    try {
      return fetch(
        'http://10.0.2.2:3333/api/1.0.0/find?q=' + this.state.searchInput,
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

  render() {
    //const nav = this.props.navigation;
    if (this.state.hasSubmitted === false) {
      return (
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

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.searchLocations();
            }}>
            <Text style={styles.text}> Submit </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.hasSubmitted === true) {
      return (
        <View style={styles.flexContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.goBack()}>
            <Text style={styles.text}> Back </Text>
          </TouchableOpacity>

          <FlatList
            data={this.state.locationList}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.flatlist}
                onPress={() => this.selectResultID(item.location_id)}>
                <Text style={{textAlign: 'center'}}>
                  {item.location_name}, {item.location_town}, {item.location_id}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(temp, index) => index.toString()}
          />
        </View>
      );
    }
  }
}

export default Search;
