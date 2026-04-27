import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import AuthStack from './src/navigation/AuthStack';
import MainStack from './src/navigation/MainStack';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Hold the UI until we know for sure if the user is logged in
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#FAFAFA]">
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  return isAuthenticated ? <MainStack /> : <AuthStack />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="transparent" />
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}