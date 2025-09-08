import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, Wojewodztwo } from '@/types';
import { mockWojewodztwa, adminCredentials } from '@/data/mockData';

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
    const savedUser = localStorage.getItem('lzs-auth-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('lzs-auth-user');
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
      localStorage.setItem('lzs-auth-user', JSON.stringify(adminUser));
      return true;
    }

    // Sprawdź czy to województwo
    const wojewodztwo = mockWojewodztwa.find(w => w.login === login && w.haslo === haslo);
    if (wojewodztwo) {
      const wojewodztwoUser: AuthUser = {
        id: wojewodztwo.id,
        role: 'wojewodztwo',
        wojewodztwoId: wojewodztwo.id,
        nazwa: wojewodztwo.nazwa
      };
      setUser(wojewodztwoUser);
      localStorage.setItem('lzs-auth-user', JSON.stringify(wojewodztwoUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lzs-auth-user');
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