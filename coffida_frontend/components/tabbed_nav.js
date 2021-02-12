import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Account from './account';
import Search from './search';
import MyLocations from './my_locations';
import ReviewsHome from './reviews_home';

const Tab = createBottomTabNavigator();

class TabbedNav extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    //const nav = this.props.navigation;

    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Account') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Reviews') {
              iconName = focused ? 'cafe' : 'cafe-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#1dab40',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Account" component={Account} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Reviews" component={ReviewsHome} />
      </Tab.Navigator>
    );
  }
}

export default TabbedNav;
