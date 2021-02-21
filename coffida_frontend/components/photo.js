import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';

class Photo extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          displayImage: true,
          locId: 0,
          RevID: 0,
      };
    }
    
    onErrorLoadingImage =  () => {
        this.setState({displayImage: false})
     }
   
    componentDidMount(){
        this.setState({locID: this.props.location_id,
                        revID: this.props.review_id})
    }
    deletePhoto = async () => {
      const token = await AsyncStorage.getItem('@session_token');
      return fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' + this.state.locID
                  + '/review/' + this.state.revID + '/photo/',
        {
          method: 'DELETE',
          headers: {
            
            'Content-Type': 'application/json',
            'Content-Type': 'image/jpeg',
            'X-Authorization': token,
          },
        },
      )
        .then((response) => {
          if (response.status === 200) {
            ToastAndroid.show(
              'Photo Deleted',
              ToastAndroid.SHORT,
            );
            this.setState({displayImage: false})
            this.render();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    render = () => {
        return(
        this.state.displayImage ? (
          <View style={{alignItems: 'center'}}>
            <Image 
              style={{width: 300, height: 300}}
              source={{uri: 
                'http://10.0.2.2:3333/api/1.0.0/location/' + this.state.locID
                + '/review/' + this.state.revID + '/photo/' 
              }}
              onError={this.onErrorLoadingImage}
            />
            <TouchableOpacity onPress={() => this.deletePhoto()}>
              <Text style={{textAlign: 'center', textDecorationLine: 'underline', color: 'red'}}>Delete Photo</Text>
            </TouchableOpacity>
          </View>               
              ) : ( <Text></Text> )
        )
    };
  }
  
  export default Photo;