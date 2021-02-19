import React, {Component} from 'react';
import {
  Text,
  Image,
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
    render = () => {
        return(
        this.state.displayImage ? (
            <Image 
              style={{width: 300, height: 300}}
              source={{uri: 
                'http://10.0.2.2:3333/api/1.0.0/location/' + this.state.locID
                + '/review/' + this.state.revID + '/photo/' 
              }}
              onError={this.onErrorLoadingImage}
            />                  
              ) : ( <Text>No Image</Text> )
        )
    };
  }
  
  export default Photo;