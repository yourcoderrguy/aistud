// src/navigation/types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// 1. Define the parameters each screen is allowed to accept
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerifyCode: { email: string }; // Strictly requires the email string
  SetNewPassword: { email: string }; // Strictly requires the email string
};

export type MainStackParamList = {
  Dashboard: undefined;
  SummaryHub: undefined;
  CreateSummary: undefined;
  SummaryHistory: undefined;
};

// 2. Navigation Props (Used for the `useNavigation` hook to move between screens)
export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type MainNavigationProp = NativeStackNavigationProp<MainStackParamList>;

// 3. Route Props (Used for the `useRoute` hook to safely extract passed data like the email)
export type VerifyCodeRouteProp = RouteProp<AuthStackParamList, 'VerifyCode'>;
export type SetNewPasswordRouteProp = RouteProp<AuthStackParamList, 'SetNewPassword'>;