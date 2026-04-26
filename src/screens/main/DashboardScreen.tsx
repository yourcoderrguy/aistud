import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar'; 
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

// Dynamic time calculator
const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
};

export default function DashboardScreen() {
  const { user } = useAuth();
  // Using 'any' temporarily so you can freely navigate without TypeScript errors
  const navigation = useNavigation<any>();
  
  // Safely grab the first name dynamically from the user's login session
  const firstName = user?.fullName?.split(' ')[0] || user?.email?.split('@')[0] || 'User';
  
  const [greeting, setGreeting] = useState(getTimeOfDay());

  // Update greeting occasionally if they leave the app open for hours
  useEffect(() => {
    const interval = setInterval(() => setGreeting(getTimeOfDay()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      {/* Explicitly lock the status bar so battery/time always show */}
      <StatusBar style="dark" backgroundColor="transparent" />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}
      >
        
        {/* Dynamic Header Section */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-[26px] font-extrabold text-black tracking-tight">
              {greeting}, {firstName} 👋
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
          <Text className="text-white text-[20px] font-bold mb-2">Accelerate your learning</Text>
          <Text className="text-[#E6F2F2] text-[14px] leading-[22px] mb-5">
            Turn your lecture notes and study materials into bite-sized summaries and smart flashcards instantly.
          </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('CreateSummary')}
            activeOpacity={0.8}
            className="bg-white px-5 py-3 rounded-xl self-start shadow-sm"
          >
            <Text className="text-[#008080] font-bold text-[14px]">Create New Summary</Text>
          </TouchableOpacity>
        </View>

        {/* Core Features Grid */}
        <Text className="text-[18px] font-extrabold text-black mb-4">Study Tools</Text>
        
        <View className="flex-row justify-between mb-4">
          
          {/* 1. Summaries Hub */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('SummariesHub')}
            activeOpacity={0.7} 
            className="w-[47%] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm items-center"
          >
            <View className="w-12 h-12 bg-[#F0FAFA] rounded-full items-center justify-center mb-3">
              <Ionicons name="document-text" size={24} color="#008080" />
            </View>
            <Text className="text-[15px] font-bold text-black mb-1">Summaries</Text>
            <Text className="text-[12px] text-gray-500 text-center">AI generated notes</Text>
          </TouchableOpacity>

          {/* 2. Flashcards Hub */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('FlashcardsHub')}
            activeOpacity={0.7} 
            className="w-[47%] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm items-center"
          >
            <View className="w-12 h-12 bg-[#FFF3E0] rounded-full items-center justify-center mb-3">
              <Ionicons name="copy" size={24} color="#FF9800" />
            </View>
            <Text className="text-[15px] font-bold text-black mb-1">Flashcards</Text>
            <Text className="text-[12px] text-gray-500 text-center">Smart revision</Text>
          </TouchableOpacity>

        </View>

        <View className="flex-row justify-between">
          
          {/* 3. Quizzes Hub */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('QuizzesHub')}
            activeOpacity={0.7} 
            className="w-[47%] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm items-center"
          >
            <View className="w-12 h-12 bg-[#E3F2FD] rounded-full items-center justify-center mb-3">
              <Ionicons name="help-circle" size={26} color="#2196F3" />
            </View>
            <Text className="text-[15px] font-bold text-black mb-1">Quizzes</Text>
            <Text className="text-[12px] text-gray-500 text-center">Test knowledge</Text>
          </TouchableOpacity>

          {/* 4. History (Library Tab) */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('Library')} 
            activeOpacity={0.7} 
            className="w-[47%] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm items-center"
          >
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