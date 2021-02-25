/* eslint-disable prefer-template */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */

import React, {Component} from 'react';
import {Text, View, Dimensions, Alert, PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

async function requestLocationPermission() {
  // eslint-disable-next-line no-useless-catch
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {},
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('SUCCESS LOCATION GRANTED');
      return true;
    }
    console.log('Permission denied');
    return false;
  } catch (e) {
    throw e;
  }
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      locationPermission: false,
      cafe_name: '',
      latLong: {
        latitude: 0,
        longitude: 0,
      },
      myLatLong: {
        latitude: 0,
        longitude: 0,
      },
      distance: 0,
      duration: 0,
    };
  }

  getCoordinates = () => {
    if (!this.state.locationPermission) {
      // eslint-disable-next-line no-undef
      this.state.locationPermission = requestLocationPermission();
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const location = JSON.stringify(position);
        const json = JSON.parse(location);
        this.setState({location});
        console.log(location);
        console.log(json.coords.longitude);
        this.setState({
          myLatLong: {
            latitude: json.coords.latitude,
            longitude: json.coords.longitude,
          },
        });
      },
      (error) => {
        Alert.alert(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 100,
      },
    );
  };

  getShopCoords = async () => {
    const lat = await AsyncStorage.getItem('@latitude');
    const long = await AsyncStorage.getItem('@longitude');
    const CafeName = await AsyncStorage.getItem('@cafe_name');
    // console.log('LATITUDE: ' + lat);
    // console.log('LONGITUDE: ' + long);
    this.setState({
      cafe_name: CafeName,
      latLong: {
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
      },
    });
  };

  componentDidMount() {
    this.getCoordinates();
    this.getShopCoords();
    this.returnAverageLat();
    this.returnAverageLong();
  }

  returnAverageLat = () => {
    const avgLat =
      (this.state.latLong.latitude + this.state.myLatLong.latitude) / 2;
    console.log('CAFE LAT: ' + this.state.latLong.latitude);
    console.log('MY LAT: ' + this.state.myLatLong.latitude);
    console.log('inbetween' + avgLat);
    return avgLat;
  };
  returnAverageLong = () => {
    const avgLong =
      (this.state.latLong.longitude + this.state.myLatLong.longitude) / 2;
    return avgLong;
  };
  returnDistDur = (distance, duration) => {
    this.setState({
      distance,
      duration,
    });
  };

  render() {
    // const { width, height } = Dimensions.get('window');
    // const ASPECT_RATIO = width / height;
    // const LATITUDE_DELTA = 0.0922;
    // const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    return (
      <View style={{width: '100%', height: '93%'}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{width: '100%', height: '100%'}}
          region={{
            latitude: this.returnAverageLat(),
            longitude: this.returnAverageLong(),
            latitudeDelta: 0.8,
            longitudeDelta: 0.8,
          }}>
          <Marker
            coordinate={this.state.latLong}
            style={{flex: 1}}
            title={this.state.cafe_name}
            description="Destination"
          />
          <Marker
            coordinate={this.state.myLatLong}
            style={{flex: 1}}
            title="My Location"
            description="Me"
          />
          <MapViewDirections
            origin={this.state.myLatLong}
            destination={this.state.latLong}
            apikey="AIzaSyA4AJvYcXr-IccM6-ASoT6Uo-ugfHpwero"
            strokeWidth={3}
            strokeColor="hotpink"
            // onStart={(params) => {
            //   console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            // }}
            onReady={(result) => {
              this.returnDistDur(result.distance, result.duration);
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);
            }}
          />
        </MapView>
        <View style={{backgroundColor: '#52e37b', paddingVertical: 5}}>
          <Text style={{textAlign: 'center'}}>
            Distance: {this.state.distance.toFixed(2) + ' Km\n'}
            Duration: {this.state.duration.toFixed(2) + ' minutes'}
          </Text>
        </View>
      </View>
    );
  }
}

export default Map;
