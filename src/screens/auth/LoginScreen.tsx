import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar'; 
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../../navigation/types';

// Global State and Utilities
import { useAuth } from '../../context/AuthContext'; 
import { isValidEmail } from '../../utils/validators';

export default function LoginScreen() {
  const navigation = useNavigation<AuthNavigationProp>();
  const { login } = useAuth(); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // NEW: State to hold validation errors
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    Keyboard.dismiss();
    setError('');

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // SIMULATED API CALL: Replace with actual Supabase Auth later
      // We await this because we upgraded context to use AsyncStorage
      await login({ 
        fullName: 'Precious', // Default mockup name until Supabase is active
        email: email.trim().toLowerCase() 
      });
    } catch (e) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" backgroundColor="transparent" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            keyboardShouldPersistTaps="handled" 
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: 'center' }}
          >
            
            {/* Header */}
            <View className="items-center justify-center pt-2 pb-8">
              <Text className="text-[18px] font-extrabold text-[#008080] tracking-wide">AiStud</Text>
            </View>

            <Text className="text-[24px] font-extrabold text-black mb-1">Login</Text>
            <Text className="text-[13px] text-gray-500 mb-6 font-medium">Please login to continue</Text>

            {/* Error Message Box */}
            {error ? (
              <View className="bg-red-50 p-3 rounded-xl mb-4 border border-red-100">
                <Text className="text-red-500 text-[13px] font-medium text-center">{error}</Text>
              </View>
            ) : null}

            {/* Form Area */}
            <View className="bg-[#F0FAFA] p-4 rounded-xl mb-3 border border-[#E6F2F2]">
              <Text className="text-[13px] font-semibold text-black mb-1.5">Email</Text>
              <TextInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError(''); // Clear error when user types
                }}
                placeholder="test@student.edu"
                placeholderTextColor="#A0AEC0"
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-white h-[44px] px-3 rounded-lg border border-gray-200 text-[13px] mb-4 text-black"
              />

              <Text className="text-[13px] font-semibold text-black mb-1.5">Password</Text>
              <View className="bg-white h-[44px] rounded-lg border border-gray-200 flex-row items-center px-3">
                <TextInput
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (error) setError('');
                  }}
                  placeholder="password"
                  placeholderTextColor="#A0AEC0"
                  secureTextEntry={!showPassword}
                  className="flex-1 text-[13px] text-black h-full"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-1">
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={18} color="#A0AEC0" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="self-end mb-8" onPress={() => navigation.navigate('ForgotPassword')}>
              <Text className="text-[#008080] font-semibold text-[13px]">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity 
              onPress={handleLogin} 
              activeOpacity={0.8} 
              disabled={isSubmitting}
              className={`w-full h-[48px] rounded-xl items-center justify-center mb-6 shadow-sm ${
                isSubmitting ? 'bg-[#008080]/70' : 'bg-[#008080]'
              }`}
            >
              <Text className="text-white font-bold text-[15px]">
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center justify-center mb-6">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="mx-3 text-gray-400 text-[12px] font-medium uppercase tracking-wider">or sign in with</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            {/* Google Button */}
            <TouchableOpacity 
              activeOpacity={0.7} 
              className="w-full h-[48px] bg-white border border-gray-200 shadow-sm rounded-xl flex-row items-center justify-center mb-8"
            >
              <Ionicons name="logo-google" size={18} color="#000" className="mr-2" />
              <Text className="text-black font-bold text-[14px]">Continue with Google</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View className="flex-row items-center justify-center mb-4">
              <Text className="text-gray-500 text-[13px] font-medium">Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text className="text-[#008080] font-bold text-[13px]">Sign Up</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}