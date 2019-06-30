import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import MetricsScreen from './screens/MetricsScreen'
import CommandScreen from './screens/CommandScreen'
import UserScreen from './screens/UserScreen'

const HomeTab = createStackNavigator({
  Home: HomeScreen,
  },
  {
    defaultNavigationOptions:{
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff',
      title: 'Atlantis',
    },
  }
);

const MetricTab = createStackNavigator({
  Metrics: MetricsScreen,
},
{
  defaultNavigationOptions:{
    headerStyle: {
      backgroundColor: '#0091EA',
    },
    headerTintColor: '#fff',
    title: 'Atlantis - Show metrics',
  },
});

const CommandTab = createStackNavigator({
  Command: CommandScreen,
},
{
  defaultNavigationOptions:{
    headerStyle: {
      backgroundColor: '#0091EA',
    },
    headerTintColor: '#fff',
    title: 'Atlantis - Send command',
  },
}
);

const UserTab = createStackNavigator({
  User: UserScreen,
},
{
  defaultNavigationOptions:{
    headerStyle: {
      backgroundColor: '#0091EA',
    },
    headerTintColor: '#fff',
    title: 'Atlantis - SignIn/Register',
  },
}
);

const MainApp = createBottomTabNavigator(
  {
    Home: HomeTab,
    Metric: MetricTab,
    Command: CommandTab,
    User: UserTab
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return (
            <Image
              source={ require('./assets/home.png') }
              style={{ width: 20, height: 20, }} />
          );
        } if(routeName === 'Metric') {
          return (
            <Image
              source={ require('./assets/metrics.png') }
              style={{ width: 20, height: 20 }} />
          );
        } if(routeName === 'Command'){
          return (
            <Image
              source={ require('./assets/tap.png') }
              style={{ width: 20, height: 20 }} />
          );
        } if(routeName === 'User'){
          return (
            <Image
              source={ require('./assets/man-user.png') }
              style={{ width: 20, height: 20 }} />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  }
);

export default createAppContainer(MainApp);
