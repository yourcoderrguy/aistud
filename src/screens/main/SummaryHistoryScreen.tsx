import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../navigation/types';

// Mock Data for past summaries
const historyData = [
  { id: '1', title: 'Data Structures & Algorithms', subject: 'Computer Science', date: 'Today', cards: 24, color: '#008080', bg: '#F0FAFA' },
  { id: '2', title: 'Machine Learning Basics', subject: 'Computer Science', date: 'Yesterday', cards: 15, color: '#008080', bg: '#F0FAFA' },
  { id: '3', title: 'Cellular Respiration', subject: 'Biology', date: 'Oct 12', cards: 30, color: '#FF9800', bg: '#FFF3E0' },
  { id: '4', title: 'Quantum Mechanics', subject: 'Physics', date: 'Oct 10', cards: 18, color: '#2196F3', bg: '#E3F2FD' },
];

const filters = ['All', 'Computer Science', 'Biology', 'Physics'];

export default function SummaryHistoryScreen() {
  const navigation = useNavigation<MainNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter logic
  const filteredData = historyData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || item.subject === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <StatusBar style="dark" backgroundColor="transparent" />

      {/* Top Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-4">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text className="text-[20px] font-extrabold text-black">Study History</Text>
        <View className="w-10 h-10" /> {/* Empty view for flex alignment */}
      </View>

      {/* Search Bar */}
      <View className="px-6 mb-4">
        <View className="flex-row items-center bg-white h-[48px] px-4 rounded-xl border border-gray-200 shadow-sm">
          <Ionicons name="search" size={20} color="#A0AEC0" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search your notes..."
            placeholderTextColor="#A0AEC0"
            className="flex-1 ml-2 text-[14px] text-black h-full"
          />
        </View>
      </View>

      {/* Filter Chips (Horizontal Scroll) */}
      <View className="pl-6 mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.8}
              className={`px-4 py-2 rounded-full mr-3 border ${
                activeFilter === filter 
                  ? 'bg-[#008080] border-[#008080]' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text className={`font-bold text-[13px] ${
                activeFilter === filter ? 'text-white' : 'text-gray-500'
              }`}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* History List */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        {filteredData.length === 0 ? (
          <View className="items-center justify-center mt-20">
            <Ionicons name="folder-open-outline" size={60} color="#D1D5DB" />
            <Text className="text-gray-400 font-medium text-[15px] mt-4">No summaries found.</Text>
          </View>
        ) : (
          filteredData.map((item) => (
            <TouchableOpacity 
              key={item.id}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('SummaryResult')} // Reuses our Results screen!
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-4 flex-row items-center"
            >
              {/* Icon Container */}
              <View 
                className="w-12 h-12 rounded-full items-center justify-center mr-4" 
                style={{ backgroundColor: item.bg }}
              >
                <Ionicons name="document-text" size={24} color={item.color} />
              </View>

              {/* Text Info */}
              <View className="flex-1">
                <Text className="text-[16px] font-bold text-black mb-1" numberOfLines={1}>
                  {item.title}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-[12px] text-gray-500 font-medium">{item.subject}</Text>
                  <View className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
                  <Text className="text-[12px] text-gray-500 font-medium">{item.date}</Text>
                </View>
              </View>

              {/* Flashcard Badge */}
              <View className="items-center justify-center">
                <View className="bg-[#F0FAFA] px-2 py-1 rounded-md border border-[#B2D8D8]">
                  <Text className="text-[#008080] font-bold text-[12px]">{item.cards} Cards</Text>
                </View>
              </View>

            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}