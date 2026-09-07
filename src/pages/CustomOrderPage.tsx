import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, MessageSquare, Clock 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import type { CategoryType } from '../types';

export const CustomOrderPage: React.FC = () => {
  const { addOrder } = useApp();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: (searchParams.get('service') as CategoryType) || 'Tattoo',
    description: '',
    preferredStyle: searchParams.get('style') || '',
    budget: '₹3,000 - ₹6,000',
    deadline: '',
    referenceImage: '',
    additionalNotes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  useEffect(() => {
    const service = searchParams.get('service');
    const style = searchParams.get('style');
    if (service) setFormData(prev => ({ ...prev, serviceType: service as CategoryType }));
    if (style) setFormData(prev => ({ ...prev, preferredStyle: style }));
  }, [searchParams]);

  const processSteps = [
    { num: '01', title: 'Tell Us Your Idea', desc: 'Fill out the custom artwork form with your vision & notes.' },
    { num: '02', title: 'Upload References', desc: 'Provide reference photos or aesthetic inspiration links.' },
    { num: '03', title: 'Discuss Concept', desc: 'Consult with the studio artist to finalize scale & medium.' },
    { num: '04', title: 'Approve Design', desc: 'Review digital drafts or stencil previews before creation.' },
    { num: '05', title: 'Artwork Created', desc: 'Mastery crafted with patience, fine technique & archival materials.' },
    { num: '06', title: 'Safe Delivery', desc: 'Packaged securely & delivered or applied at studio/location.' },
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid phone number is required';
    if (!formData.description.trim()) errors.description = 'Please describe your project idea';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const refId = addOrder({
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      serviceType: formData.serviceType,
      description: formData.description,
      style: formData.preferredStyle,
      budget: formData.budget,
      deadline: formData.deadline,
      referenceImage: formData.referenceImage,
      notes: formData.additionalNotes,
    });

    setSubmittedRefId(refId);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

      {/* HERO HEADER */}
      <SectionHeader 
        badge="Custom Commission Studio"
        title="Have an Idea? Let's Create It."
        subtitle="Bring your unique vision to life. Fill in the details below to receive a personalized quote and draft concept from Gayatri Art Studio."
      />

      {/* 6-STEP VISUAL PROCESS */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-[#E7E0D8] space-y-8">
        <h3 className="font-serif text-2xl font-bold text-[#1C1917] text-center">How Custom Commission Works</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {processSteps.map((p) => (
            <div key={p.num} className="p-4 rounded-2xl bg-white border border-[#E7E0D8] space-y-2 text-center shadow-sm">
              <span className="text-xl font-serif font-extrabold text-[#C85A32] block">{p.num}</span>
              <h4 className="font-serif text-sm font-bold text-[#1C1917]">{p.title}</h4>
              <p className="text-[11px] text-[#78716C] leading-tight">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FORM OR CONFIRMATION SCREEN */}
      <div className="bg-white p-8 sm:p-14 rounded-3xl border border-[#E7E0D8] shadow-2xl max-w-3xl mx-auto">
        {submittedRefId ? (
          <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-xs font-bold uppercase tracking-wider">Request Confirmed</span>
              <h3 className="font-serif text-3xl font-bold text-[#1C1917]">Thank You! Request Received</h3>
              <p className="text-sm text-[#78716C]">Your unique Commission Reference ID is:</p>
              <div className="inline-block px-6 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] font-mono text-2xl font-extrabold text-[#C85A32] shadow-inner">
                {submittedRefId}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] text-xs text-[#44403C] space-y-2 max-w-lg mx-auto text-left">
              <div className="flex items-center gap-2 font-bold text-[#1C1917]">
                <Clock className="w-4 h-4 text-[#D97706]" />
                <span>Expected Response Time: Within 24 Hours</span>
              </div>
              <p>Our lead studio artist will review your design requirements and email/call you with draft stencils and initial estimates.</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/918788225420?text=Hi!%20I%20just%20submitted%20a%20custom%20artwork%20request%20on%20Gayatri%20Art%20Studio%20with%20Ref%20ID%20${submittedRefId}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-lg hover:bg-[#20ba59] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Connect Immediately on WhatsApp</span>
              </a>

              <button
                onClick={() => setSubmittedRefId(null)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FAF8F5] border border-[#E7E0D8] text-[#1C1917] font-semibold text-xs hover:bg-[#E7E0D8] transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#1C1917] border-b border-[#E7E0D8] pb-4">
              Custom Artwork Commission Form
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
                {formErrors.fullName && <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>}
              </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Service Type *</label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as CategoryType })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                >
                  <option value="Tattoo">Custom Tattoo Art</option>
                  <option value="Blood Painting">Blood Painting (Memorial & Symbolic Keepsake)</option>
                  <option value="Rangoli">Traditional & Festival Rangoli</option>
                  <option value="Sketch">Pencil & Charcoal Sketch</option>
                  <option value="Portrait">Hand-Drawn Portrait</option>
                  <option value="Other">Other / Corporate Commission</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Preferred Style / Aesthetic</label>
                <input
                  type="text"
                  value={formData.preferredStyle}
                  onChange={(e) => setFormData({ ...formData, preferredStyle: e.target.value })}
                  placeholder="e.g. Minimalist, Photorealistic, Fine Line, Mandala"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Project Description *</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your vision, theme, story, or elements you want included..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
              />
              {formErrors.description && <p className="text-xs text-red-500 mt-1">{formErrors.description}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Estimated Budget Range</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                >
                  <option value="Under ₹2,000">Under ₹2,000</option>
                  <option value="₹2,000 - ₹5,000">₹2,000 - ₹5,000</option>
                  <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                  <option value="₹10,000+">₹10,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Target Completion Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Reference Image Link (Optional)</label>
              <input
                type="text"
                value={formData.referenceImage}
                onChange={(e) => setFormData({ ...formData, referenceImage: e.target.value })}
                placeholder="Paste Google Drive, Pinterest, or photo link..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Additional Notes / Venue Address</label>
              <textarea
                rows={2}
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder="Any special notes or location details if on-site rangoli decor..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all"
            >
              Submit Custom Request
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
