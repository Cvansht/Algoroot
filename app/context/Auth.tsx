'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
  deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (username: string, password: string) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    if (storedUsers[username] === password) {
      setUser(username);
      localStorage.setItem('user', username);
      alert('Login successful!');
      return true;
    }
    alert('Invalid username or password!');
    return false;
  };

  const signup = (username: string, password: string) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    if (storedUsers[username]) {
      alert('Username already exists!');
      return false;
    }
    storedUsers[username] = password;
    localStorage.setItem('users', JSON.stringify(storedUsers));
    localStorage.setItem('user', username);
    setUser(username);
    alert('Signup successful!');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    alert('You have been logged out.');
  };

  const deleteAccount = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    if (user && storedUsers[user]) {
      delete storedUsers[user];
      localStorage.setItem('users', JSON.stringify(storedUsers));
    }
    logout();
    alert('Account deleted successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
