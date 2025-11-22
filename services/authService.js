import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../config/api';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config/constants';

export const authService = {
  // Login
  login: async (credentials) => {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
    
    if (response.data.token) {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
      if (response.data.user?.role) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_ROLE, response.data.user.role);
      }
    }
    
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
    
    if (response.data.token) {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  // Logout
  logout: async () => {
    try {
      await apiClient.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear local storage regardless of API call result
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.USER_ROLE,
      ]);
    }
  },

  // Forgot Password
  forgotPassword: async (email) => {
    const response = await apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
    return response.data;
  },

  // Reset Password
  resetPassword: async (token, newPassword) => {
    const response = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD, {
      token,
      password: newPassword,
    });
    return response.data;
  },

  // Verify Email
  verifyEmail: async (token) => {
    const response = await apiClient.post(API_ENDPOINTS.VERIFY_EMAIL, { token });
    return response.data;
  },

  // Get Current User
  getCurrentUser: async () => {
    const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userJson ? JSON.parse(userJson) : null;
  },

  // Get Auth Token
  getToken: async () => {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return !!token;
  },
};
