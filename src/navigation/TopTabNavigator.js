import React from 'react';
import {Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ProfilPost from '../views/ProfilPost/ProfilPost';
import Reels from '../views/ProfilReels/ProfilReels';
import Tag from '../views/Tag/Tag';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          if (route.name === 'ProfilPost') {
            return <Image style={{  width: 35,
              height: 35,
              borderRadius: 100,
              marginLeft: 10,
              marginRight:7}}  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} />;
          }
          if (route.name === 'ProfilReels') {
            return <Image style={{  width: 35,
              height: 35,
              borderRadius: 100,
              marginLeft: 10,
              marginRight:7}}  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} />;
          }
          if (route.name === 'Tag') {
            return <Image style={{  width: 35,
              height: 35,
              borderRadius: 100,
              marginLeft: 10,
              marginRight:7}}  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} />;
          }
        },
        tabBarIndicatorStyle: {backgroundColor: 'white', height: 2},
        tabBarLabel: '',
        tabBarStyle: {
          backgroundColor: 'black',
        },
      })}>
      <Tab.Screen name="ProfilPost" component={ProfilPost} />
      <Tab.Screen name="ProfilReels" component={Reels} />
      <Tab.Screen name="Tag" component={Tag} />
    </Tab.Navigator>
  );
};
export default TopTabNavigator;
