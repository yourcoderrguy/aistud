import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define what a User looks like
export type UserData = {
  fullName: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserData | null; // Add the user state
  login: (userData: UserData) => void; // Login now requires user data
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  // When logging in, we save the user's details
  const login = (userData: UserData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);