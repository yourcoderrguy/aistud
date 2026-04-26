import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerifyCode: { email: string };
  SetNewPassword: { email: string };
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

// We use 'any' here temporarily so you can rapid-prototype your navigation 
// without TypeScript crashing every time you add a new screen!
export type MainNavigationProp = any;