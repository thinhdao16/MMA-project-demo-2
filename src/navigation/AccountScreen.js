import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Account from '../views/Account/Account';
import SinglePost from '../views/ProfilPost/SinglePost';
import Settings from '../views/Settings/Settings';
import ScreenBill from '../components/AccountComponents/ScreenBill';


const AccountScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="SinglePost" component={SinglePost} />
      <Stack.Screen name="ScreenBill" component={ScreenBill} />



    </Stack.Navigator>
  );
};
export default AccountScreen;
