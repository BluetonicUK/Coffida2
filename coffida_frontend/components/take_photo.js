/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
import React, {Component} from 'react';
import {View, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {RNCamera} from 'react-native-camera';
import {Button} from 'react-native-paper';
import styles from './stylesheet';

class TakePhoto extends Component {
  takePicture = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const review_id = await AsyncStorage.getItem('@review_id');
    const locId = await AsyncStorage.getItem('@loc_review_id');

    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);

      return fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          locId +
          '/review/' +
          review_id +
          '/photo', // ?timestamp=' + Date.now(),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'image/jpeg',
            'X-Authorization': token,
          },
          body: data,
        },
      )
        .then((response) => {
          if (response.status === 200) {
            ToastAndroid.show('Picture Added', ToastAndroid.SHORT);
            this.props.navigation.navigate('Search');
          } else {
            ToastAndroid.show(
              JSON.stringify(response.status),
              ToastAndroid.SHORT,
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <View style={styles.test}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.camera}
        />
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <Button
            icon="camera"
            mode="contained"
            style={styles.mapButton}
            onPress={() => this.takePicture()}>
            Take Photo
          </Button>
        </View>
      </View>
    );
  }
}

export default TakePhoto;
