import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar'; 
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
};

export default function DashboardScreen() {
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  
  const firstName = user?.fullName?.split(' ')[0] || user?.email?.split('@')[0] || 'User';
  
  const [greeting, setGreeting] = useState(getTimeOfDay());
  const [quickPrompt, setQuickPrompt] = useState('');
  
  // State to control the vertical attachment menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setGreeting(getTimeOfDay()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickSubmit = () => {
    if (quickPrompt.trim().length > 0) {
      navigation.navigate('CreateSummary', { initialText: quickPrompt });
      setQuickPrompt('');
      setIsMenuOpen(false);
    } else {
      navigation.navigate('CreateSummary');
    }
  };

  const handleAttachmentSelect = () => {
    setIsMenuOpen(false);
    navigation.navigate('CreateSummary');
  };

  // Close the popup menu if the user starts scrolling the main dashboard
  const handleScroll = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
      <StatusBar style="dark" backgroundColor="transparent" />

      {/* Using Flex-1 here ensures the keyboard pushes the docked prompt bar up, 
        and the ScrollView dynamically shrinks instead of getting overlapped. 
      */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* --- MAIN SCROLLABLE CONTENT --- */}
        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false} 
          onScrollBeginDrag={handleScroll}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 24 }}
        >
          {/* TOP HEADER */}
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-[26px] font-extrabold text-black tracking-tight">
                {greeting}, {firstName} 👋
              </Text>
            </View>
            
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => navigation.navigate('Profile')}
              className="w-12 h-12 bg-[#F0FAFA] rounded-full items-center justify-center border-[1.5px] border-[#008080]"
            >
              <Ionicons name="person" size={20} color="#008080" />
            </TouchableOpacity>
          </View>

          {/* HERO CARD */}
          <View className="w-full bg-[#008080] rounded-3xl p-6 mb-8 shadow-sm">
            <Text className="text-white text-[20px] font-bold mb-2">Accelerate your learning</Text>
            <Text className="text-[#E6F2F2] text-[14px] leading-[22px] mb-4">
              Upload your lecture notes, PDFs, or textbook pictures, and our AI will instantly generate bite-sized summaries and smart flashcards.
            </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('CreateSummary')}
              activeOpacity={0.8}
              className="bg-white px-5 py-3 rounded-xl self-start shadow-sm"
            >
              <Text className="text-[#008080] font-bold text-[14px]">Start New Session</Text>
            </TouchableOpacity>
          </View>

          {/* STUDY TOOLS GRID */}
          <Text className="text-[18px] font-extrabold text-black mb-4">Study Tools</Text>
          
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity 
              onPress={() => navigation.navigate('SummariesHub')}
              activeOpacity={0.7} 
              className="w-[47%] bg-white p-5 rounded-3xl border border-gray-100 shadow-sm items-center"
            >
              <View className="w-12 h-12 bg-[#F0FAFA] rounded-full items-center justify-center mb-3">
                <Ionicons name="document-text" size={24} color="#008080" />
              </View>
              <Text className="text-[15px] font-bold text-black mb-1">Summaries</Text>
              <Text className="text-[12px] text-gray-500 text-center">AI generated</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => navigation.navigate('FlashcardsHub')}
              activeOpacity={0.7} 
              className="w-[47%] bg-white p-5 rounded-3xl border border-gray-100 shadow-sm items-center"
            >
              <View className="w-12 h-12 bg-[#FFF3E0] rounded-full items-center justify-center mb-3">
                <Ionicons name="copy" size={24} color="#FF9800" />
              </View>
              <Text className="text-[15px] font-bold text-black mb-1">Flashcards</Text>
              <Text className="text-[12px] text-gray-500 text-center">Smart revision</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between">
            <TouchableOpacity 
              onPress={() => navigation.navigate('QuizzesHub')}
              activeOpacity={0.7} 
              className="w-[47%] bg-white p-5 rounded-3xl border border-gray-100 shadow-sm items-center"
            >
              <View className="w-12 h-12 bg-[#E3F2FD] rounded-full items-center justify-center mb-3">
                <Ionicons name="help-circle" size={26} color="#2196F3" />
              </View>
              <Text className="text-[15px] font-bold text-black mb-1">Quizzes</Text>
              <Text className="text-[12px] text-gray-500 text-center">Test knowledge</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => navigation.navigate('Library')} 
              activeOpacity={0.7} 
              className="w-[47%] bg-white p-5 rounded-3xl border border-gray-100 shadow-sm items-center"
            >
              <View className="w-12 h-12 bg-[#F3E5F5] rounded-full items-center justify-center mb-3">
                <Ionicons name="time" size={24} color="#9C27B0" />
              </View>
              <Text className="text-[15px] font-bold text-black mb-1">History</Text>
              <Text className="text-[12px] text-gray-500 text-center">Past sessions</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* ========================================== */}
        {/* DOCKED OMNI-PROMPT (Sits natively above tabs) */}
        {/* ========================================== */}
        <View className="bg-[#FAFAFA] px-5 pt-2 pb-4">
          
          {/* VERTICAL ATTACHMENT MENU (Appears strictly above the plus button) */}
          {isMenuOpen && (
            <View className="absolute bottom-[70px] left-5 bg-white rounded-3xl p-3 border border-gray-200 shadow-lg shadow-gray-300/40 w-[170px] z-50">
              <TouchableOpacity 
                onPress={handleAttachmentSelect}
                className="flex-row items-center p-2 mb-1 rounded-xl"
              >
                <View className="w-9 h-9 rounded-full bg-blue-50 items-center justify-center mr-3">
                  <Ionicons name="camera" size={18} color="#2196F3" />
                </View>
                <Text className="text-[14px] font-bold text-black">Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleAttachmentSelect}
                className="flex-row items-center p-2 mb-1 rounded-xl"
              >
                <View className="w-9 h-9 rounded-full bg-orange-50 items-center justify-center mr-3">
                  <Ionicons name="image" size={18} color="#FF9800" />
                </View>
                <Text className="text-[14px] font-bold text-black">Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleAttachmentSelect}
                className="flex-row items-center p-2 rounded-xl"
              >
                <View className="w-9 h-9 rounded-full bg-teal-50 items-center justify-center mr-3">
                  <Ionicons name="document-attach" size={18} color="#008080" />
                </View>
                <Text className="text-[14px] font-bold text-black">Document</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* MAIN PROMPT INPUT PILL */}
          <View className="flex-row items-end bg-white p-2 rounded-[32px] border border-gray-200 shadow-sm">
            
            {/* Toggle Plus/Close Button */}
            <TouchableOpacity 
              onPress={() => setIsMenuOpen(!isMenuOpen)}
              activeOpacity={0.7}
              className={`w-10 h-10 rounded-full items-center justify-center mb-1 ml-1 ${
                isMenuOpen ? 'bg-gray-100' : 'bg-[#F0FAFA]'
              }`}
            >
              <Ionicons name={isMenuOpen ? "close" : "add"} size={24} color={isMenuOpen ? "#6B7280" : "#008080"} />
            </TouchableOpacity>

            {/* Dynamic Text Input */}
            <TextInput
              value={quickPrompt}
              onChangeText={setQuickPrompt}
              onFocus={() => setIsMenuOpen(false)} // Auto-close menu if they start typing
              placeholder="Ask or upload..."
              placeholderTextColor="#9CA3AF"
              multiline={true}
              style={{ maxHeight: 100, minHeight: 40 }}
              className="flex-1 px-3 py-2.5 text-[15px] text-black"
            />

            {/* Submit Arrow Button */}
            <TouchableOpacity 
              onPress={handleQuickSubmit}
              activeOpacity={0.8}
              className={`w-10 h-10 rounded-full items-center justify-center mb-1 mr-1 transition-colors ${
                quickPrompt.trim().length > 0 ? 'bg-[#008080]' : 'bg-gray-200'
              }`}
            >
              <Ionicons 
                name="arrow-up" 
                size={20} 
                color={quickPrompt.trim().length > 0 ? "white" : "#A0AEC0"} 
              />
            </TouchableOpacity>

          </View>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}