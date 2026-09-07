import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Calendar, ChevronDown, User, Shield 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudioLogo } from '../common/StudioLogo';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdminLoggedIn, currentClient } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E7E0D8] py-3' 
          : 'bg-[#FAF8F5] py-5 border-b border-[#E7E0D8]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <StudioLogo className="group-hover:scale-105 transition-transform" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#1C1917]">
                  Gayatri <span className="text-[#C85A32]">Art Studio</span>
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D97706]"></span>
              </div>
              <p className="text-[10px] tracking-widest text-[#78716C] uppercase font-medium">
                Turning Ideas Into Art
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-full ${
                isActive('/') 
                  ? 'text-[#C85A32] bg-[#C85A32]/10 font-semibold' 
                  : 'text-[#44403C] hover:text-[#C85A32] hover:bg-[#FAF8F5]'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative" onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-full ${
                  ['/tattoo', '/rangoli', '/sketches', '/portraits', '/blood-painting'].includes(location.pathname)
                    ? 'text-[#C85A32] bg-[#C85A32]/10 font-semibold'
                    : 'text-[#44403C] hover:text-[#C85A32]'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-56 py-2 bg-white rounded-2xl shadow-xl border border-[#E7E0D8] animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <Link 
                    to="/tattoo" 
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#44403C] hover:bg-[#FAF8F5] hover:text-[#C85A32] transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#C85A32]"></span>
                    Tattoo Art
                  </Link>
                  <Link 
                    to="/blood-painting" 
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#44403C] hover:bg-rose-50 hover:text-[#BE123C] transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#BE123C]"></span>
                    Blood Painting Art
                  </Link>
                  <Link 
                    to="/rangoli" 
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#44403C] hover:bg-[#FAF8F5] hover:text-[#D97706] transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
                    Rangoli Art
                  </Link>
                  <Link 
                    to="/sketches" 
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#44403C] hover:bg-[#FAF8F5] hover:text-[#1E293B] transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#1E293B]"></span>
                    Sketch Art
                  </Link>
                  <Link 
                    to="/portraits" 
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#44403C] hover:bg-[#FAF8F5] hover:text-[#9A3412] transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#9A3412]"></span>
                    Portrait Art
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/gallery" 
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-full ${
                isActive('/gallery') 
                  ? 'text-[#C85A32] bg-[#C85A32]/10 font-semibold' 
                  : 'text-[#44403C] hover:text-[#C85A32]'
              }`}
            >
              Gallery
            </Link>

            <Link 
              to="/custom-order" 
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-full ${
                isActive('/custom-order') 
                  ? 'text-[#C85A32] bg-[#C85A32]/10 font-semibold' 
                  : 'text-[#44403C] hover:text-[#C85A32]'
              }`}
            >
              Custom Order
            </Link>

            <Link 
              to="/about" 
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-full ${
                isActive('/about') 
                  ? 'text-[#C85A32] bg-[#C85A32]/10 font-semibold' 
                  : 'text-[#44403C] hover:text-[#C85A32]'
              }`}
            >
              About
            </Link>

            <Link 
              to="/contact" 
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-full ${
                isActive('/contact') 
                  ? 'text-[#C85A32] bg-[#C85A32]/10 font-semibold' 
                  : 'text-[#44403C] hover:text-[#C85A32]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action & Book Now CTA */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-3">
            {currentClient ? (
              <Link 
                to="/login?type=client" 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E7E0D8] text-xs font-semibold text-[#1C1917] hover:border-[#C85A32] transition-colors"
                title="Client Portal"
              >
                <div className="w-4 h-4 rounded-full bg-[#C85A32] text-white flex items-center justify-center text-[10px] font-bold">
                  {currentClient.name.charAt(0)}
                </div>
                <span className="truncate max-w-[90px]">{currentClient.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border border-[#E7E0D8] transition-colors ${
                  isActive('/login') 
                    ? 'bg-[#C85A32]/10 text-[#C85A32] border-[#C85A32]' 
                    : 'text-[#44403C] hover:text-[#C85A32] hover:bg-white'
                }`}
                title="Client & Artist Login"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </Link>
            )}

            {isAdminLoggedIn && (
              <Link 
                to="/admin" 
                className="text-xs px-3 py-1.5 rounded-full bg-[#1E293B] text-white font-medium hover:bg-black transition-colors flex items-center gap-1"
              >
                <Shield className="w-3 h-3 text-[#D97706]" />
                <span>Admin</span>
              </Link>
            )}

            <button 
              onClick={() => navigate('/booking')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-medium text-sm shadow-md shadow-[#C85A32]/25 hover:shadow-lg hover:shadow-[#C85A32]/35 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => navigate('/booking')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#C85A32] rounded-full shadow-sm"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1C1917] hover:text-[#C85A32] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[73px] bg-[#FAF8F5] border-b border-[#E7E0D8] shadow-2xl animate-in slide-in-from-top duration-300 max-h-[85vh] overflow-y-auto">
          <div className="px-4 pt-3 pb-6 space-y-2">
            <Link 
              to="/" 
              className={`block px-4 py-3 rounded-xl text-base font-medium ${
                isActive('/') ? 'bg-[#C85A32]/10 text-[#C85A32] font-semibold' : 'text-[#44403C]'
              }`}
            >
              Home
            </Link>

            <div className="space-y-1 pl-2">
              <p className="px-2 pt-2 text-xs font-bold text-[#A8A29E] uppercase tracking-wider">Our Art Services</p>
              <Link to="/tattoo" className="block px-4 py-2 text-sm text-[#44403C] hover:text-[#C85A32]">Tattoo Art</Link>
              <Link to="/blood-painting" className="block px-4 py-2 text-sm text-[#44403C] hover:text-[#BE123C] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE123C]"></span>
                Blood Painting (Memorial Art)
              </Link>
              <Link to="/rangoli" className="block px-4 py-2 text-sm text-[#44403C] hover:text-[#D97706]">Rangoli Art</Link>
              <Link to="/sketches" className="block px-4 py-2 text-sm text-[#44403C] hover:text-[#1E293B]">Sketch Art</Link>
              <Link to="/portraits" className="block px-4 py-2 text-sm text-[#44403C] hover:text-[#9A3412]">Portrait Art</Link>
            </div>

            <div className="border-t border-[#E7E0D8] my-2 pt-2 space-y-1">
              <Link 
                to="/gallery" 
                className={`block px-4 py-3 rounded-xl text-base font-medium ${
                  isActive('/gallery') ? 'bg-[#C85A32]/10 text-[#C85A32] font-semibold' : 'text-[#44403C]'
                }`}
              >
                Gallery Collection
              </Link>
              <Link 
                to="/custom-order" 
                className={`block px-4 py-3 rounded-xl text-base font-medium ${
                  isActive('/custom-order') ? 'bg-[#C85A32]/10 text-[#C85A32] font-semibold' : 'text-[#44403C]'
                }`}
              >
                Request Custom Order
              </Link>
              <Link 
                to="/about" 
                className={`block px-4 py-3 rounded-xl text-base font-medium ${
                  isActive('/about') ? 'bg-[#C85A32]/10 text-[#C85A32] font-semibold' : 'text-[#44403C]'
                }`}
              >
                About Gayatri Art Studio
              </Link>
              <Link 
                to="/contact" 
                className={`block px-4 py-3 rounded-xl text-base font-medium ${
                  isActive('/contact') ? 'bg-[#C85A32]/10 text-[#C85A32] font-semibold' : 'text-[#44403C]'
                }`}
              >
                Contact & Studio Hours
              </Link>
              <Link 
                to="/login" 
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive('/login') 
                    ? 'bg-[#C85A32] text-white shadow-md' 
                    : 'bg-[#FAF8F5] text-[#1C1917] border border-[#E7E0D8] hover:border-[#C85A32]'
                }`}
              >
                <User className="w-4 h-4 text-[#C85A32]" />
                <span>Client & Admin Login Portal</span>
              </Link>
              {isAdminLoggedIn && (
                <Link 
                  to="/admin" 
                  className="block px-4 py-3 rounded-xl text-base font-medium text-amber-800 bg-amber-50"
                >
                  Admin Panel (Active)
                </Link>
              )}
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/booking');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-medium text-base shadow-md"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
