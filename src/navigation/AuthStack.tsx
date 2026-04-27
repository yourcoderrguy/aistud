import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/auth/OnboardingScreen'; 
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen'; // <-- 1. Uncommented the import

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator 
      initialRouteName="Onboarding" 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      
      {/* 2. Uncommented the actual route */}
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> 
    </Stack.Navigator>
  );
}