import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Replace this with your actual API base URL
export const API_BASE_URL = 'https://api-erms.xqura.com/';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Clear token and redirect to login
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('user');
        // You can add navigation logic here if needed
      } catch (err) {
        console.error('Error handling 401:', err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
