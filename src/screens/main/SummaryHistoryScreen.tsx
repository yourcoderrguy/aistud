import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../navigation/types';

// Updated Mock Data reflecting the 3-tier architecture (Summaries, Quizzes, Flashcards)
const historyData = [
  { id: '1', title: 'Data Structures & Algorithms', type: 'summary', date: 'Today, 10:45 AM', stat: '450 Words' },
  { id: '2', title: 'Binary Search Trees', type: 'quiz', date: 'Yesterday', stat: '10 Questions' },
  { id: '3', title: 'Cellular Respiration', type: 'flashcards', date: 'Oct 12', stat: '30 Cards' },
  { id: '4', title: 'Operating Systems Notes', type: 'summary', date: 'Oct 10', stat: '820 Words' },
  { id: '5', title: 'Machine Learning Basics', type: 'quiz', date: 'Oct 05', stat: '15 Questions' },
];

const filters = ['All', 'Summary', 'Quiz', 'Flashcards'];

export default function SummaryHistoryScreen() {
  const navigation = useNavigation<MainNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter logic: Checks both the search bar text and the selected horizontal chip
  const filteredData = historyData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || item.type.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Dynamic UI helper for icons and colors based on the type of AI generation
  const getTypeUI = (type: string) => {
    if (type === 'quiz') return { icon: 'checkmark-circle', color: '#2196F3', bg: '#E3F2FD', badgeBg: '#E3F2FD', badgeBorder: '#90CAF9' };
    if (type === 'flashcards') return { icon: 'copy', color: '#FF9800', bg: '#FFF3E0', badgeBg: '#FFF3E0', badgeBorder: '#FFCC80' };
    return { icon: 'document-text', color: '#008080', bg: '#E6F2F2', badgeBg: '#F0FAFA', badgeBorder: '#B2D8D8' }; // Summary default
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <StatusBar style="dark" backgroundColor="transparent" />

      {/* --- TOP HEADER --- */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-4">
        {/* We keep the back button here in case they navigate here from a nested stack, but usually, tabs don't need it. */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text className="text-[20px] font-extrabold text-black">Your Library</Text>
        <View className="w-10 h-10" />
      </View>

      {/* --- SEARCH BAR --- */}
      <View className="px-6 mb-4">
        <View className="flex-row items-center bg-white h-[48px] px-4 rounded-xl border border-gray-200 shadow-sm">
          <Ionicons name="search" size={20} color="#A0AEC0" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search past notes, quizzes, or decks..."
            placeholderTextColor="#A0AEC0"
            className="flex-1 ml-3 text-[14px] text-black h-full"
          />
        </View>
      </View>

      {/* --- FILTER CHIPS --- */}
      <View className="pl-6 mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.8}
              className={`px-5 py-2.5 rounded-full mr-3 border ${
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

      {/* --- HISTORY LIST --- */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }} // Crucial padding so the bottom tab bar doesn't hide the last item!
      >
        {filteredData.length === 0 ? (
          <View className="items-center justify-center mt-20">
            <Ionicons name="folder-open-outline" size={60} color="#D1D5DB" />
            <Text className="text-gray-400 font-medium text-[15px] mt-4">No sessions found in this category.</Text>
          </View>
        ) : (
          filteredData.map((item) => {
            const uiConfig = getTypeUI(item.type);

            return (
              <TouchableOpacity 
                key={item.id}
                activeOpacity={0.7}
                onPress={() => alert(`This will load the saved ${item.type} data!`)}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-4 flex-row items-center"
              >
                {/* Dynamic Icon Container */}
                <View 
                  className="w-12 h-12 rounded-full items-center justify-center mr-4" 
                  style={{ backgroundColor: uiConfig.bg }}
                >
                  <Ionicons name={uiConfig.icon as any} size={22} color={uiConfig.color} />
                </View>

                {/* Text Info */}
                <View className="flex-1 pr-2">
                  <Text className="text-[16px] font-bold text-black mb-1" numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-[12px] text-gray-500 font-medium uppercase tracking-wider">{item.type}</Text>
                    <View className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
                    <Text className="text-[12px] text-gray-500 font-medium">{item.date}</Text>
                  </View>
                </View>

                {/* Dynamic Stat Badge */}
                <View className="items-end justify-center">
                  <View 
                    className="px-2.5 py-1.5 rounded-md border"
                    style={{ backgroundColor: uiConfig.badgeBg, borderColor: uiConfig.badgeBorder }}
                  >
                    <Text style={{ color: uiConfig.color, fontWeight: 'bold', fontSize: 11 }}>
                      {item.stat}
                    </Text>
                  </View>
                </View>

              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}