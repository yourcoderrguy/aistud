import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import our global memory bank
import { useStudyStore } from '../../store/useStudyStore';

export default function ActiveQuizScreen() {
  const navigation = useNavigation<any>();

  // Extract the generated questions dynamically from the Zustand store
  const { activeSession } = useStudyStore();
  const quizData = activeSession?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Safety net: If no quiz data is found in memory, prevent a crash
  if (quizData.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-[#FAFAFA] items-center justify-center px-6">
        <Ionicons name="alert-circle" size={50} color="#EF4444" className="mb-4" />
        <Text className="text-[18px] font-bold text-black mb-2">No Quiz Found</Text>
        <Text className="text-[14px] text-gray-500 text-center mb-6">It looks like the AI didn't return any questions.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-[#008080] px-6 py-3 rounded-xl shadow-sm">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const currentQuestion = quizData[currentIndex];
  const progressPercentage = ((currentIndex + 1) / quizData.length) * 100;

  const handleSelectOption = (option: string) => {
    if (!isSubmitted) setSelectedAnswer(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;
    setIsSubmitted(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      // Calculate final score properly before showing the alert
      const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer && !isSubmitted ? 1 : 0);
      Alert.alert(
        "Quiz Complete! 🎉", 
        `You scored ${finalScore} out of ${quizData.length}. Keep up the great work!`,
        [{ text: "Back to Results", onPress: () => navigation.goBack() }]
      );
    }
  };

  const getOptionStyle = (option: string) => {
    if (!isSubmitted) {
      return selectedAnswer === option 
        ? "bg-[#E6F2F2] border-[#008080]" 
        : "bg-white border-gray-200";     
    }
    if (option === currentQuestion.correctAnswer) {
      return "bg-[#ECFDF5] border-[#10B981]"; 
    }
    if (selectedAnswer === option && option !== currentQuestion.correctAnswer) {
      return "bg-[#FEF2F2] border-[#EF4444]"; 
    }
    return "bg-white border-gray-200 opacity-50"; 
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <StatusBar style="dark" backgroundColor="transparent" />

      {/* Header and Progress Bar */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
          >
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-[16px] font-extrabold text-black">
            Question {currentIndex + 1} of {quizData.length}
          </Text>
          <View className="w-10 h-10" />
        </View>

        <View className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <View 
            className="h-full bg-[#008080] rounded-full" 
            style={{ width: `${progressPercentage}%` }} 
          />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}
      >
        <Text className="text-[22px] font-extrabold text-black leading-8 mb-8">
          {currentQuestion.question}
        </Text>

        <View className="space-y-4 mb-8">
          {currentQuestion.options.map((option: string, index: number) => {
            const isCorrect = isSubmitted && option === currentQuestion.correctAnswer;
            const isWrongSelected = isSubmitted && selectedAnswer === option && option !== currentQuestion.correctAnswer;
            const labels = ['A', 'B', 'C', 'D'];

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => handleSelectOption(option)}
                className={`flex-row items-center p-5 rounded-2xl border-2 mb-3 ${getOptionStyle(option)}`}
              >
                <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 border ${
                  isCorrect ? 'bg-[#10B981] border-[#10B981]' : 
                  isWrongSelected ? 'bg-[#EF4444] border-[#EF4444]' : 
                  selectedAnswer === option ? 'bg-[#008080] border-[#008080]' : 'bg-gray-100 border-gray-200'
                }`}>
                  {isCorrect ? (
                    <Ionicons name="checkmark" size={20} color="white" />
                  ) : isWrongSelected ? (
                    <Ionicons name="close" size={20} color="white" />
                  ) : (
                    <Text className={`font-bold text-[15px] ${selectedAnswer === option ? 'text-white' : 'text-gray-500'}`}>
                      {labels[index]}
                    </Text>
                  )}
                </View>
                
                <Text className={`flex-1 text-[16px] font-medium ${
                  isCorrect ? 'text-[#065F46]' : 
                  isWrongSelected ? 'text-[#991B1B]' : 
                  'text-black'
                }`}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {isSubmitted && selectedAnswer !== currentQuestion.correctAnswer && (
          <View className="bg-red-50 p-5 rounded-2xl border border-red-100 mb-8">
            <View className="flex-row items-center mb-2">
              <Ionicons name="bulb" size={20} color="#EF4444" />
              <Text className="text-[16px] font-bold text-red-600 ml-2">Why was that incorrect?</Text>
            </View>
            <Text className="text-[14px] text-red-800 leading-6">
              {/* Fallback to a simple message if the backend didn't provide an explanation */}
              {(currentQuestion as any).explanation || `The correct answer is ${currentQuestion.correctAnswer}.`}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Footer Controls */}
      <View className="px-6 pb-8 bg-[#FAFAFA] border-t border-gray-100 pt-4">
        {!isSubmitted ? (
          <TouchableOpacity 
            onPress={handleCheckAnswer}
            disabled={!selectedAnswer}
            activeOpacity={0.8}
            className={`w-full h-[56px] rounded-xl items-center justify-center ${
              !selectedAnswer ? 'bg-gray-200' : 'bg-[#008080] shadow-sm'
            }`}
          >
            <Text className={`font-bold text-[16px] ${!selectedAnswer ? 'text-gray-400' : 'text-white'}`}>
              Check Answer
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={handleNextQuestion}
            activeOpacity={0.8}
            className="w-full h-[56px] rounded-xl items-center justify-center bg-black shadow-sm"
          >
            <Text className="font-bold text-[16px] text-white">
              {currentIndex < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}