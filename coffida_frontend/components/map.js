import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import styles from './stylesheet';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {},
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('SUCCESS LOCATION GRANTED');
      return true;
    } else {
      console.log('Permission denied');
      return false;
    }
  } catch (e) {
    console.log(e);
  }
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      locationPermission: false,
      latLong: {
        latitude: 0,
        longitude: 0,
      },
      myLatLong: {
        latitude: 0,
        longitude: 0,
      },
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

        this.setState({
          myLatLong: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
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
    console.log('LATITUDE: ' + lat);
    console.log('LONGITUDE: ' + long);
    this.setState({
      latLong: {
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
      },
    });
  };

  componentDidMount() {
    this.getCoordinates();
    this.getShopCoords();
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{width: '100%', height: '100%'}}
          region={{
            latitude: this.state.latLong.latitude,
            longitude: this.state.latLong.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}>
          <Marker
            coordinate={this.state.latLong}
            style={{flex: 1}}
            title="Cafe Location"
            description="Get to fuck"
          />
        </MapView>
      </View>
    );
  }
}

export default Map;
