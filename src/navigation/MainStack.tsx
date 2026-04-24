import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from './types';

import DashboardScreen from '../screens/main/DashboardScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      {/* We will add SummaryHub, CreateSummary, etc. here later */}
    </Stack.Navigator>
  );
}