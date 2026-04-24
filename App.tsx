import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import AuthStack from './src/navigation/AuthStack';
import MainStack from './src/navigation/MainStack';
import { AuthProvider, useAuth } from './src/context/AuthContext';

// This acts as the traffic controller. 
// If logged in -> show Dashboard. If not -> show Login.
const RootNavigator = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <MainStack /> : <AuthStack />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="transparent" />
      {/* Wrap the app in the AuthProvider so every screen can access the state */}
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}