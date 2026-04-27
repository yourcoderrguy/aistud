import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserData = {
  fullName: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean; // Added so App.tsx knows when to show the Splash Screen
  user: UserData | null;
  login: (userData: UserData) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for an existing session on app boot
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@aistud_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error("Failed to restore session", e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (userData: UserData) => {
    try {
      await AsyncStorage.setItem('@aistud_user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
    } catch (e) {
      console.error("Failed to save session", e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@aistud_user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (e) {
      console.error("Failed to clear session", e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);