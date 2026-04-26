import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

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
      {/* Add the new Hubs here so they sit perfectly over the tabs */}
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
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#008080',
        tabBarInactiveTintColor: '#A0AEC0',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ focused, color }) => {
          let iconName: any = 'home';
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Library') iconName = focused ? 'folder' : 'folder-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      {/* We plug the Flows into the Tab buttons here */}
      <Tab.Screen name="Home" component={HomeFlow} />
      <Tab.Screen name="Library" component={LibraryFlow} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}