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
import { MainNavigationProp } from '../../navigation/types';
import * as DocumentPicker from 'expo-document-picker'; // <-- IMPORT FILE PICKER

export default function CreateSummaryScreen() {
  const navigation = useNavigation<MainNavigationProp>(); 
  
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // State to hold the attached file
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const MAX_CHARS = 5000;
  const isOverLimit = inputText.length > MAX_CHARS;
  
  // The button unlocks if they typed text OR attached a file
  const hasText = inputText.trim().length > 0;
  const hasFile = selectedFile !== null;
  const isButtonDisabled = (!hasText && !hasFile) || isOverLimit || isLoading;

  // Function to open the native phone file picker
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], // Restrict to PDF & DOCX
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]); // Save the selected file to state
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };

  const handleGenerate = () => {
    if (isButtonDisabled) return;
    
    Keyboard.dismiss(); 
    setIsLoading(true); 

    // Simulated AI processing...
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('SummaryResult'); 
    }, 2000); 
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <StatusBar style="dark" backgroundColor="transparent" />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" 
          keyboardDismissMode="on-drag" 
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 10, paddingBottom: 40 }}
        >
          
          {/* Header */}
          <View className="flex-row items-center mb-8">
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
            >
              <Ionicons name="arrow-back" size={20} color="#000" />
            </TouchableOpacity>
            <Text className="text-[20px] font-extrabold text-black ml-4">New Summary</Text>
          </View>

          <Text className="text-[14px] text-gray-500 font-medium mb-4 leading-5">
            Paste your course material or upload a document. The AI will extract key concepts and generate smart flashcards.
          </Text>

          {/* Text Input Area */}
          <View className={`bg-white rounded-2xl border p-4 mb-3 shadow-sm ${isFocused ? 'border-[#008080]' : 'border-gray-200'}`}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Paste your lecture notes or text here..."
              placeholderTextColor="#A0AEC0"
              multiline={true}
              textAlignVertical="top"
              className="h-[180px] text-[15px] text-black leading-6"
            />
          </View>

          <View className="flex-row justify-end mb-6 px-1">
            <Text className={`text-[12px] font-medium ${isOverLimit ? 'text-red-500' : 'text-gray-400'}`}>
              {inputText.length} / {MAX_CHARS}
            </Text>
          </View>

          {/* DYNAMIC DOCUMENT UPLOAD UI */}
          {!selectedFile ? (
            // Default State: Dashed upload button
            <TouchableOpacity 
              onPress={pickDocument}
              activeOpacity={0.7}
              className="flex-row items-center justify-center bg-[#F0FAFA] py-4 rounded-xl border border-dashed border-[#008080] mb-8"
            >
              <Ionicons name="document-attach" size={20} color="#008080" />
              <Text className="text-[#008080] font-bold text-[14px] ml-2">Upload PDF or DOCX</Text>
            </TouchableOpacity>
          ) : (
            // Selected State: Solid card with file name and remove button
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

          {/* Generate Button */}
          <TouchableOpacity 
            onPress={handleGenerate}
            activeOpacity={0.8}
            disabled={isButtonDisabled}
            className={`w-full h-[52px] rounded-xl items-center justify-center mt-auto flex-row ${
              isButtonDisabled ? 'bg-gray-300' : 'bg-[#008080] shadow-sm'
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="sparkles" size={18} color={isButtonDisabled ? "#9CA3AF" : "white"} className="mr-2" />
                <Text className={`font-bold text-[16px] ml-1 ${isButtonDisabled ? 'text-gray-400' : 'text-white'}`}>
                  Generate Summary
                </Text>
              </>
            )}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}