import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// --- MOCK AI QUIZ DATA ---
const quizData = [
  {
    id: 1,
    question: "What is the time complexity of searching for an element in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: "O(log n)",
    explanation: "Because the tree is balanced, every step down cuts the remaining nodes in half, resulting in logarithmic time."
  },
  {
    id: 2,
    question: "Which data structure uses a LIFO (Last In, First Out) principle?",
    options: ["Queue", "Linked List", "Stack", "Array"],
    correctAnswer: "Stack",
    explanation: "A stack operates like a stack of plates; the last plate you put on top is the first one you take off."
  },
  {
    id: 3,
    question: "What is the primary purpose of a Hash Table?",
    options: ["Sorting data", "Fast data retrieval", "Graph traversal", "Creating loops"],
    correctAnswer: "Fast data retrieval",
    explanation: "Hash tables use a hash function to compute an index, allowing for O(1) average time complexity for lookups."
  }
];

export default function ActiveQuizScreen() {
  const navigation = useNavigation<any>();

  // Quiz State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

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
      // End of Quiz: In the future, this will navigate to a 'QuizResults' screen
      alert(`Quiz Complete! You scored ${score + (selectedAnswer === currentQuestion.correctAnswer && !isSubmitted ? 1 : 0)} out of ${quizData.length}`);
      navigation.goBack();
    }
  };

  // Helper function to determine the color of the option cards
  const getOptionStyle = (option: string) => {
    if (!isSubmitted) {
      return selectedAnswer === option 
        ? "bg-[#E6F2F2] border-[#008080]" // Selected (Pre-submit)
        : "bg-white border-gray-200";     // Unselected
    }
    if (option === currentQuestion.correctAnswer) {
      return "bg-[#ECFDF5] border-[#10B981]"; // Correct Answer (Green)
    }
    if (selectedAnswer === option && option !== currentQuestion.correctAnswer) {
      return "bg-[#FEF2F2] border-[#EF4444]"; // Wrong Answer (Red)
    }
    return "bg-white border-gray-200 opacity-50"; // Other unselected options fade out
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <StatusBar style="dark" backgroundColor="transparent" />

      {/* --- TOP HEADER & PROGRESS BAR --- */}
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
          <View className="w-10 h-10" /> {/* Empty view for alignment */}
        </View>

        {/* Progress Bar Track */}
        <View className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          {/* Progress Bar Fill */}
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
        {/* --- QUESTION CANVAS --- */}
        <Text className="text-[22px] font-extrabold text-black leading-8 mb-8">
          {currentQuestion.question}
        </Text>

        {/* --- ANSWER OPTIONS --- */}
        <View className="space-y-4 mb-8">
          {currentQuestion.options.map((option, index) => {
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
                {/* Option Letter Bubble */}
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
                
                {/* Option Text */}
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

        {/* --- AI EXPLANATION FEEDBACK --- */}
        {isSubmitted && selectedAnswer !== currentQuestion.correctAnswer && (
          <View className="bg-red-50 p-5 rounded-2xl border border-red-100 mb-8">
            <View className="flex-row items-center mb-2">
              <Ionicons name="bulb" size={20} color="#EF4444" />
              <Text className="text-[16px] font-bold text-red-600 ml-2">Why was that incorrect?</Text>
            </View>
            <Text className="text-[14px] text-red-800 leading-6">
              {currentQuestion.explanation}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* --- BOTTOM ACTION BUTTON --- */}
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