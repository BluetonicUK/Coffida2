/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View, Button} from 'react-native';
import TabbedNav from './components/tabbed_nav';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import MyLocations from './components/my_locations';
import EditDetails from './components/edit_details';
import Logout from './components/logout';
import SearchResult from './components/search_result';
import AddReview from './components/add_review';
import EditReview from './components/edit_review';
import ReviewsHome from './components/reviews_home';
import Favourites from './components/my_favourites';
import MyReviews from './components/my_reviews';
import MyLikedReviews from './components/my_liked_reviews';
import Map from './components/map';
import TakePhoto from './components/take_photo';

const Stack = createStackNavigator();

class App extends Component {
  static navigationOptions = {header: null};

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
          <Stack.Screen
            name="TabbedNav"
            component={TabbedNav}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyLocations"
            component={MyLocations}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
          <Stack.Screen
            name="EditDetails"
            component={EditDetails}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
          <Stack.Screen
            name="Logout"
            component={Logout}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
          <Stack.Screen
            name="SearchResult"
            component={SearchResult}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
          <Stack.Screen
            name="Add Review"
            component={AddReview}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
          <Stack.Screen
            name="Edit Review"
            component={EditReview}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
          <Stack.Screen
            name="Reviews Home"
            component={ReviewsHome}
            options={{
              headerShown: false,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
          <Stack.Screen
            name="Favourites"
            component={Favourites}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
          <Stack.Screen
            name="My Reviews"
            component={MyReviews}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
          <Stack.Screen
            name="My Liked Reviews"
            component={MyLikedReviews}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
          <Stack.Screen
            name="Camera"
            component={TakePhoto}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#52e37b'},
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
