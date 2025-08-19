import { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(() => getCurrentUser());

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return { user, isAuthenticated: !!user };
};