import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import all your screens
import DashboardScreen from '../screens/main/DashboardScreen';
import CreateSummaryScreen from '../screens/main/CreateSummaryScreen';
import SummaryResultScreen from '../screens/main/SummaryResultScreen';
import SummaryHistoryScreen from '../screens/main/SummaryHistoryScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import SummariesScreen from '../screens/main/SummariesScreen';
import FlashcardsScreen from '../screens/main/FlashcardsScreen';
import QuizzesScreen from '../screens/main/QuizzesScreen';
import ActiveQuizScreen from '../screens/main/ActiveQuizScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const LibraryStack = createNativeStackNavigator();

// 1. The Home Flow (Dashboard -> Create -> Results)
function HomeFlow() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Dashboard" component={DashboardScreen} />
      <HomeStack.Screen name="CreateSummary" component={CreateSummaryScreen} />
      <HomeStack.Screen name="SummaryResult" component={SummaryResultScreen} />
      <HomeStack.Screen name="SummariesHub" component={SummariesScreen} />
      <HomeStack.Screen name="FlashcardsHub" component={FlashcardsScreen} />
      <HomeStack.Screen name="QuizzesHub" component={QuizzesScreen} />
      <HomeStack.Screen name="ActiveQuiz" component={ActiveQuizScreen} />
    </HomeStack.Navigator>
  );
}

// 2. The Library Flow (History -> Results)
function LibraryFlow() {
  return (
    <LibraryStack.Navigator screenOptions={{ headerShown: false }}>
      <LibraryStack.Screen name="SummaryHistory" component={SummaryHistoryScreen} />
      <LibraryStack.Screen name="SummaryResult" component={SummaryResultScreen} />
    </LibraryStack.Navigator>
  );
}

// 3. The Main Bottom Menu
export default function MainTabs() {
  const insets = useSafeAreaInsets();
  
  // We allocate exactly 60px for the icons/text, PLUS the exact height of the gray dash area.
  const tabBarHeight = Platform.OS === 'ios' ? 60 + insets.bottom : 65;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true, 
        tabBarActiveTintColor: '#008080', 
        tabBarInactiveTintColor: '#9CA3AF', 
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0.5, 
          borderTopColor: '#E5E7EB',
          height: tabBarHeight,
          // Pushes the entire container strictly above the gray dash
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10, 
          paddingTop: 8, 
          elevation: 0, 
          shadowOpacity: 0, 
        },
        tabBarItemStyle: {
          // This groups the icon and text tightly together so the text cannot sink
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 10, 
          fontWeight: '500',
          // Pull the text slightly upwards towards the icon
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
          marginTop: 2,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName: any = 'home';
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeFlow} />
      <Tab.Screen name="Library" component={LibraryFlow} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}