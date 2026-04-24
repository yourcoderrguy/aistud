import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../../navigation/types';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<AuthNavigationProp>();
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (!email.trim()) {
      Alert.alert("Required", "Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Invalid Format", "Please enter a valid email address.");
      return;
    }
    navigation.navigate('VerifyCode', { email: email.trim() });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: 'center' }}>
          
          <View className="items-center justify-center pt-2 pb-6">
            <Text className="text-[18px] font-extrabold text-[#008080] tracking-wide">AiStud</Text>
          </View>

          {/* Progress Indicator (Step 1 Active) */}
          <View className="flex-row justify-between mb-10 w-full">
            <View className="flex-1 h-[3px] bg-[#008080] rounded-full mr-2" />
            <View className="flex-1 h-[3px] bg-[#B2D8D8] rounded-full mx-2" />
            <View className="flex-1 h-[3px] bg-[#B2D8D8] rounded-full ml-2" />
          </View>

          <View className="items-center mb-8">
            <Text className="text-[24px] font-extrabold text-black mb-2">Forgot password?</Text>
            <Text className="text-[14px] text-gray-500 font-medium text-center">No worries, we'll send you reset instructions</Text>
          </View>

          <View className="mb-6">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="enter your email address"
              placeholderTextColor="#A0AEC0"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="w-full bg-white h-[48px] px-4 rounded-xl border border-gray-300 text-[14px] text-black"
            />
          </View>

          <TouchableOpacity onPress={handleReset} activeOpacity={0.8} className="w-full bg-[#008080] h-[48px] rounded-xl items-center justify-center mb-8 shadow-sm">
            <Text className="text-white font-bold text-[15px]">Reset Password</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="flex-row items-center justify-center py-2">
            <Ionicons name="arrow-back" size={18} color="#000" className="mr-2" />
            <Text className="text-black font-semibold text-[14px]">Back to Login</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}