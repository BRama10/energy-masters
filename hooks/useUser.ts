// hooks/useUser.ts
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useUser = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    setUsername(storedUsername || null);
  }, []);

  const logout = () => {
    Cookies.remove('username');
    window.location.href = '/login';
  };

  return { username, logout };
};
