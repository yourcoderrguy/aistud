import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const mockSummary = `Data Structures are specialized formats for organizing, processing, retrieving and storing data. \n\n1. Arrays: A collection of items stored at contiguous memory locations. Excellent for fast access via index.\n2. Linked Lists: Elements are not stored in contiguous memory; every element points to the next. Great for dynamic memory allocation.\n3. Trees: Hierarchical structures with a root value and subtrees of children. Binary Search Trees (BST) allow for highly efficient searching and sorting algorithms.\n\nUnderstanding these fundamentals is critical for optimizing software performance and mastering complex algorithms.`;

const mockFlashcards = [
  { id: 1, q: "What is an Array?", a: "A collection of items stored at contiguous memory locations." },
  { id: 2, q: "How does a Linked List differ from an Array?", a: "Linked List elements are not stored in contiguous memory; each element contains a pointer to the next." },
  { id: 3, q: "What is the primary advantage of a Binary Search Tree (BST)?", a: "It allows for highly efficient searching, insertion, and deletion operations compared to linear data structures." },
];

export default function SummaryResultScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'summary' | 'flashcards'>('summary');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNextCard = () => {
    setIsFlipped(false);
    if (cardIndex < mockFlashcards.length - 1) setCardIndex(cardIndex + 1);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (cardIndex > 0) setCardIndex(cardIndex - 1);
  };

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
        <Text className="text-[18px] font-extrabold text-black">Results</Text>
        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <Ionicons name="bookmark-outline" size={22} color="#008080" />
        </TouchableOpacity>
      </View>

      {/* Segmented Tab Control */}
      <View className="px-6 mb-6">
        <View className="flex-row bg-[#E6F2F2] p-1 rounded-xl">
          <TouchableOpacity 
            onPress={() => setActiveTab('summary')}
            activeOpacity={0.8}
            className={`flex-1 py-2.5 items-center justify-center rounded-lg ${activeTab === 'summary' ? 'bg-white shadow-sm' : ''}`}
          >
            <Text className={`font-bold text-[14px] ${activeTab === 'summary' ? 'text-[#008080]' : 'text-gray-500'}`}>
              Summary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('flashcards')}
            activeOpacity={0.8}
            className={`flex-1 py-2.5 items-center justify-center rounded-lg ${activeTab === 'flashcards' ? 'bg-white shadow-sm' : ''}`}
          >
            <Text className={`font-bold text-[14px] ${activeTab === 'flashcards' ? 'text-[#008080]' : 'text-gray-500'}`}>
              Flashcards ({mockFlashcards.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, flexGrow: 1 }}>
        
        {activeTab === 'summary' && (
          <View className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <View className="flex-row items-center mb-4">
              <Ionicons name="document-text" size={20} color="#008080" />
              <Text className="text-[16px] font-extrabold text-black ml-2">Generated Notes</Text>
            </View>
            <Text className="text-[15px] text-gray-700 leading-7">
              {mockSummary}
            </Text>
          </View>
        )}

        {activeTab === 'flashcards' && (
          <View className="flex-1 justify-center items-center">
            
            <Text className="text-gray-400 font-medium text-[13px] mb-4">
              Card {cardIndex + 1} of {mockFlashcards.length}
            </Text>

            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={() => setIsFlipped(!isFlipped)}
              className={`w-full min-h-[320px] rounded-3xl p-6 justify-center items-center shadow-sm border ${
                isFlipped ? 'bg-[#008080] border-[#008080]' : 'bg-white border-gray-200'
              }`}
            >
              <Text className={`text-[20px] font-bold text-center leading-8 ${isFlipped ? 'text-white' : 'text-black'}`}>
                {isFlipped ? mockFlashcards[cardIndex].a : mockFlashcards[cardIndex].q}
              </Text>
              
              <View className="absolute bottom-6 flex-row items-center opacity-60">
                <Ionicons name="sync" size={16} color={isFlipped ? "white" : "gray"} />
                <Text className={`text-[13px] ml-1.5 font-medium ${isFlipped ? 'text-white' : 'text-gray-500'}`}>
                  Tap to flip
                </Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row items-center justify-between w-full mt-8 px-4">
              <TouchableOpacity 
                onPress={handlePrevCard}
                disabled={cardIndex === 0}
                className={`w-14 h-14 rounded-full items-center justify-center border ${cardIndex === 0 ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200 shadow-sm'}`}
              >
                <Ionicons name="chevron-back" size={24} color={cardIndex === 0 ? "#D1D5DB" : "#008080"} />
              </TouchableOpacity>
              
              <Text className="text-[15px] font-bold text-black">
                {isFlipped ? "Answer" : "Question"}
              </Text>

              <TouchableOpacity 
                onPress={handleNextCard}
                disabled={cardIndex === mockFlashcards.length - 1}
                className={`w-14 h-14 rounded-full items-center justify-center border ${cardIndex === mockFlashcards.length - 1 ? 'bg-gray-50 border-gray-100' : 'bg-[#008080] border-[#008080] shadow-sm'}`}
              >
                <Ionicons name="chevron-forward" size={24} color={cardIndex === mockFlashcards.length - 1 ? "#D1D5DB" : "white"} />
              </TouchableOpacity>
            </View>

          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}