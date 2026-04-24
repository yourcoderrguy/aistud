import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar'; // <-- The Status Bar Fix
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function DashboardScreen() {
  // Pull the dynamic user data from our global state
  const { user } = useAuth();

  // Safely extract just the first name (e.g., "Precious" from "Precious Oyebode")
  // If for some reason it's missing, fallback to the prefix of their email.
  const firstName = user?.fullName?.split(' ')[0] || user?.email?.split('@')[0] || 'User';

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      {/* Explicitly lock the status bar so battery/time always show */}
      <StatusBar style="dark" backgroundColor="transparent" />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}
      >
        
        {/* Header Section - Exactly matching Figma typography */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-[26px] font-extrabold text-black tracking-tight">
              Morning, {firstName} 👋
            </Text>
          </View>
          
          <TouchableOpacity 
            activeOpacity={0.7}
            className="w-12 h-12 bg-[#F0FAFA] rounded-full items-center justify-center border-[1.5px] border-[#008080]"
          >
            <Ionicons name="person" size={20} color="#008080" />
          </TouchableOpacity>
        </View>

        {/* Primary Action Banner */}
        <View className="w-full bg-[#008080] rounded-3xl p-6 mb-8 shadow-sm">
          <Text className="text-white text-[20px] font-bold mb-2">Ready to learn?</Text>
          <Text className="text-[#E6F2F2] text-[14px] leading-[22px] mb-5">
            You have 3 new Computer Science materials ready for AI summarization.
          </Text>
          <TouchableOpacity 
            activeOpacity={0.8}
            className="bg-white px-5 py-3 rounded-xl self-start"
          >
            <Text className="text-[#008080] font-bold text-[14px]">Create Summary</Text>
          </TouchableOpacity>
        </View>

        {/* Core Features Grid */}
        <Text className="text-[18px] font-extrabold text-black mb-4">Study Tools</Text>
        
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity activeOpacity={0.7} className="w-[47%] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm items-center">
            <View className="w-12 h-12 bg-[#F0FAFA] rounded-full items-center justify-center mb-3">
              <Ionicons name="document-text" size={24} color="#008080" />
            </View>
            <Text className="text-[15px] font-bold text-black mb-1">Summaries</Text>
            <Text className="text-[12px] text-gray-500 text-center">AI generated notes</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} className="w-[47%] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm items-center">
            <View className="w-12 h-12 bg-[#FFF3E0] rounded-full items-center justify-center mb-3">
              <Ionicons name="copy" size={24} color="#FF9800" />
            </View>
            <Text className="text-[15px] font-bold text-black mb-1">Flashcards</Text>
            <Text className="text-[12px] text-gray-500 text-center">Smart revision</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between">
          <TouchableOpacity activeOpacity={0.7} className="w-[47%] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm items-center">
            <View className="w-12 h-12 bg-[#E3F2FD] rounded-full items-center justify-center mb-3">
              <Ionicons name="help-circle" size={26} color="#2196F3" />
            </View>
            <Text className="text-[15px] font-bold text-black mb-1">Quizzes</Text>
            <Text className="text-[12px] text-gray-500 text-center">Test knowledge</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} className="w-[47%] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm items-center">
            <View className="w-12 h-12 bg-[#F3E5F5] rounded-full items-center justify-center mb-3">
              <Ionicons name="time" size={24} color="#9C27B0" />
            </View>
            <Text className="text-[15px] font-bold text-black mb-1">History</Text>
            <Text className="text-[12px] text-gray-500 text-center">Past sessions</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}