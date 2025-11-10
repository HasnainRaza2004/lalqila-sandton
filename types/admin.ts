export interface Booking {
  id: string;
  date: string;
  time: string;
  partySize: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  setupType?: string;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
}

export interface Setup {
  id: string;
  title: string;
  capacity: number;
  price: number;
  image: string;
  description?: string;
  features?: string[];
}

export interface BuffetItem {
  id: string;
  name: string;
  category: 'starter' | 'main' | 'dessert' | 'beverage';
  price?: number;
}

export interface DashboardStats {
  totalBookings: number;
  pendingApprovals: number;
  confirmedEvents: number;
  completed: number;
}

export interface PaymentSummaryData {
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
}