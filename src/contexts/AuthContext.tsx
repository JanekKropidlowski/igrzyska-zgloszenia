import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, Szkola } from '@/types';
import { mockSzkoly, adminCredentials } from '@/data/mockData';

interface AuthContextType {
  user: AuthUser | null;
  login: (login: string, haslo: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sprawdź czy użytkownik jest zalogowany (localStorage)
    const savedUser = localStorage.getItem('strzelnica-auth-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('strzelnica-auth-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (login: string, haslo: string): boolean => {
    // Sprawdź czy to admin
    if (login === adminCredentials.login && haslo === adminCredentials.haslo) {
      const adminUser: AuthUser = {
        id: 'admin',
        role: 'admin',
        nazwa: 'Administrator'
      };
      setUser(adminUser);
      localStorage.setItem('strzelnica-auth-user', JSON.stringify(adminUser));
      return true;
    }

    // Sprawdź czy to szkoła
    const szkola = mockSzkoly.find(s => s.login === login && s.haslo === haslo);
    if (szkola) {
      const szkolaUser: AuthUser = {
        id: szkola.id,
        role: 'szkola',
        szkolaId: szkola.id,
        nazwa: szkola.nazwa
      };
      setUser(szkolaUser);
      localStorage.setItem('strzelnica-auth-user', JSON.stringify(szkolaUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('strzelnica-auth-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}