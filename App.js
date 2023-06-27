import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation/Router';
// import { AuthContextProvider } from './src/views/context/AuthContext';
import 'expo-dev-client';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <AuthContextProvider> */}
      <StatusBar backgroundColor="black" />
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      {/* </AuthContextProvider> */}
    </SafeAreaProvider>
  );
}