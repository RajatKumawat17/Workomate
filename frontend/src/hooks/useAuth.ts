import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { AuthService } from '../services/auth';

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, setUser, setToken, setLoading, logout } = useAuthStore();

  const login = () => {
    window.location.href = AuthService.getGoogleAuthUrl();
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
      localStorage.removeItem('token');
    }
  };

  const verifyAuth = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const user = await AuthService.verifyToken();
      setUser(user);
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, [token]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout: handleLogout,
    verifyAuth,
  };
};