import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Cart from './Cart';
import Wishlist from './Wishlist';
import Home from './Home';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialBottomTabNavigator();

const Dashboard = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#d4e4d6"
      barStyle={{backgroundColor: '#915986', height: 70}}
      tabBarOptions={{
        showLabel: false,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
            size = focused ? 25 : 20;
          } else if (route.name === 'Wishlist') {
            iconName = 'heart';
            size = focused ? 25 : 20;
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
            size = focused ? 25 : 20;
          }
          return <Icon name={iconName} size={size} color="#4b2f46" />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
};

export default Dashboard;
