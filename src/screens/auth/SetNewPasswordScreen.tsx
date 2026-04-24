import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../../navigation/types';

export default function SetNewPasswordScreen() {
  const navigation = useNavigation<AuthNavigationProp>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = () => {
    Keyboard.dismiss(); // Dismiss keyboard on submit
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    Alert.alert("Success", "Password reset successfully!", [
      { text: "Login", onPress: () => navigation.navigate('Login') }
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          keyboardShouldPersistTaps="handled" // <--- THE CRITICAL BUG FIX
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: 'center' }}
        >
          
          <View className="items-center justify-center pt-2 pb-6">
            <Text className="text-[18px] font-extrabold text-[#008080]">AiStud</Text>
          </View>

          {/* 3-Step Progress Indicator (Step 3 - ALL ACTIVE) */}
          <View className="flex-row justify-between mb-10 w-full">
            <View className="flex-1 h-[3px] bg-[#008080] rounded-full mr-2" />
            <View className="flex-1 h-[3px] bg-[#008080] rounded-full mx-2" />
            <View className="flex-1 h-[3px] bg-[#008080] rounded-full ml-2" />
          </View>

          <View className="items-center mb-8">
            <Text className="text-[24px] font-extrabold text-black mb-2">Set new password</Text>
            <Text className="text-[13px] text-gray-500 font-medium">Must be at least 8 characters</Text>
          </View>

          <View className="bg-[#F0FAFA] p-4 rounded-xl mb-8">
            <Text className="text-[13px] font-semibold text-black mb-1.5">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="password"
              placeholderTextColor="#A0AEC0"
              secureTextEntry
              className="bg-white h-[44px] px-3 rounded-lg border border-gray-200 text-[13px] mb-4 text-black"
            />
            <Text className="text-[13px] font-semibold text-black mb-1.5">Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="confirm password"
              placeholderTextColor="#A0AEC0"
              secureTextEntry
              className="bg-white h-[44px] px-3 rounded-lg border border-gray-200 text-[13px] text-black"
            />
          </View>

          <TouchableOpacity onPress={handleReset} activeOpacity={0.8} className="w-full bg-[#008080] h-[48px] rounded-xl items-center justify-center mb-8 shadow-sm">
            <Text className="text-white font-bold text-[15px]">Reset Password</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} className="flex-row items-center justify-center">
            <Ionicons name="arrow-back" size={18} color="#000" />
            <Text className="text-black font-semibold text-[14px] ml-2">Back to Login</Text>
          </TouchableOpacity>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}