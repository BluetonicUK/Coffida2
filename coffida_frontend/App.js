

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, Button } from 'react-native';
import TabbedNav from './components/tabbed_nav';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import MyLocations from './components/my_locations';
import EditDetails from './components/edit_details';



//const nav = this.props.navigation

//const Stack = createStackNavigator();

const Stack = createStackNavigator();

class App extends Component{

  static navigationOptions = { header: null }

  render(){

    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
          <Stack.Screen name="TabbedNav" component={TabbedNav} options={{headerShown: false}} />
          <Stack.Screen name="MyLocations" component={MyLocations} options={{headerShown: true}} />
          <Stack.Screen name="EditDetails" component={EditDetails} options={{headerShown: true}} />
        </Stack.Navigator>        
      </NavigationContainer>  
    );
  }
}



export default App;
