import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker'; 

// Import your Flask API connections
import { generateSummary, generateQuiz, generateFlashcards } from '../../services/api';

export default function CreateSummaryScreen() {
  const navigation = useNavigation<any>(); 
  
  // State for Inputs
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  
  // State for UI Feedback
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'quiz' | 'flashcards'>('summary');

  // Validation
  const MAX_CHARS = 5000;
  const isOverLimit = inputText.length > MAX_CHARS;
  const hasText = inputText.trim().length > 0;
  const hasFile = selectedFile !== null;
  const isButtonDisabled = (!hasText && !hasFile) || isOverLimit || isLoading;

  // Open native file picker
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], 
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };

  // Trigger the Flask API
const handleGenerate = async () => {
    if (isButtonDisabled) return;
    
    Keyboard.dismiss(); 
    setIsLoading(true); 

    try {
      let responseData;
      
      // We now pass an object containing both the text and the file
      const payload = {
        text: inputText.trim(),
        file: selectedFile
      };

      if (activeTab === 'summary') {
        responseData = await generateSummary(payload);
      } else if (activeTab === 'quiz') {
        responseData = await generateQuiz(payload);
      } else if (activeTab === 'flashcards') {
        responseData = await generateFlashcards(payload);
      }

      navigation.navigate('SummaryResult', { 
        resultData: responseData, 
        type: activeTab 
      });

    } catch (error) {
      alert("Failed to connect to the server. Ensure your Flask backend is running and the IP address in api.ts is correct.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <StatusBar style="dark" backgroundColor="transparent" />

      {/* --- HEADER --- */}
      <View className="flex-row items-center px-6 pt-4 pb-4 border-b border-gray-100 bg-white">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center border border-gray-100"
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text className="text-[18px] font-extrabold text-black ml-4">New Study Session</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" 
          keyboardDismissMode="on-drag" 
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}
        >
          
          {/* --- TYPE SELECTOR TABS --- */}
          <Text className="text-[15px] font-bold text-black mb-3">What are we generating?</Text>
          <View className="flex-row bg-gray-100 p-1 rounded-xl mb-6">
            <TouchableOpacity 
              onPress={() => setActiveTab('summary')}
              className={`flex-1 py-2.5 items-center rounded-lg ${activeTab === 'summary' ? 'bg-white shadow-sm' : ''}`}
            >
              <Text className={`font-bold text-[14px] ${activeTab === 'summary' ? 'text-[#008080]' : 'text-gray-500'}`}>Summary</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setActiveTab('quiz')}
              className={`flex-1 py-2.5 items-center rounded-lg ${activeTab === 'quiz' ? 'bg-[#2196F3] shadow-sm' : ''}`}
            >
              <Text className={`font-bold text-[14px] ${activeTab === 'quiz' ? 'text-white' : 'text-gray-500'}`}>Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setActiveTab('flashcards')}
              className={`flex-1 py-2.5 items-center rounded-lg ${activeTab === 'flashcards' ? 'bg-[#FF9800] shadow-sm' : ''}`}
            >
              <Text className={`font-bold text-[14px] ${activeTab === 'flashcards' ? 'text-white' : 'text-gray-500'}`}>Flashcards</Text>
            </TouchableOpacity>
          </View>

          {/* --- TEXT INPUT AREA --- */}
          <Text className="text-[15px] font-bold text-black mb-3">Paste your lecture notes</Text>
          <View className={`bg-white rounded-2xl border p-2 mb-2 shadow-sm ${isFocused ? 'border-[#008080]' : 'border-gray-200'}`}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Paste your algorithms, definitions, or textbook paragraphs here..."
              placeholderTextColor="#A0AEC0"
              multiline={true}
              textAlignVertical="top"
              className="h-[180px] text-[15px] text-black leading-6 px-2 py-2"
              editable={!isLoading}
            />
          </View>

          <View className="flex-row justify-end mb-6 px-1">
            <Text className={`text-[12px] font-medium ${isOverLimit ? 'text-red-500' : 'text-gray-400'}`}>
              {inputText.length} / {MAX_CHARS}
            </Text>
          </View>

          {/* --- DYNAMIC DOCUMENT UPLOAD UI --- */}
          {!selectedFile ? (
            <TouchableOpacity 
              onPress={pickDocument}
              activeOpacity={0.7}
              className="flex-row items-center justify-center bg-[#F0FAFA] py-4 rounded-xl border border-dashed border-[#008080] mb-8"
            >
              <Ionicons name="document-attach" size={20} color="#008080" />
              <Text className="text-[#008080] font-bold text-[14px] ml-2">Upload PDF or DOCX</Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row items-center justify-between bg-[#E6F2F2] p-4 rounded-xl border border-[#B2D8D8] mb-8 shadow-sm">
              <View className="flex-row items-center flex-1 pr-4">
                <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
                  <Ionicons name="document-text" size={20} color="#008080" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-[#008080] font-bold text-[14px]" numberOfLines={1}>
                    {selectedFile.name}
                  </Text>
                  <Text className="text-[#008080] opacity-70 text-[12px] mt-0.5">
                    {(selectedFile.size ? (selectedFile.size / 1024 / 1024).toFixed(2) : 0)} MB
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setSelectedFile(null)} className="p-2">
                <Ionicons name="close-circle" size={24} color="#008080" />
              </TouchableOpacity>
            </View>
          )}

          {/* --- GENERATE BUTTON --- */}
          <TouchableOpacity 
            onPress={handleGenerate}
            activeOpacity={0.8}
            disabled={isButtonDisabled}
            className={`w-full h-[56px] rounded-xl items-center justify-center mt-auto flex-row ${
              isButtonDisabled ? 'bg-gray-300' : 'bg-[#008080] shadow-sm'
            }`}
          >
            {isLoading ? (
              <>
                <ActivityIndicator color="white" size="small" />
                <Text className="font-bold text-[16px] text-white ml-3">Connecting to Server...</Text>
              </>
            ) : (
              <>
                <Ionicons name="sparkles" size={18} color={isButtonDisabled ? "#9CA3AF" : "white"} className="mr-2" />
                <Text className={`font-bold text-[16px] ml-1 ${isButtonDisabled ? 'text-gray-400' : 'text-white'}`}>
                  {activeTab === 'summary' ? 'Generate Summary' : activeTab === 'quiz' ? 'Generate Quiz' : 'Generate Flashcards'}
                </Text>
              </>
            )}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}