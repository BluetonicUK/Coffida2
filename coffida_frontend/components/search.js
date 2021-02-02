import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import styles from './stylesheet'
import { createStackNavigator } from '@react-navigation/stack';
//import UserHome from './user_home';
import { ScrollView } from 'react-native-gesture-handler';

class Search extends Component{


    constructor(props){
        super(props);

        this.state = {
            searchInput: ''
        }
    }

    //methods here etc - need to get json data etc


    handleInput = (input) => {
        this.setState({searchInput: input});
    }

    render(){

    //const nav = this.props.navigation; 

    return(
        <View style={styles.flexContainer}>
            <Text style={styles.text2}> Enter your search in the box below: </Text>

            <TextInput style={styles.input} 
                placeholder='Search:' 
                onChangeText={this.handleInput}
                value={this.state.searchInput} />

            <TouchableOpacity style={styles.button2}>
                <Text style={styles.text2}> Submit </Text>
            </TouchableOpacity>

            
        </View>

    );
    
  }
}

export default Search;