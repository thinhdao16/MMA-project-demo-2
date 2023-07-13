import React from 'react';
import {Image} from 'react-native';
import {Avatar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Discover from '../views/Discover/Discover';
import Search from '../views/Search/Search';

import AccountScreen from './AccountScreen';
import HomeScreen from './HomeScreen';
import StoreScreen from './StoreScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../views/context/AuthContext';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const {userProfile} = React.useContext(AuthContext)
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'HomeScreen') {
            return focused ? (
              <Foundation name="home" size={32} color="white" />
            ) : (
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                style={{width: 25, height: 25}}
              />
            );
          }
          if (route.name === 'Search') {
            return <Feather name="search" size={28} color="white" />;
          }
          if (route.name === 'Discover') {
            return (
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                style={{width: 25, height: 25}}
              />
            );
          }
          if (route.name === 'StoreScreen') {
            return <Feather name="shopping-bag" size={28} color="white" />;
          }
          if (route.name === 'AccountScreen') {
            return (
              <Avatar.Image
                size={28}
                source={{ uri: userProfile?.img }}
              />
            );
          }
        },
        tabBarStyle: {backgroundColor: 'black'},
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="StoreScreen" component={StoreScreen} />
      <Tab.Screen name="AccountScreen" component={AccountScreen} />
    </Tab.Navigator>
  );
};
export default BottomTab;
