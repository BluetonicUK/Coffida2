import React, { Component } from 'react';
import { Text, View, Div, TouchableOpacity, Image } from 'react-native';
import styles from './stylesheet'
import { createStackNavigator } from '@react-navigation/stack';
//import UserHome from './user_home';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

class SearchResults extends React.Component{


    constructor(props){
        super(props);

            
        }
    render(){


    return(
        <View style={styles.flexContainer}>

            <Image style={styles.logo} source={require('../logos/Coffida1.png')} />

            <Text> BOOOOOOOOOOO</Text>
            <Text>{this.props.dataFromParent}</Text>

            
        </View>

    );
    
  }
}

export default SearchResults;