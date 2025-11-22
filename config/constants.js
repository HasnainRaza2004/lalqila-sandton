// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/Account/UsersSignUp',
  LOGOUT: '/Account/logout',
  FORGOT_PASSWORD: '/Account/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  REFRESH_TOKEN: '/auth/refresh-token',

  // User
  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile/update',
  CHANGE_PASSWORD: '/user/change-password',

  // Restaurants
  RESTAURANTS: '/restaurants',
  RESTAURANT_DETAILS: (id) => `/restaurants/${id}`,
  RESTAURANT_MENU: (id) => `/restaurants/${id}/menu`,
  RESTAURANT_AVAILABILITY: (id) => `/restaurants/${id}/availability`,

  // Bookings
  BOOKINGS: '/bookings',
  CREATE_BOOKING: '/bookings/create',
  BOOKING_DETAILS: (id) => `/bookings/${id}`,
  UPDATE_BOOKING: (id) => `/bookings/${id}/update`,
  CANCEL_BOOKING: (id) => `/bookings/${id}/cancel`,
  USER_BOOKINGS: '/bookings/user',
  BOOKING_HISTORY: '/bookings/history',

  // Payments
  PAYMENTS: '/payments',
  CREATE_PAYMENT: '/payments/create',
  PAYMENT_DETAILS: (id) => `/payments/${id}`,
  PAYMENT_STATUS: (id) => `/payments/${id}/status`,

  // Buffet
  BUFFET_PACKAGES: '/buffet/packages',
  BUFFET_CUSTOMIZE: '/buffet/customize',

  // Catering
  CATERING_PACKAGES: '/catering/packages',
  CATERING_REQUEST: '/catering/request',

  // Notifications
  NOTIFICATIONS: '/notifications',
  MARK_READ: (id) => `/notifications/${id}/read`,
  MARK_ALL_READ: '/notifications/mark-all-read',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_INQUIRIES: '/admin/inquiries',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_STATS: '/admin/stats',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
  USER_ROLE: 'userRole',
};

// Query Keys for React Query
export const QUERY_KEYS = {
  // Auth
  USER: 'user',
  
  // Restaurants
  RESTAURANTS: 'restaurants',
  RESTAURANT_DETAILS: (id) => ['restaurant', id],
  RESTAURANT_MENU: (id) => ['restaurant-menu', id],
  
  // Bookings
  BOOKINGS: 'bookings',
  BOOKING_DETAILS: (id) => ['booking', id],
  USER_BOOKINGS: 'user-bookings',
  BOOKING_HISTORY: 'booking-history',
  
  // Notifications
  NOTIFICATIONS: 'notifications',
  
  // Admin
  ADMIN_DASHBOARD: 'admin-dashboard',
  ADMIN_BOOKINGS: 'admin-bookings',
  ADMIN_STATS: 'admin-stats',
};
