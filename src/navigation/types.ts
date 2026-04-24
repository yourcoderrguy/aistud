
// src/navigation/types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerifyCode: { email: string }; // Requires an email to be passed
  SetNewPassword: { email: string };
};

export type MainStackParamList = {
  Dashboard: undefined;
  SummaryHub: undefined;
  CreateSummary: undefined;
  SummaryHistory: undefined;
};

// This type helps us type our `useNavigation` hooks later
export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type MainNavigationProp = NativeStackNavigationProp<MainStackParamList>;