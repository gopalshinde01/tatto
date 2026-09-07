import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, Camera, Calendar, CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';

export const ContactPage: React.FC = () => {
  const { addMessage } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid phone is required';
    if (!formData.message.trim()) errors.message = 'Please enter your message';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    addMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

      <SectionHeader 
        badge="Get in Touch"
        title="Contact Gayatri Art Studio"
        subtitle="Have questions regarding a custom artwork, tattoo consultation, or festival rangoli booking? Reach out to us."
      />

      {/* QUICK ACTION BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <a
          href="https://wa.me/918788225420?text=Hi,%20I%20found%20your%20Gayatri%20Art%20Studio%20website%20and%20would%20like%20to%20discuss%20a%20custom%20artwork."
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#25D366] text-white font-bold text-sm shadow-md hover:bg-[#20ba59] transition-all"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Chat on WhatsApp</span>
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#E1306C] text-white font-bold text-sm shadow-md hover:bg-[#c12457] transition-all"
        >
          <Camera className="w-5 h-5" />
          <span>Follow on Instagram</span>
        </a>

        <button
          onClick={() => navigate('/booking')}
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
        >
          <Calendar className="w-5 h-5" />
          <span>Book a Service</span>
        </button>
      </div>

      {/* 2-COLUMN STUDIO INFO & FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Info Card */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-[#1C1917] text-white border border-[#292524] shadow-2xl space-y-6">
          <h3 className="font-serif text-2xl font-bold text-white">Studio Details</h3>

          <div className="space-y-4 text-sm text-stone-300">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-[#292524] text-[#D97706] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Studio Location</p>
                <p className="text-xs text-stone-400 mt-0.5">Gayatri Art Studio, Deccan Gymkhana, Pune, Maharashtra 411004</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-[#292524] text-[#D97706] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Phone & WhatsApp</p>
                <p className="text-xs text-stone-400 mt-0.5">+91 87882 25420</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-[#292524] text-[#D97706] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Email Address</p>
                <p className="text-xs text-[#D97706] font-semibold mt-0.5">hello@gayatriartstudio.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-[#292524] text-[#D97706] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Working Hours</p>
                <p className="text-xs text-stone-400 mt-0.5">Tue - Sun: 10:00 AM - 08:00 PM</p>
                <p className="text-[11px] text-stone-500">Monday: Closed for Studio Creations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-[#E7E0D8] shadow-xl">
          {submitted ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1C1917]">Message Sent!</h3>
              <p className="text-sm text-[#78716C]">Thank you for contacting Gayatri Art Studio. We will reply to your message via email or phone shortly.</p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', message: '' });
                }}
                className="px-6 py-3 rounded-full bg-[#1C1917] text-white text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#1C1917]">Send Us a Message</h3>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
                {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aarav@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                  />
                  {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 87882 25420"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                  />
                  {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Your Message *</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you with your artwork ideas?"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
                {formErrors.message && <p className="text-xs text-red-500 mt-1">{formErrors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
