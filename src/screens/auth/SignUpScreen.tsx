import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../../navigation/types';

export default function SignUpScreen() {
  const navigation = useNavigation<AuthNavigationProp>();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignUp = () => {
    if (!agreeTerms) {
      alert("You must agree to the Terms & Conditions");
      return;
    }
    // Route to OTP Verify screen
    navigation.navigate('VerifyCode', { email: email || 'user@example.com' });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: 'center' }}
        >
          
          {/* Top Logo */}
          <View className="items-center justify-center pt-2 pb-6">
            <Text className="text-[18px] font-extrabold text-[#008080] tracking-wide">AiStud</Text>
          </View>

          {/* Header Typography */}
          <Text className="text-[24px] font-extrabold text-black mb-1">Sign Up</Text>
          <Text className="text-[13px] text-gray-500 mb-5 font-medium">
            Fill the information to create your profile
          </Text>

          {/* Form Container */}
          <View className="bg-[#F0FAFA] p-4 rounded-xl mb-4">
            
            {/* Full Name */}
            <Text className="text-[13px] font-semibold text-black mb-1.5">Full Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="fullname"
              placeholderTextColor="#A0AEC0"
              className="bg-white h-[44px] px-3 rounded-lg border border-gray-200 text-[13px] mb-3 text-black"
            />

            {/* Email */}
            <Text className="text-[13px] font-semibold text-black mb-1.5">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="email"
              placeholderTextColor="#A0AEC0"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-white h-[44px] px-3 rounded-lg border border-gray-200 text-[13px] mb-3 text-black"
            />

            {/* Password */}
            <Text className="text-[13px] font-semibold text-black mb-1.5">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="password"
              placeholderTextColor="#A0AEC0"
              secureTextEntry
              className="bg-white h-[44px] px-3 rounded-lg border border-gray-200 text-[13px] mb-3 text-black"
            />

            {/* Confirm Password */}
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

          {/* Terms & Conditions Checkbox */}
          <View className="flex-row items-center mb-6 px-1">
            <TouchableOpacity 
              onPress={() => setAgreeTerms(!agreeTerms)}
              className={`w-5 h-5 rounded border items-center justify-center mr-2.5 ${agreeTerms ? 'bg-[#008080] border-[#008080]' : 'border-black'}`}
            >
              {agreeTerms && <Ionicons name="checkmark" size={14} color="white" />}
            </TouchableOpacity>
            <Text className="text-[13px] text-black font-medium">
              Agree with <Text className="text-[#008080]">Terms & Condition</Text>
            </Text>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity 
            onPress={handleSignUp}
            activeOpacity={0.8}
            className="w-full bg-[#008080] h-[48px] rounded-xl items-center justify-center mb-6 shadow-sm"
          >
            <Text className="text-white font-bold text-[15px]">Sign Up</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center justify-center mb-6">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-3 text-gray-500 text-[12px] font-medium">or sign up with</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          {/* Google Button */}
          <TouchableOpacity 
            activeOpacity={0.7}
            className="w-full h-[48px] bg-white border border-[#008080] rounded-xl flex-row items-center justify-center mb-6"
          >
            <Ionicons name="logo-google" size={18} color="#000" className="mr-2" />
            <Text className="text-black font-semibold text-[15px]">Google</Text>
          </TouchableOpacity>

          {/* Missing UX Link: Route back to Login */}
          <View className="flex-row items-center justify-center pb-4">
            <Text className="text-gray-500 text-[13px] font-medium">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
              <Text className="text-[#008080] font-bold text-[13px]">Login</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}