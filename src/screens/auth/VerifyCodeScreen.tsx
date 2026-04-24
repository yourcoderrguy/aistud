import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Keyboard
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthNavigationProp, AuthStackParamList } from '../../navigation/types';

type VerifyCodeRouteProp = RouteProp<AuthStackParamList, 'VerifyCode'>;

export default function VerifyCodeScreen() {
  const navigation = useNavigation<AuthNavigationProp>();
  const route = useRoute<VerifyCodeRouteProp>();
  const userEmail = route.params?.email || 'user@email.com';

  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code];
    const cleanText = text.replace(/[^0-9]/g, '');
    newCode[index] = cleanText;
    setCode(newCode);

    // Auto-focus next input
    if (cleanText && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // AUTO-SUBMIT LOGIC: If the 4th digit is entered, automatically route
    if (cleanText && index === 3) {
      const finalCode = newCode.join('');
      if (finalCode.length === 4) {
        Keyboard.dismiss(); // Hide keyboard smoothly
        setTimeout(() => {
          navigation.navigate('SetNewPassword', { email: userEmail });
        }, 150); // Tiny delay for smooth UX transition
      }
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const finalCode = code.join('');
    if (finalCode.length < 4) {
      alert("Please enter the full 4-digit code.");
      return;
    }
    Keyboard.dismiss();
    navigation.navigate('SetNewPassword', { email: userEmail });
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
            <Text className="text-[18px] font-extrabold text-[#008080] tracking-wide">AiStud</Text>
          </View>

          <View className="flex-row justify-between mb-10 w-full">
            <View className="flex-1 h-[3px] bg-[#008080] rounded-full mr-2" />
            <View className="flex-1 h-[3px] bg-[#008080] rounded-full mx-2" />
            <View className="flex-1 h-[3px] bg-[#B2D8D8] rounded-full ml-2" />
          </View>

          <View className="items-center mb-8">
            <Text className="text-[24px] font-extrabold text-black mb-2">Verify Code</Text>
            <Text className="text-[13px] text-gray-500 font-medium text-center">Please enter the code we sent to your email</Text>
            <Text className="text-[13px] text-[#008080] font-semibold text-center mt-1">{userEmail}</Text>
          </View>

          <View className="flex-row justify-between px-2 mb-10">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChangeText={(text) => handleTextChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                className={`w-[60px] h-[60px] rounded-xl border-[1.5px] text-center text-[22px] font-bold text-black ${digit !== '' ? 'border-[#008080] bg-[#F0FAFA]' : 'border-gray-300 bg-white'}`}
              />
            ))}
          </View>

          <TouchableOpacity onPress={handleVerify} activeOpacity={0.8} className="w-full bg-[#008080] h-[48px] rounded-xl items-center justify-center mb-6 shadow-sm">
            <Text className="text-white font-bold text-[15px]">Verify</Text>
          </TouchableOpacity>

          <View className="flex-row items-center justify-center mb-8">
            <Text className="text-gray-500 text-[13px] font-medium">Didn't receive the code? </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-[#008080] font-bold text-[13px]">Resend Code</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} className="flex-row items-center justify-center py-2">
            <Ionicons name="arrow-back" size={18} color="#000" />
            <Text className="text-black font-semibold text-[14px] ml-2">Back to Login</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}