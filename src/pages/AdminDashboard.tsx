import React, { useState } from 'react';
import { 
  BarChart3, Layers, ShoppingBag, Calendar, Users, Star, DollarSign, MessageSquare, 
  Settings, Plus, Trash2, Edit3, Lock, LogOut, X, Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Artwork, CategoryType, OrderStatus, BookingStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    artworks, orders, bookings, testimonials, pricingTiers, messages,
    isAdminLoggedIn, loginAdmin, logoutAdmin,
    addArtwork, updateArtwork, deleteArtwork,
    updateOrderStatus, deleteOrder,
    updateBookingStatus, deleteBooking,
    deleteTestimonial
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Artworks' | 'Categories' | 'Orders' | 'Bookings' | 'Customers' | 'Testimonials' | 'Pricing' | 'Messages' | 'Settings'
  >('Overview');

  const [pinInput, setPinInput] = useState('');

  // Artwork Form Modal State for Add / Edit
  const [artworkModalOpen, setArtworkModalOpen] = useState(false);
  const [editingArtworkId, setEditingArtworkId] = useState<string | null>(null);
  const [artworkForm, setArtworkForm] = useState({
    title: '',
    category: 'Tattoo' as CategoryType,
    subcategory: 'Mandala',
    description: '',
    image: '',
    price: 3500,
    style: 'Mandala',
    featured: false,
  });

  // Calculate metrics
  const totalArtworks = artworks.length;
  const pendingOrders = orders.filter(o => o.status === 'New' || o.status === 'Contacted').length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysBookings = bookings.filter(b => b.date === todayStr).length;
  const totalCustomers = new Set([...orders.map(o => o.customerEmail), ...bookings.map(b => b.customerEmail)]).size;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status === 'Completed' ? 4500 : 2500), 18500);

  // Authentication Gate Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="pt-28 pb-20 min-h-[80vh] flex items-center justify-center max-w-md mx-auto px-4">
        <div className="w-full bg-white p-8 rounded-3xl border border-[#E7E0D8] shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#1C1917] text-white flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-8 h-8 text-[#D97706]" />
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Admin Portal Access</h2>
            <p className="text-xs text-[#78716C] mt-1">Enter your Security PIN to access studio management</p>
            <p className="text-[11px] text-[#D97706] mt-0.5 font-medium">(Default Demo PIN: 1234)</p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              loginAdmin(pinInput);
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter PIN (e.g. 1234)"
              className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-center text-lg font-bold tracking-widest text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
            />

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-bold text-sm shadow-md"
            >
              Unlock Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Handle artwork modal save
  const handleSaveArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artworkForm.title.trim() || !artworkForm.image.trim()) return;

    if (editingArtworkId) {
      updateArtwork(editingArtworkId, artworkForm);
    } else {
      addArtwork(artworkForm);
    }

    setArtworkModalOpen(false);
    setEditingArtworkId(null);
    setArtworkForm({
      title: '',
      category: 'Tattoo',
      subcategory: 'Mandala',
      description: '',
      image: '',
      price: 3500,
      style: 'Mandala',
      featured: false,
    });
  };

  const handleEditArtworkClick = (art: Artwork) => {
    setEditingArtworkId(art.id);
    setArtworkForm({
      title: art.title,
      category: art.category,
      subcategory: art.subcategory,
      description: art.description,
      image: art.image,
      price: art.price,
      style: art.style,
      featured: art.featured,
    });
    setArtworkModalOpen(true);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

      {/* ADMIN HEADER BAR */}
      <div className="p-6 rounded-3xl bg-[#1C1917] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#292524] shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D97706] to-[#C85A32] flex items-center justify-center text-white">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">Gayatri Art Studio Admin Console</h1>
            <p className="text-xs text-stone-400">Live Studio Management & Analytics</p>
          </div>
        </div>

        <button
          onClick={logoutAdmin}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 text-xs font-semibold transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin</span>
        </button>
      </div>

      {/* DASHBOARD LAYOUT WITH SIDEBAR + CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR TABS */}
        <div className="lg:col-span-3 space-y-1">
          {[
            { id: 'Overview', label: 'Overview', icon: BarChart3 },
            { id: 'Artworks', label: 'Artworks Portfolio', icon: Layers },
            { id: 'Categories', label: 'Categories', icon: Filter },
            { id: 'Orders', label: 'Custom Orders', icon: ShoppingBag, badge: pendingOrders },
            { id: 'Bookings', label: 'Bookings', icon: Calendar, badge: todaysBookings },
            { id: 'Customers', label: 'Customers', icon: Users },
            { id: 'Testimonials', label: 'Testimonials', icon: Star },
            { id: 'Pricing', label: 'Pricing Tiers', icon: DollarSign },
            { id: 'Messages', label: 'Messages', icon: MessageSquare, badge: messages.filter(m => m.status === 'Unread').length },
            { id: 'Settings', label: 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white shadow-md'
                    : 'bg-white text-[#44403C] hover:bg-[#FAF8F5] border border-[#E7E0D8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${active ? 'bg-white text-[#C85A32]' : 'bg-[#C85A32] text-white'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E0D8] shadow-sm min-h-[600px]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <div className="space-y-8 animate-in fade-in">
              <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Performance Metrics</h2>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] space-y-1">
                  <p className="text-xs text-[#78716C] font-semibold">Total Artworks</p>
                  <p className="font-serif text-3xl font-bold text-[#1C1917]">{totalArtworks}</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] space-y-1">
                  <p className="text-xs text-[#78716C] font-semibold">Pending Orders</p>
                  <p className="font-serif text-3xl font-bold text-[#D97706]">{pendingOrders}</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] space-y-1">
                  <p className="text-xs text-[#78716C] font-semibold">Completed Orders</p>
                  <p className="font-serif text-3xl font-bold text-[#25D366]">{completedOrders}</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] space-y-1">
                  <p className="text-xs text-[#78716C] font-semibold">Today's Bookings</p>
                  <p className="font-serif text-3xl font-bold text-[#C85A32]">{todaysBookings}</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] space-y-1">
                  <p className="text-xs text-[#78716C] font-semibold">Total Customers</p>
                  <p className="font-serif text-3xl font-bold text-[#1E293B]">{totalCustomers}</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] space-y-1">
                  <p className="text-xs text-[#78716C] font-semibold">Total Revenue</p>
                  <p className="font-serif text-3xl font-bold text-[#9A3412]">₹{totalRevenue.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Custom SVG Analytics Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                
                {/* Orders by Service Chart */}
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#1C1917]">Orders by Service Category</h3>
                  
                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Tattoo Art</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#C85A32] w-[45%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Rangoli Art</span>
                        <span>25%</span>
                      </div>
                      <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#D97706] w-[25%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Sketch Art</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1E293B] w-[15%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Portrait Art</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#9A3412] w-[15%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monthly Revenue Trend */}
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#1C1917]">Monthly Revenue Trend (2026)</h3>
                  
                  <div className="flex items-end justify-between h-40 pt-4 px-2">
                    {[
                      { month: 'Jan', val: 60 },
                      { month: 'Feb', val: 85 },
                      { month: 'Mar', val: 100 },
                    ].map((m) => (
                      <div key={m.month} className="flex flex-col items-center gap-2 w-1/4">
                        <div 
                          className="w-12 bg-gradient-to-t from-[#D97706] to-[#C85A32] rounded-t-lg transition-all"
                          style={{ height: `${m.val}%` }}
                        ></div>
                        <span className="text-xs font-bold text-[#78716C]">{m.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: ARTWORKS CRUD */}
          {activeTab === 'Artworks' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Artwork Inventory</h2>
                <button
                  onClick={() => {
                    setEditingArtworkId(null);
                    setArtworkForm({
                      title: '',
                      category: 'Tattoo',
                      subcategory: 'Mandala',
                      description: '',
                      image: '',
                      price: 3500,
                      style: 'Mandala',
                      featured: false,
                    });
                    setArtworkModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#C85A32] text-white text-xs font-bold shadow-md hover:bg-[#9A3412] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Artwork</span>
                </button>
              </div>

              {/* Artwork Table */}
              <div className="overflow-x-auto border border-[#E7E0D8] rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] border-b border-[#E7E0D8] font-bold text-[#1C1917] uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Artwork</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Style</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Featured</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E0D8]">
                    {artworks.map((art) => (
                      <tr key={art.id} className="hover:bg-[#FAF8F5]">
                        <td className="p-3 flex items-center gap-3">
                          <img src={art.image} alt={art.title} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-serif font-bold text-[#1C1917] line-clamp-1">{art.title}</span>
                        </td>
                        <td className="p-3 font-semibold text-[#C85A32]">{art.category}</td>
                        <td className="p-3 text-[#78716C]">{art.style}</td>
                        <td className="p-3 font-bold">₹{art.price}</td>
                        <td className="p-3">
                          {art.featured ? (
                            <span className="px-2 py-0.5 rounded-full bg-[#25D366]/10 text-[#25D366] font-bold">Yes</span>
                          ) : (
                            <span className="text-[#78716C]">No</span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button 
                            onClick={() => handleEditArtworkClick(art)}
                            className="p-1.5 rounded-lg bg-amber-50 text-[#D97706] hover:bg-amber-100"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteArtwork(art.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES */}
          {activeTab === 'Categories' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Studio Categories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Tattoo', 'Blood Painting', 'Rangoli', 'Sketch', 'Portrait'].map(cat => (
                  <div key={cat} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] flex justify-between items-center">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#1C1917]">{cat} Art</h3>
                      <p className="text-xs text-[#78716C]">{artworks.filter(a => a.category === cat).length} active items</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#C85A32] text-white text-xs font-bold">Active</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ORDERS */}
          {activeTab === 'Orders' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Custom Commission Orders</h2>
              
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-5 rounded-2xl border border-[#E7E0D8] bg-[#FAF8F5] space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E7E0D8] pb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#C85A32]">{ord.refId}</span>
                        <h4 className="font-serif text-base font-bold text-[#1C1917]">{ord.customerName} ({ord.serviceType})</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-[#E7E0D8] text-[#1C1917]"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button onClick={() => deleteOrder(ord.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-[#44403C] leading-relaxed">{ord.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-[11px] text-[#78716C] font-medium pt-1">
                      <span>Phone: {ord.customerPhone}</span>
                      <span>Email: {ord.customerEmail}</span>
                      <span>Budget: {ord.budget || 'N/A'}</span>
                      <span>Style: {ord.style || 'N/A'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BOOKINGS */}
          {activeTab === 'Bookings' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Studio Appointments</h2>

              <div className="space-y-4">
                {bookings.map((bk) => (
                  <div key={bk.id} className="p-5 rounded-2xl border border-[#E7E0D8] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-mono text-xs font-bold text-[#D97706]">{bk.refId}</span>
                      <h4 className="font-serif text-base font-bold text-[#1C1917]">{bk.customerName} — {bk.service}</h4>
                      <p className="text-xs text-[#78716C]">📅 {bk.date} at {bk.timeSlot} • 📞 {bk.customerPhone}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={bk.status}
                        onChange={(e) => updateBookingStatus(bk.id, e.target.value as BookingStatus)}
                        className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E7E0D8]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button onClick={() => deleteBooking(bk.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOMERS */}
          {activeTab === 'Customers' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Customer Directory</h2>
              <div className="border border-[#E7E0D8] rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] font-bold border-b border-[#E7E0D8]">
                    <tr>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Phone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E0D8]">
                    {Array.from(new Set([...orders.map(o => o.customerName), ...bookings.map(b => b.customerName)])).map((name, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5]">
                        <td className="p-3 font-bold">{name}</td>
                        <td className="p-3 text-[#78716C]">client@example.com</td>
                        <td className="p-3 text-[#78716C]">+91 87882 25420</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: TESTIMONIALS */}
          {activeTab === 'Testimonials' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Manage Testimonials</h2>
              <div className="space-y-3">
                {testimonials.map(t => (
                  <div key={t.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm">{t.name} ({t.service})</h4>
                      <p className="text-xs text-[#78716C] italic">"{t.comment}"</p>
                    </div>
                    <button onClick={() => deleteTestimonial(t.id)} className="text-red-500 p-1.5 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: PRICING */}
          {activeTab === 'Pricing' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Portrait Pricing Packages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {pricingTiers.map(p => (
                  <div key={p.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] space-y-2">
                    <h3 className="font-bold text-base">{p.name}</h3>
                    <p className="font-serif text-2xl font-bold text-[#C85A32]">₹{p.price}</p>
                    <p className="text-xs text-[#78716C]">{p.features.length} features included</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: MESSAGES */}
          {activeTab === 'Messages' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Contact Messages</h2>
              <div className="space-y-3">
                {messages.map(m => (
                  <div key={m.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm">{m.name} ({m.phone})</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.status === 'Unread' ? 'bg-red-100 text-red-600' : 'bg-stone-200 text-stone-600'}`}>
                        {m.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#44403C]">{m.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: SETTINGS */}
          {activeTab === 'Settings' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Studio Settings</h2>
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] space-y-3">
                <p className="text-xs text-[#78716C]">Studio Name: Gayatri Art Studio</p>
                <p className="text-xs text-[#78716C]">Location: Deccan Gymkhana, Pune, Maharashtra</p>
                <p className="text-xs text-[#78716C]">Contact: +91 87882 25420</p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ARTWORK EDIT/ADD MODAL */}
      {artworkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E7E0D8] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#E7E0D8] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                {editingArtworkId ? 'Edit Artwork' : 'Add New Artwork'}
              </h3>
              <button onClick={() => setArtworkModalOpen(false)}>
                <X className="w-5 h-5 text-[#78716C]" />
              </button>
            </div>

            <form onSubmit={handleSaveArtwork} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#1C1917] mb-1">Title *</label>
                <input
                  type="text"
                  value={artworkForm.title}
                  onChange={(e) => setArtworkForm({ ...artworkForm, title: e.target.value })}
                  placeholder="e.g. Royal Bengal Tiger Sketch"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1C1917] mb-1">Category</label>
                  <select
                    value={artworkForm.category}
                    onChange={(e) => setArtworkForm({ ...artworkForm, category: e.target.value as CategoryType })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8]"
                  >
                    <option value="Tattoo">Tattoo</option>
                    <option value="Blood Painting">Blood Painting</option>
                    <option value="Rangoli">Rangoli</option>
                    <option value="Sketch">Sketch</option>
                    <option value="Portrait">Portrait</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1C1917] mb-1">Style</label>
                  <input
                    type="text"
                    value={artworkForm.style}
                    onChange={(e) => setArtworkForm({ ...artworkForm, style: e.target.value })}
                    placeholder="e.g. Minimal, Charcoal"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1C1917] mb-1">Image Unsplash URL *</label>
                <input
                  type="text"
                  value={artworkForm.image}
                  onChange={(e) => setArtworkForm({ ...artworkForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1C1917] mb-1">Estimated Price (₹)</label>
                <input
                  type="number"
                  value={artworkForm.price}
                  onChange={(e) => setArtworkForm({ ...artworkForm, price: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1C1917] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={artworkForm.description}
                  onChange={(e) => setArtworkForm({ ...artworkForm, description: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={artworkForm.featured}
                  onChange={(e) => setArtworkForm({ ...artworkForm, featured: e.target.checked })}
                />
                <label htmlFor="featured" className="font-bold text-[#1C1917]">Feature on Home Page</label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#C85A32] text-white font-bold shadow-md"
              >
                Save Artwork
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
