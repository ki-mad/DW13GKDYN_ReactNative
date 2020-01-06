import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/screens/Home'
import Category from './src/screens/Category'
import DetailEvent from './src/screens/DetailEvent'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'DumbTick'
    }
  },
  Category: {
    screen: Category,
    navigationOptions: {
      title: 'Category'
    }
  },
  DetailEvent: {
    screen: DetailEvent,
    navigationOptions: {
      title: 'Detail Event'
    }
  },
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#FF5555',
    },
    headerTintColor: "#FFFFFF",
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default createAppContainer(AppNavigator);

