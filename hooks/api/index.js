// Export all API hooks from a single file for easier imports
// Usage: import { useLogin, useRestaurants, useBookings } from '../hooks/api';

// Auth hooks
export {
  useLogin,
  useRegister,
  useLogout,
  useForgotPassword,
  useResetPassword,
} from './useAuth';

// Restaurant hooks
export {
  useRestaurants,
  useRestaurant,
  useRestaurantMenu,
  useRestaurantAvailability,
  useSearchRestaurants,
} from './useRestaurants';

// Booking hooks
export {
  useUserBookings,
  useBooking,
  useBookingHistory,
  useCreateBooking,
  useUpdateBooking,
  useCancelBooking,
} from './useBookings';

// User hooks
export {
  useUserProfile,
  useUpdateProfile,
  useChangePassword,
  useUploadProfilePicture,
} from './useUser';

// Payment hooks
export {
  usePayments,
  usePayment,
  usePaymentStatus,
  useCreatePayment,
} from './usePayments';

// Notification hooks
export {
  useNotifications,
  useUnreadNotificationsCount,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from './useNotifications';

// Admin hooks
export {
  useAdminStats,
  useAdminBookings,
  useAdminInquiries,
  useAdminPayments,
  useAdminSettings,
} from './useAdmin';

// Buffet hooks
export {
  useBuffetPackages,
  useBuffetPackage,
  useCustomizeBuffet,
  useRequestBuffetQuote,
} from './useBuffet';

// Catering hooks
export {
  useCateringPackages,
  useCateringRequest,
  useUserCateringRequests,
  useSubmitCateringRequest,
  useUpdateCateringRequest,
  useCancelCateringRequest,
} from './useCatering';
