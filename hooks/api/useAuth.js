import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { authService } from '../../services/authService';
import { QUERY_KEYS } from '../../config/constants';

// Login hook
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.USER], data.user);
      
      // Navigate based on user role
      if (data.user?.role === 'admin') {
        router.replace('/(admin)/dashboard');
      } else {
        router.replace('/(user)/restaurants');
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
};

// Register hook
export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => authService.register(userData),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.USER], data.user);
      router.replace('/(user)/restaurants');
    },
    onError: (error) => {
      console.error('Registration error:', error);
    },
  });
};

// Logout hook
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      router.replace('/(auth)/login');
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Still clear cache and redirect on error
      queryClient.clear();
      router.replace('/(auth)/login');
    },
  });
};

// Forgot password hook
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email) => authService.forgotPassword(email),
    onError: (error) => {
      console.error('Forgot password error:', error);
    },
  });
};

// Reset password hook
export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ token, password }) => authService.resetPassword(token, password),
    onSuccess: () => {
      router.replace('/(auth)/login');
    },
    onError: (error) => {
      console.error('Reset password error:', error);
    },
  });
};
