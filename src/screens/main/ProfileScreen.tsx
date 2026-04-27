import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  
  // State for our UI toggles
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // Helper for generating standard setting rows
  const SettingRow = ({ icon, color, title, rightElement, onPress }: any) => (
    <TouchableOpacity 
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      className="flex-row items-center justify-between py-4 border-b border-gray-50"
    >
      <View className="flex-row items-center">
        <View className="w-9 h-9 rounded-full items-center justify-center mr-4" style={{ backgroundColor: `${color}15` }}>
          <Ionicons name={icon} size={18} color={color} />
        </View>
        <Text className="text-[16px] font-medium text-black">{title}</Text>
      </View>
      {rightElement || <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <StatusBar style={isDarkMode ? "light" : "dark"} backgroundColor="transparent" />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }} // Bottom padding for floating tab bar
      >
        {/* Profile Header */}
        <View className="items-center mt-6 mb-8">
          <View className="w-24 h-24 bg-[#E6F2F2] rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm">
            <Text className="text-[32px] font-extrabold text-[#008080]">
              {user?.fullName?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text className="text-[20px] font-extrabold text-black">{user?.fullName || 'User'}</Text>
          <Text className="text-[14px] text-gray-500 mt-1">{user?.email || 'user@student.edu'}</Text>
          
          <TouchableOpacity className="mt-4 bg-gray-100 px-4 py-2 rounded-full">
            <Text className="text-[13px] font-bold text-gray-700">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <Text className="text-[14px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Preferences</Text>
        <View className="bg-white rounded-2xl px-5 py-2 mb-6 shadow-sm border border-gray-100">
          <SettingRow 
            icon="moon" 
            color="#6366F1" 
            title="Dark Mode" 
            rightElement={
              <Switch 
                value={isDarkMode} 
                onValueChange={setIsDarkMode} 
                trackColor={{ false: '#E5E7EB', true: '#008080' }}
                thumbColor="#FFFFFF"
              />
            } 
          />
          <SettingRow 
            icon="notifications" 
            color="#F59E0B" 
            title="Push Notifications" 
            rightElement={
              <Switch 
                value={notifications} 
                onValueChange={setNotifications} 
                trackColor={{ false: '#E5E7EB', true: '#008080' }}
                thumbColor="#FFFFFF"
              />
            } 
          />
        </View>

        {/* Account Section */}
        <Text className="text-[14px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Account</Text>
        <View className="bg-white rounded-2xl px-5 py-2 mb-6 shadow-sm border border-gray-100">
          <SettingRow icon="cloud-upload" color="#2196F3" title="Sync Study Data" onPress={() => {}} />
          <SettingRow icon="lock-closed" color="#10B981" title="Privacy & Security" onPress={() => {}} />
          <SettingRow icon="help-buoy" color="#8B5CF6" title="Help & Support" onPress={() => {}} />
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          onPress={logout}
          activeOpacity={0.8}
          className="bg-red-50 w-full py-4 rounded-xl flex-row items-center justify-center border border-red-100 mt-4 mb-4"
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text className="text-[#EF4444] font-bold text-[16px] ml-2">Log Out</Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-400 text-[12px] mb-8">AISTUD App Version 1.0.0</Text>

      </ScrollView>
    </SafeAreaView>
  );
}