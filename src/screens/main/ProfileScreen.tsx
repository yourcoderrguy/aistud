import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] items-center justify-center px-6">
      <StatusBar style="dark" backgroundColor="transparent" />
      <View className="w-24 h-24 bg-[#F0FAFA] rounded-full items-center justify-center border-[2px] border-[#008080] mb-6">
        <Text className="text-[32px] font-bold text-[#008080]">
          {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
        </Text>
      </View>
      <Text className="text-[24px] font-extrabold text-black mb-1">{user?.fullName || 'User'}</Text>
      <Text className="text-[14px] text-gray-500 mb-8">{user?.email}</Text>

      <TouchableOpacity 
        onPress={logout}
        activeOpacity={0.8}
        className="w-full bg-red-50 p-4 rounded-xl items-center border border-red-100"
      >
        <Text className="text-red-500 font-bold text-[16px]">Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}