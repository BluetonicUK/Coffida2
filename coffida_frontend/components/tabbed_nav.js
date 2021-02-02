import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Icon from 'react-native-ionicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
//import { Icon } from 'react-native-elements'
import styles from './stylesheet'
import Account from './account';
import Search from './search';



const Tab = createBottomTabNavigator();

class TabbedNav extends Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

  render(){

    //const nav = this.props.navigation;


    return(

            <Tab.Navigator 

                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Account') {
                        iconName = focused ? "person" : "person-outline";
                    }
                     else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                    }
                    else if (route.name === 'Coffee') {
                        iconName = focused ? 'cafe' : 'cafe-outline';
                    }
        
                    //You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                     //return <Icon android="md-add" size={30} color='blue' />;

                     },
                })}
                tabBarOptions={{
                    activeTintColor: '#1dab40',
                    inactiveTintColor: 'gray',
                }}
                
            >
                
                <Tab.Screen name="Account" component={Account} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Coffee" component={Account} />
            </Tab.Navigator>

    );
  }
}

export default TabbedNav;