import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import our new global memory bank
import { useStudyStore } from '../../store/useStudyStore';

export default function SummaryResultScreen() {
  const navigation = useNavigation<any>();

  // Extract data dynamically from the Zustand store instead of the router
  const { activeSession, sessionType, clearSession } = useStudyStore();

  // Flashcard State
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // When leaving the screen, wipe the memory bank so the app stays fast
  const handleClose = () => {
    clearSession();
    navigation.goBack();
  };

  // Safety net: If no data was found in the store, show an error screen
  if (!activeSession) {
    return (
      <SafeAreaView className="flex-1 bg-[#FAFAFA] items-center justify-center px-6">
        <Ionicons name="alert-circle" size={50} color="#EF4444" className="mb-4" />
        <Text className="text-[18px] font-bold text-black mb-2">No Data Found</Text>
        <Text className="text-[14px] text-gray-500 text-center mb-6">It looks like the AI didn't return any data.</Text>
        <TouchableOpacity onPress={handleClose} className="bg-[#008080] px-6 py-3 rounded-xl shadow-sm">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // --- FLASHCARD HANDLERS ---
  const flashcards = activeSession.flashcards || [];
  
  const handleNextCard = () => {
    setIsFlipped(false);
    if (cardIndex < flashcards.length - 1) setCardIndex(cardIndex + 1);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (cardIndex > 0) setCardIndex(cardIndex - 1);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <StatusBar style="dark" backgroundColor="transparent" />

      {/* --- TOP HEADER --- */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-4">
        {/* Memory cleanup trigger on close */}
        <TouchableOpacity 
          onPress={handleClose} 
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        
        <Text className="text-[18px] font-extrabold text-black">
          {sessionType === 'summary' ? 'Generated Summary' : sessionType === 'quiz' ? 'Generated Quiz' : 'Flashcard Deck'}
        </Text>
        
        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <Ionicons name="bookmark-outline" size={22} color="#008080" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, flexGrow: 1 }}>
        
        {/* ========================================== */}
        {/* 1. RENDER SUMMARY                          */}
        {/* ========================================== */}
        {sessionType === 'summary' && activeSession.summary && (
          <View className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mt-4">
            <View className="flex-row items-center mb-4">
              <Ionicons name="document-text" size={20} color="#008080" />
              <Text className="text-[16px] font-extrabold text-black ml-2">Generated Notes</Text>
            </View>
            <Text className="text-[15px] text-gray-700 leading-7">
              {activeSession.summary}
            </Text>
          </View>
        )}

        {/* ========================================== */}
        {/* 2. RENDER FLASHCARDS                       */}
        {/* ========================================== */}
        {sessionType === 'flashcards' && flashcards.length > 0 && (
          <View className="flex-1 justify-center items-center mt-6">
            <Text className="text-gray-400 font-medium text-[13px] mb-4">
              Card {cardIndex + 1} of {flashcards.length}
            </Text>

            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={() => setIsFlipped(!isFlipped)}
              className={`w-full min-h-[320px] rounded-3xl p-6 justify-center items-center shadow-sm border ${
                isFlipped ? 'bg-[#008080] border-[#008080]' : 'bg-white border-gray-200'
              }`}
            >
              <Text className={`text-[20px] font-bold text-center leading-8 ${isFlipped ? 'text-white' : 'text-black'}`}>
                {isFlipped ? flashcards[cardIndex].back : flashcards[cardIndex].front}
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
                {isFlipped ? "Answer" : "Concept"}
              </Text>

              <TouchableOpacity 
                onPress={handleNextCard}
                disabled={cardIndex === flashcards.length - 1}
                className={`w-14 h-14 rounded-full items-center justify-center border ${cardIndex === flashcards.length - 1 ? 'bg-gray-50 border-gray-100' : 'bg-[#008080] border-[#008080] shadow-sm'}`}
              >
                <Ionicons name="chevron-forward" size={24} color={cardIndex === flashcards.length - 1 ? "#D1D5DB" : "white"} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ========================================== */}
        {/* 3. RENDER QUIZ PREVIEW                     */}
        {/* ========================================== */}
        {sessionType === 'quiz' && activeSession.questions && (
          <View className="mt-4">
            <View className="bg-[#E3F2FD] p-6 rounded-3xl border border-[#90CAF9] items-center mb-6 shadow-sm">
              <Ionicons name="checkmark-circle" size={44} color="#2196F3" className="mb-3" />
              <Text className="text-[18px] font-extrabold text-black text-center mb-2">Quiz Successfully Generated!</Text>
              <Text className="text-[14px] text-[#1565C0] text-center leading-5">
                The AI created {activeSession.questions.length} multiple-choice questions from your notes.
              </Text>
            </View>

            <TouchableOpacity 
              onPress={() => navigation.navigate('ActiveQuiz')} 
              activeOpacity={0.8}
              className="bg-[#2196F3] w-full py-4 rounded-xl items-center shadow-sm mb-6"
            >
              <Text className="text-white font-bold text-[16px]">Start Quiz Now</Text>
            </TouchableOpacity>

            <Text className="text-[16px] font-extrabold text-black mb-4">Question Preview:</Text>
            {activeSession.questions.map((q: any, index: number) => (
              <View key={index} className="bg-white p-5 rounded-2xl border border-gray-100 mb-3 shadow-sm">
                <Text className="font-bold text-[15px] text-black mb-2 leading-6">Q{index + 1}: {q.question}</Text>
                <View className="bg-green-50 self-start px-3 py-1.5 rounded-lg border border-green-100 mt-1">
                  <Text className="text-[13px] font-bold text-green-700">Ans: {q.correctAnswer}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}