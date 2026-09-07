import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  Artwork, Order, Booking, Testimonial, PricingTier, ContactMessage, 
  OrderStatus, BookingStatus, BookingSlot, ClientUser
} from '../types';
import { 
  INITIAL_ARTWORKS, INITIAL_ORDERS, INITIAL_BOOKINGS, 
  INITIAL_TESTIMONIALS, PORTRAIT_PRICING_TIERS, INITIAL_MESSAGES 
} from '../data/mockData';

interface AppContextType {
  artworks: Artwork[];
  orders: Order[];
  bookings: Booking[];
  testimonials: Testimonial[];
  pricingTiers: PricingTier[];
  messages: ContactMessage[];
  selectedArtworkModal: Artwork | null;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  isAdminLoggedIn: boolean;
  currentClient: ClientUser | null;
  loginClient: (emailOrPhone: string, customName?: string) => boolean;
  logoutClient: () => void;
  
  // Actions
  addArtwork: (artworkData: Omit<Artwork, 'id' | 'createdAt' | 'views'>) => void;
  updateArtwork: (id: string, artworkData: Partial<Artwork>) => void;
  deleteArtwork: (id: string) => void;
  
  addOrder: (orderData: Omit<Order, 'id' | 'refId' | 'status' | 'createdAt'>) => string;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;
  
  addBooking: (bookingData: Omit<Booking, 'id' | 'refId' | 'status' | 'createdAt'>) => string;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  deleteBooking: (id: string) => void;
  
  addTestimonial: (testimonialData: Omit<Testimonial, 'id' | 'date'>) => void;
  deleteTestimonial: (id: string) => void;
  
  addMessage: (messageData: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => void;
  updateMessageStatus: (id: string, status: 'Unread' | 'Read' | 'Replied') => void;
  
  setSelectedArtworkModal: (artwork: Artwork | null) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  isSlotBooked: (date: string, slot: BookingSlot) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage or mock defaults
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const saved = localStorage.getItem('artgaathi_artworks');
    return saved ? JSON.parse(saved) : INITIAL_ARTWORKS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('artgaathi_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('artgaathi_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('artgaathi_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [pricingTiers] = useState<PricingTier[]>(() => {
    const saved = localStorage.getItem('artgaathi_pricing');
    return saved ? JSON.parse(saved) : PORTRAIT_PRICING_TIERS;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('artgaathi_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [selectedArtworkModal, setSelectedArtworkModal] = useState<Artwork | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('artgaathi_admin_auth') === 'true';
  });

  const [currentClient, setCurrentClient] = useState<ClientUser | null>(() => {
    const saved = localStorage.getItem('gayatri_current_client');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentClient) {
      localStorage.setItem('gayatri_current_client', JSON.stringify(currentClient));
    } else {
      localStorage.removeItem('gayatri_current_client');
    }
  }, [currentClient]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('artgaathi_artworks', JSON.stringify(artworks));
  }, [artworks]);

  useEffect(() => {
    localStorage.setItem('artgaathi_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('artgaathi_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('artgaathi_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('artgaathi_messages', JSON.stringify(messages));
  }, [messages]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Artwork CRUD
  const addArtwork = (artworkData: Omit<Artwork, 'id' | 'createdAt' | 'views'>) => {
    const newArtwork: Artwork = {
      ...artworkData,
      id: 'art-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      views: 0,
    };
    setArtworks(prev => [newArtwork, ...prev]);
    showToast('New artwork successfully added!');
  };

  const updateArtwork = (id: string, artworkData: Partial<Artwork>) => {
    setArtworks(prev => prev.map(art => art.id === id ? { ...art, ...artworkData } : art));
    showToast('Artwork updated successfully');
  };

  const deleteArtwork = (id: string) => {
    setArtworks(prev => prev.filter(art => art.id !== id));
    showToast('Artwork deleted', 'info');
  };

  // Order Flow
  const addOrder = (orderData: Omit<Order, 'id' | 'refId' | 'status' | 'createdAt'>): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refId = `AG-2026-${randomNum}`;
    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      refId,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    showToast(`Order request submitted! Your Reference ID is ${refId}`);
    return refId;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(ord => ord.id === id ? { ...ord, status } : ord));
    showToast(`Order status updated to ${status}`);
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(ord => ord.id !== id));
    showToast('Order removed', 'info');
  };

  // Booking Flow
  const addBooking = (bookingData: Omit<Booking, 'id' | 'refId' | 'status' | 'createdAt'>): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refId = `AG-BK-${randomNum}`;
    const newBooking: Booking = {
      ...bookingData,
      id: 'bk-' + Date.now(),
      refId,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Appointment requested! Reference ID: ${refId}`);
    return refId;
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(prev => prev.map(bk => bk.id === id ? { ...bk, status } : bk));
    showToast(`Booking status changed to ${status}`);
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(bk => bk.id !== id));
    showToast('Booking deleted', 'info');
  };

  // Check if a time slot is already booked on a date
  const isSlotBooked = (date: string, timeSlot: BookingSlot): boolean => {
    return bookings.some(bk => bk.date === date && bk.timeSlot === timeSlot && bk.status !== 'Cancelled');
  };

  // Testimonials & Messages
  const addTestimonial = (testimonialData: Omit<Testimonial, 'id' | 'date'>) => {
    const newT: Testimonial = {
      ...testimonialData,
      id: 't-' + Date.now(),
      date: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
    };
    setTestimonials(prev => [newT, ...prev]);
    showToast('Thank you! Your review has been published.');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    showToast('Testimonial removed');
  };

  const addMessage = (messageData: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => {
    const newMsg: ContactMessage = {
      ...messageData,
      id: 'msg-' + Date.now(),
      status: 'Unread',
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [newMsg, ...prev]);
    showToast('Message sent! We will get back to you shortly.');
  };

  const updateMessageStatus = (id: string, status: 'Unread' | 'Read' | 'Replied') => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  // Admin Auth (PIN default: 1234 or direct login)
  const loginAdmin = (pin: string): boolean => {
    if (pin === '1234' || pin === 'admin' || pin.trim().length > 0) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('artgaathi_admin_auth', 'true');
      showToast('Welcome to Gayatri Art Studio Admin Dashboard!');
      return true;
    }
    showToast('Invalid Security PIN', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.setItem('artgaathi_admin_auth', 'false');
    showToast('Logged out of Admin Dashboard', 'info');
  };

  const loginClient = (emailOrPhone: string, customName?: string): boolean => {
    const cleanInput = emailOrPhone.trim().toLowerCase();
    if (!cleanInput) {
      showToast('Please enter your email or phone number', 'error');
      return false;
    }

    // Try to match existing order or booking
    const matchedOrder = orders.find(o => 
      o.customerEmail.toLowerCase() === cleanInput || 
      o.customerPhone.replace(/\D/g, '').endsWith(cleanInput.replace(/\D/g, '').slice(-10))
    );
    const matchedBooking = bookings.find(b => 
      b.customerEmail.toLowerCase() === cleanInput || 
      b.customerPhone.replace(/\D/g, '').endsWith(cleanInput.replace(/\D/g, '').slice(-10))
    );

    const detectedName = customName?.trim() || matchedOrder?.customerName || matchedBooking?.customerName || 'Studio Client';
    const detectedPhone = matchedOrder?.customerPhone || matchedBooking?.customerPhone || (cleanInput.includes('@') ? '+91 87882 25420' : emailOrPhone.trim());
    const detectedEmail = matchedOrder?.customerEmail || matchedBooking?.customerEmail || (cleanInput.includes('@') ? cleanInput : 'client@gayatriartstudio.com');

    const user: ClientUser = {
      id: 'client-' + Date.now(),
      name: detectedName,
      email: detectedEmail,
      phone: detectedPhone,
      joinedDate: 'March 2026',
    };

    setCurrentClient(user);
    showToast(`Welcome back, ${user.name}!`);
    return true;
  };

  const logoutClient = () => {
    setCurrentClient(null);
    showToast('Logged out of Client Portal', 'info');
  };

  return (
    <AppContext.Provider value={{
      artworks,
      orders,
      bookings,
      testimonials,
      pricingTiers,
      messages,
      selectedArtworkModal,
      toast,
      isAdminLoggedIn,
      currentClient,
      loginClient,
      logoutClient,
      addArtwork,
      updateArtwork,
      deleteArtwork,
      addOrder,
      updateOrderStatus,
      deleteOrder,
      addBooking,
      updateBookingStatus,
      deleteBooking,
      addTestimonial,
      deleteTestimonial,
      addMessage,
      updateMessageStatus,
      setSelectedArtworkModal,
      showToast,
      loginAdmin,
      logoutAdmin,
      isSlotBooked,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
