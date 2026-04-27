import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../../navigation/types';

const { width } = Dimensions.get('window');

// Data array updated to include the exact local image paths
const slides = [
  {
    id: '1',
    title: 'Flashcards & Progress',
    description: 'Revise smarter with interactive flashcards and track your learning progress over time',
    // Notice the THREE sets of dots (../../../) to reach the root assets folder!
    image: require('../../../assets/onboard-1.png'), 
  },
  {
    id: '2',
    title: 'AI Summaries',
    description: 'Transform long, clustered pages into clear, quick, focused takeaways—perfect for lasting review',
    image: require('../../../assets/onboard-2.png'),
  },
  {
    id: '3',
    title: 'Smart Questions',
    description: 'Instantly create quizzes and test questions from your study materials to test understanding',
    image: require('../../../assets/onboard-3.png'),
  },
];
export default function OnboardingScreen() {
  const navigation = useNavigation<AuthNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleComplete = () => {
    navigation.replace('SignUp');
  };

  const renderItem = ({ item }: { item: typeof slides[0] }) => (
    <View style={{ width }} className="items-center px-6">
      
      {/* ILLUSTRATION AREA: Replaced colored boxes with your actual PNGs */}
      <View className="w-full h-[320px] mb-10 mt-6 items-center justify-center">
        <Image 
          source={item.image} 
          className="w-full h-full" 
          resizeMode="contain" 
        />
      </View>

      {/* TYPOGRAPHY */}
      <Text className="text-[26px] font-extrabold text-black mb-4 tracking-tight text-center">
        {item.title}
      </Text>
      
      <Text className="text-[15px] text-gray-500 text-center leading-[24px] px-2 font-medium">
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      
      {/* Top Logo */}
      <View className="items-center justify-center pt-6 pb-2">
        <Text className="text-[22px] font-extrabold text-[#008080] tracking-wide">AiStud</Text>
      </View>

      {/* Swipeable Carousel */}
      <View className="flex-[3]">
        <FlatList
          data={slides}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      {/* Bottom Controls Area */}
      <View className="flex-[1] items-center justify-end px-6 pb-12">
        
        {/* Pagination Dots */}
        <View className="flex-row mb-8">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`h-[8px] rounded-full mx-[4px] ${
                currentIndex === index ? 'w-[8px] bg-[#008080]' : 'w-[8px] bg-[#B2D8D8]'
              }`}
            />
          ))}
        </View>

        {/* Get Started Button */}
        <TouchableOpacity 
          onPress={handleComplete}
          activeOpacity={0.8}
          className="w-full bg-[#008080] py-[16px] rounded-xl items-center shadow-sm"
        >
          <Text className="text-white font-bold text-[17px]">Get Started</Text>
        </TouchableOpacity>

        {/* Skip Text */}
        <TouchableOpacity onPress={handleComplete} className="mt-5 p-2">
          <Text className="text-gray-400 font-semibold text-[15px]">skip</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}