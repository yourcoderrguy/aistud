import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar'; 
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../../navigation/types';

// 1. Import our custom hook
import { useAuth } from '../../context/AuthContext'; 

export default function LoginScreen() {
  const navigation = useNavigation<AuthNavigationProp>();
  
  // 2. Grab the login function from global state
  const { login } = useAuth(); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    
    // HARDCODED PROTOTYPE LOGIC
    if (email.trim().toLowerCase() === 'test@gmail.com' && password === 'Precious@2026') {
      // Pass the user data dynamically into the global state!
      login({ 
        fullName: 'Precious', 
        email: 'test@gmail.com' 
      });
    } else {
      Alert.alert("Invalid Credentials", "Incorrect email or password.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" backgroundColor="transparent" />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: 'center' }}>
          
          <View className="items-center justify-center pt-2 pb-8">
            <Text className="text-[18px] font-extrabold text-[#008080] tracking-wide">AiStud</Text>
          </View>

          <Text className="text-[24px] font-extrabold text-black mb-1">Login</Text>
          <Text className="text-[13px] text-gray-500 mb-6 font-medium">Please login to continue</Text>

          <View className="bg-[#F0FAFA] p-4 rounded-xl mb-3">
            
            <Text className="text-[13px] font-semibold text-black mb-1.5">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="test@gmail.com"
              placeholderTextColor="#A0AEC0"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-white h-[44px] px-3 rounded-lg border border-gray-200 text-[13px] mb-4 text-black"
            />

            <Text className="text-[13px] font-semibold text-black mb-1.5">Password</Text>
            <View className="bg-white h-[44px] rounded-lg border border-gray-200 flex-row items-center px-3">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="password"
                placeholderTextColor="#A0AEC0"
                secureTextEntry={!showPassword}
                className="flex-1 text-[13px] text-black h-full"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={18} color="#A0AEC0" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity className="self-end mb-8" onPress={() => navigation.navigate('ForgotPassword')}>
            <Text className="text-[#008080] font-semibold text-[13px]">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} activeOpacity={0.8} className="w-full bg-[#008080] h-[48px] rounded-xl items-center justify-center mb-6 shadow-sm">
            <Text className="text-white font-bold text-[15px]">Sign In</Text>
          </TouchableOpacity>

          <View className="flex-row items-center justify-center mb-6">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-3 text-gray-500 text-[12px] font-medium">or sign in with</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          <TouchableOpacity activeOpacity={0.7} className="w-full h-[48px] bg-white border border-[#008080] rounded-xl flex-row items-center justify-center mb-6">
            <Ionicons name="logo-google" size={18} color="#000" className="mr-2" />
            <Text className="text-black font-semibold text-[15px]">Google</Text>
          </TouchableOpacity>

          <View className="flex-row items-center justify-center">
            <Text className="text-gray-500 text-[13px] font-medium">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text className="text-[#008080] font-bold text-[13px]">Sign Up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}