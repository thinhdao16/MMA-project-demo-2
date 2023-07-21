import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Store from '../views/Store/Store';
import StoreAuction from '../views/Store/StoreAuction';
import StoreSelect from '../views/Store/StoreSelect';

const Stack = createNativeStackNavigator();

const StoreScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen name="StoreSelect" component={StoreSelect} />
      <Stack.Screen name="StoreAuction" component={StoreAuction} />
    </Stack.Navigator>
  );
};
export default StoreScreen;
