export type CategoryType = 'Tattoo' | 'Rangoli' | 'Sketch' | 'Portrait' | 'Blood Painting';

export interface Artwork {
  id: string;
  title: string;
  category: CategoryType;
  subcategory: string;
  description: string;
  image: string;
  price: number;
  style: string;
  featured: boolean;
  createdAt: string;
  tags?: string[];
  views?: number;
}

export type OrderStatus = 'New' | 'Contacted' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  refId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: CategoryType | 'Other';
  description: string;
  style?: string;
  budget?: string;
  deadline?: string;
  referenceImage?: string;
  peopleCount?: number;
  paperSize?: string;
  placement?: string;
  tattooSize?: string;
  notes?: string;
  status: OrderStatus;
  createdAt: string;
}

export type BookingSlot = '10:00 AM' | '12:00 PM' | '02:00 PM' | '04:00 PM' | '06:00 PM';
export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Booking {
  id: string;
  refId: string;
  service: CategoryType | 'General Consultation';
  date: string;
  timeSlot: BookingSlot;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  rating: number;
  comment: string;
  avatar?: string;
  date: string;
  location?: string;
}

export interface PricingTier {
  id: string;
  category: CategoryType;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  createdAt: string;
}

export interface FilterState {
  category: string;
  style: string;
  search: string;
  sortBy: 'latest' | 'popular' | 'price-low' | 'price-high';
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinedDate: string;
}
