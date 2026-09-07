import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Camera, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import { StudioLogo } from '../common/StudioLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-10 border-t border-[#292524]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner CTA inside footer */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#292524] to-[#1C1917] border border-[#44403C] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#D97706]/10 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <span className="text-[#D97706] text-xs font-bold uppercase tracking-widest">Custom Commission Studio</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">Have a Unique Vision for Your Next Artwork?</h3>
            <p className="text-sm text-[#A8A29E] mt-2 max-w-xl">Whether it's a tattoo design, a grand rangoli, or a family sketch — we bring patience and passion to every line.</p>
          </div>
          <Link
            to="/custom-order"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-medium text-sm hover:shadow-lg transition-all shrink-0"
          >
            <span>Request Custom Artwork</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#292524]">
          
          {/* Col 1: Studio Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <StudioLogo />
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Gayatri <span className="text-[#C85A32]">Art Studio</span>
              </span>
            </div>
            <p className="text-sm text-[#A8A29E] leading-relaxed">
              "Turning Your Ideas Into Art" — Indian creative studio specializing in custom tattoo art, traditional rangoli, hand-drawn sketches, and realistic portraits.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://wa.me/918788225420?text=Hi,%20I%20found%20your%20Gayatri%20Art%20Studio%20website%20and%20would%20like%20to%20discuss%20an%20artwork." 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <Camera className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-[#A8A29E]">
              <li><Link to="/" className="hover:text-[#D97706] transition-colors">Home Page</Link></li>
              <li><Link to="/gallery" className="hover:text-[#D97706] transition-colors">Art Collection Gallery</Link></li>
              <li><Link to="/custom-order" className="hover:text-[#D97706] transition-colors">Custom Artwork Request</Link></li>
              <li><Link to="/booking" className="hover:text-[#D97706] transition-colors">Book Studio Consultation</Link></li>
              <li><Link to="/about" className="hover:text-[#D97706] transition-colors">About Artist & Philosophy</Link></li>
              <li><Link to="/contact" className="hover:text-[#D97706] transition-colors">Contact Studio</Link></li>
              <li><Link to="/login?type=client" className="hover:text-[#D97706] transition-colors">Client / Customer Portal</Link></li>
              <li><Link to="/login?type=admin" className="hover:text-[#D97706] transition-colors">Artist & Studio Admin Login</Link></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide mb-4">Art Specializations</h4>
            <ul className="space-y-2.5 text-sm text-[#A8A29E]">
              <li><Link to="/tattoo" className="hover:text-[#C85A32] transition-colors">Custom Tattoo Design</Link></li>
              <li><Link to="/blood-painting" className="hover:text-[#F43F5E] transition-colors">Blood Painting & Memorial Keepsakes</Link></li>
              <li><Link to="/rangoli" className="hover:text-[#D97706] transition-colors">Traditional & Festival Rangoli</Link></li>
              <li><Link to="/sketches" className="hover:text-[#FAF8F5] transition-colors">Pencil & Charcoal Sketches</Link></li>
              <li><Link to="/portraits" className="hover:text-[#C85A32] transition-colors">Hand-Drawn Realistic Portraits</Link></li>
              <li><Link to="/custom-order" className="hover:text-[#D97706] transition-colors">Corporate & Event Art Setup</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info & Hours */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide mb-4">Studio Information</h4>
            <ul className="space-y-3 text-sm text-[#A8A29E]">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-1" />
                <span>Gayatri Art Studio, Deccan Gymkhana, Pune, Maharashtra 411004</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>+91 87882 25420</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>hello@gayatriartstudio.com</span>
              </li>
              <li className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-[#D97706] shrink-0 mt-1" />
                <div>
                  <p className="text-white text-xs font-medium">Tue - Sun: 10:00 AM - 08:00 PM</p>
                  <p className="text-xs text-[#78716C]">Monday: Closed for Creation</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>© 2026 Gayatri Art Studio. All Rights Reserved. Crafted with care in India.</p>
          <div className="flex items-center gap-6">
            <Link to="/gallery" className="hover:text-[#A8A29E]">Privacy Policy</Link>
            <Link to="/gallery" className="hover:text-[#A8A29E]">Terms of Service</Link>
            <Link to="/contact" className="hover:text-[#A8A29E]">Studio Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
