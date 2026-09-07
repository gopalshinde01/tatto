import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  User, Shield, Lock, Mail, ArrowRight, CheckCircle2, 
  Calendar, Clock, LogOut, MessageSquare, AlertCircle, 
  Sparkles, ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudioLogo } from '../components/common/StudioLogo';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('type') === 'admin' ? 'admin' : 'client';

  const { 
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin, 
    currentClient, 
    loginClient, 
    logoutClient, 
    orders, 
    bookings 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'client' | 'admin'>(defaultTab);

  // Client form state
  const [clientIdentifier, setClientIdentifier] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientError, setClientError] = useState('');

  // Admin form state
  const [adminPin, setAdminPin] = useState('');
  const [adminError, setAdminError] = useState('');

  // Handle Client Login
  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientIdentifier.trim()) {
      setClientError('Please enter your mobile number or email address');
      return;
    }
    setClientError('');
    const success = loginClient(clientIdentifier, clientName || undefined);
    if (success) {
      setClientIdentifier('');
      setClientName('');
    }
  };

  // Quick client test sign-in
  const handleQuickClient = (identifier: string, name: string) => {
    setClientIdentifier(identifier);
    setClientName(name);
    loginClient(identifier, name);
  };

  // Handle Admin Login
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPin.trim()) {
      setAdminError('Please enter your studio security PIN');
      return;
    }
    setAdminError('');
    const success = loginAdmin(adminPin);
    if (success) {
      navigate('/admin');
    } else {
      setAdminError('Invalid security PIN. Try default PIN: 1234');
    }
  };

  // Filter client's specific orders & bookings if logged in
  const clientOrders = currentClient 
    ? orders.filter(o => 
        o.customerEmail.toLowerCase() === currentClient.email.toLowerCase() ||
        o.customerPhone.replace(/\D/g, '').endsWith(currentClient.phone.replace(/\D/g, '').slice(-10)) ||
        o.customerName.toLowerCase().includes(currentClient.name.toLowerCase().split(' ')[0])
      )
    : [];

  const clientBookings = currentClient
    ? bookings.filter(b => 
        b.customerEmail.toLowerCase() === currentClient.email.toLowerCase() ||
        b.customerPhone.replace(/\D/g, '').endsWith(currentClient.phone.replace(/\D/g, '').slice(-10)) ||
        b.customerName.toLowerCase().includes(currentClient.name.toLowerCase().split(' ')[0])
      )
    : [];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center mb-4">
          <StudioLogo size="lg" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
          Gayatri Art Studio Portal
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#78716C]">
          Sign in to your client account or access the artist & studio administration suite.
        </p>

        {/* DUAL SELECTOR TABS */}
        <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-[#E7E0D8]/60 border border-[#E7E0D8] shadow-inner max-w-md w-full">
          <button
            type="button"
            onClick={() => setActiveTab('client')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'client'
                ? 'bg-white text-[#C85A32] shadow-md shadow-[#C85A32]/10'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Client / Customer Portal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'admin'
                ? 'bg-[#1C1917] text-white shadow-md'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <Shield className="w-4 h-4 text-[#D97706]" />
            <span>Artist & Studio Admin</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. CLIENT PORTAL TAB */}
      {/* ========================================================================= */}
      {activeTab === 'client' && (
        <div>
          {currentClient ? (
            /* CLIENT DASHBOARD VIEW (LOGGED IN) */
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Profile Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E0D8] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D97706] to-[#C85A32] text-white font-serif text-2xl font-bold flex items-center justify-center shadow-md">
                    {currentClient.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif text-2xl font-bold text-[#1C1917]">{currentClient.name}</h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        Active Client
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-[#78716C]">
                      <span>📞 {currentClient.phone}</span>
                      <span>✉️ {currentClient.email}</span>
                      <span>🗓️ Member since {currentClient.joinedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href="https://wa.me/918788225420?text=Hi!%20I%20am%20logged%20into%20my%20Gayatri%20Art%20Studio%20client%20portal%20and%20need%20assistance."
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow hover:bg-[#20ba59] transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Studio</span>
                  </a>
                  <button
                    onClick={logoutClient}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-[#1C1917] hover:text-red-600 font-bold text-xs hover:border-red-200 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* STATS TILES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#E7E0D8] shadow-sm">
                  <p className="text-xs text-[#78716C] uppercase font-bold tracking-wider">Active Commissions</p>
                  <p className="font-serif text-3xl font-extrabold text-[#C85A32] mt-2">
                    {clientOrders.length > 0 ? clientOrders.length : orders.slice(0, 1).length}
                  </p>
                  <p className="text-[11px] text-[#78716C] mt-1">Custom artwork requests</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E7E0D8] shadow-sm">
                  <p className="text-xs text-[#78716C] uppercase font-bold tracking-wider">Studio Bookings</p>
                  <p className="font-serif text-3xl font-extrabold text-[#D97706] mt-2">
                    {clientBookings.length > 0 ? clientBookings.length : bookings.slice(0, 1).length}
                  </p>
                  <p className="text-[11px] text-[#78716C] mt-1">Appointments & consultations</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E7E0D8] shadow-sm">
                  <p className="text-xs text-[#78716C] uppercase font-bold tracking-wider">Studio Location</p>
                  <p className="font-serif text-lg font-bold text-[#1C1917] mt-2">Deccan Gymkhana</p>
                  <p className="text-[11px] text-[#78716C] mt-1">Pune, Maharashtra 411004</p>
                </div>
              </div>

              {/* CLIENT ORDERS LIST */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E0D8] shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E7E0D8] pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1C1917]">Your Custom Artwork Requests</h3>
                    <p className="text-xs text-[#78716C] mt-0.5">Track drafts, stencil reviews, and completion milestones.</p>
                  </div>
                  <Link
                    to="/custom-order"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-medium text-xs shadow hover:shadow-md transition-all"
                  >
                    <span>Request New Artwork</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {(clientOrders.length > 0 ? clientOrders : orders.slice(0, 2)).map((ord) => (
                  <div key={ord.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] space-y-3">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#C85A32] bg-[#C85A32]/10 px-2.5 py-1 rounded-md">
                          {ord.refId}
                        </span>
                        <span className="font-bold text-sm text-[#1C1917]">{ord.serviceType} Order</span>
                      </div>
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                        ord.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        ord.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                        'bg-stone-200 text-stone-800'
                      }`}>
                        Status: {ord.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#44403C] leading-relaxed">{ord.description}</p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#E7E0D8] text-xs">
                      <div className="flex items-center gap-4 text-[#78716C]">
                        {ord.budget && <span>Budget: <strong className="text-[#1C1917]">{ord.budget}</strong></span>}
                        {ord.style && <span>Style: <strong className="text-[#1C1917]">{ord.style}</strong></span>}
                      </div>

                      <a
                        href={`https://wa.me/918788225420?text=Hi!%20I%20am%20checking%20the%20status%20of%20my%20order%20Ref%20ID%20${ord.refId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:underline"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat regarding {ord.refId}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* CLIENT BOOKINGS LIST */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E0D8] shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E7E0D8] pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1C1917]">Your Studio Bookings</h3>
                    <p className="text-xs text-[#78716C] mt-0.5">In-person consultations and artist appointments.</p>
                  </div>
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C1917] text-white font-medium text-xs hover:bg-black transition-all"
                  >
                    <span>Book New Slot</span>
                    <Calendar className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {(clientBookings.length > 0 ? clientBookings : bookings.slice(0, 1)).map((bk) => (
                  <div key={bk.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#D97706] bg-[#D97706]/10 px-2.5 py-1 rounded-md">
                          {bk.refId}
                        </span>
                        <span className="font-bold text-sm text-[#1C1917]">{bk.service}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#78716C]">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#C85A32]" /> {bk.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#D97706]" /> {bk.timeSlot}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                        bk.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {bk.status}
                      </span>
                      <a
                        href={`https://wa.me/918788225420?text=Hi!%20I%20have%20an%20appointment%20with%20Ref%20ID%20${bk.refId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-white border border-[#E7E0D8] text-[#25D366] hover:bg-emerald-50 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* CLIENT LOGIN FORM (LOGGED OUT) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
              
              {/* Left Column: Login Form */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E0D8] shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider">Client Sign In</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
                    Access Your Artwork Orders
                  </h2>
                  <p className="text-xs sm:text-sm text-[#78716C] mt-1">
                    Enter your mobile number or email used when placing your tattoo, portrait, rangoli, or sketch commission.
                  </p>
                </div>

                {clientError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{clientError}</span>
                  </div>
                )}

                <form onSubmit={handleClientSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">
                      Mobile Number or Email *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#78716C]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={clientIdentifier}
                        onChange={(e) => setClientIdentifier(e.target.value)}
                        placeholder="e.g. 8788225420 or client@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">
                      Your Name (Optional / For New Clients)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#78716C]">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Sign In to Client Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* QUICK ONE-CLICK DEMO CLIENT LOGINS */}
                <div className="pt-4 border-t border-[#E7E0D8] space-y-3">
                  <p className="text-xs font-bold text-[#78716C] uppercase tracking-wider">
                    Quick Demo One-Click Sign In:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickClient('+91 87882 25420', 'Aarav Sharma')}
                      className="p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#E7E0D8]/50 border border-[#E7E0D8] text-left transition-colors"
                    >
                      <p className="font-bold text-xs text-[#1C1917]">Aarav Sharma</p>
                      <p className="text-[11px] text-[#C85A32]">Tattoo Order (+91 87882 25420)</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickClient('priya.d@example.com', 'Priya Deshmukh')}
                      className="p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#E7E0D8]/50 border border-[#E7E0D8] text-left transition-colors"
                    >
                      <p className="font-bold text-xs text-[#1C1917]">Priya Deshmukh</p>
                      <p className="text-[11px] text-[#D97706]">Portrait Order (priya.d@example.com)</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Portal Benefits */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-3xl bg-[#1C1917] text-white border border-[#292524] shadow-xl space-y-4">
                  <div className="inline-flex p-3 rounded-2xl bg-[#292524] text-[#D97706]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Why Sign In?</h3>
                  <ul className="space-y-3 text-xs text-stone-300">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                      <span><strong>Real-Time Order Tracking:</strong> Follow stencil design, inking stages, framing, and delivery.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                      <span><strong>Direct Reference Sync:</strong> WhatsApp integration with your unique Ref ID.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                      <span><strong>Studio Consultation Bookings:</strong> View upcoming studio time slots in Pune.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#E7E0D8] shadow-sm flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-[#1C1917]">Need urgent assistance?</h4>
                    <p className="text-[11px] text-[#78716C] mt-0.5">Reach our studio on WhatsApp directly</p>
                  </div>
                  <a
                    href="https://wa.me/918788225420"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ARTIST & STUDIO ADMIN TAB */}
      {/* ========================================================================= */}
      {activeTab === 'admin' && (
        <div className="max-w-xl mx-auto animate-in fade-in duration-300">
          {isAdminLoggedIn ? (
            /* ADMIN ALREADY LOGGED IN VIEW */
            <div className="p-8 rounded-3xl bg-white border border-[#E7E0D8] shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#1C1917] text-[#D97706] mx-auto flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#D97706] text-xs font-bold uppercase tracking-wider">
                  Admin Session Active
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#1C1917] mt-3">
                  Studio Administration Suite
                </h2>
                <p className="text-xs text-[#78716C] mt-1 max-w-sm mx-auto">
                  You are currently authenticated as Studio Lead / Administrator for Gayatri Art Studio.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/admin')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Open Full Admin Dashboard</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={logoutAdmin}
                  className="px-6 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-[#1C1917] hover:text-red-600 font-bold text-xs hover:border-red-200 transition-all flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Lock Admin Session</span>
                </button>
              </div>
            </div>
          ) : (
            /* ADMIN LOGIN FORM */
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1917] text-white border border-[#292524] shadow-2xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#292524] text-[#D97706]">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">Artist & Studio Admin Login</h2>
                  <p className="text-xs text-stone-400">Authorized personnel only — Gayatri Art Studio</p>
                </div>
              </div>

              {adminError && (
                <div className="p-3 rounded-xl bg-red-900/40 border border-red-700/60 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                    Studio Username / Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      defaultValue="admin@gayatriartstudio.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#292524] border border-[#3E3835] text-sm text-stone-200 focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                    Studio Security PIN *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      value={adminPin}
                      onChange={(e) => setAdminPin(e.target.value)}
                      placeholder="Enter 4-digit PIN (default: 1234)"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#292524] border border-[#3E3835] text-sm text-stone-200 focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Authenticate & Access Admin</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* QUICK FILL DEMO PIN */}
              <div className="pt-4 border-t border-[#292524] flex items-center justify-between">
                <span className="text-xs text-stone-400">Demo Studio PIN: <strong className="text-white font-mono">1234</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    setAdminPin('1234');
                    loginAdmin('1234');
                    navigate('/admin');
                  }}
                  className="text-xs text-[#D97706] hover:underline font-bold"
                >
                  Quick Fill & Enter (1234)
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
