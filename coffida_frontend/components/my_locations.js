import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './stylesheet'


class MyLocations extends Component{


    constructor(props){
        super(props);

        this.state = {
          myFavouriteLocations: []
        }
    }

    //methods here etc - need to get json data etc

  render(){

    const nav = this.props.navigation; 

    return(

        <View style={styles.flexContainer}>
            <Text style={styles.text2}> LIST OF LOCATIONS</Text>            
        </View>

    );
    
  }
}

export default MyLocations;