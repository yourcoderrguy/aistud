import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function FlashcardsScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <StatusBar style="dark" backgroundColor="transparent" />
      
      <View className="flex-row items-center px-6 pt-4 pb-6">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text className="text-[20px] font-extrabold text-black ml-4">Flashcard Decks</Text>
      </View>

      <View className="flex-1 items-center justify-center px-6 pb-20">
        <View className="w-24 h-24 bg-[#FFF3E0] rounded-full items-center justify-center mb-6">
          <Ionicons name="copy" size={40} color="#FF9800" />
        </View>
        <Text className="text-[20px] font-bold text-black mb-2">No Flashcards</Text>
        <Text className="text-[14px] text-gray-500 text-center mb-8 px-4 leading-5">
          The AI will automatically generate smart flashcards when you process a new summary.
        </Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('CreateSummary')}
          activeOpacity={0.8}
          className="bg-[#FF9800] px-8 py-3.5 rounded-xl shadow-sm"
        >
          <Text className="text-white font-bold text-[15px]">Generate Flashcards</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}